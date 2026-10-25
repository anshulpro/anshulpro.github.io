window.CALENDAR_INO = `#include <WiFi.h>
#include <time.h>
#include "EPD_5in83g.h"
#include "GUI_Paint.h"
#include "fonts.h"
#include "CalFonts.h"   // generated: PFont + CalDate, CalHead, PanelYear, PanelDay, PanelText, PanelWeek, ErrFont

// ============================== SETTINGS ==============================
const char* ssid     = "**********";
const char* password = "**********";

const long GMT_OFFSET_SEC = 19800;                 // IST (UTC+5:30)
const int  REFRESH_HOUR = 0, REFRESH_MIN = 10;     // daily redraw time (just after midnight)
const uint32_t ERROR_RETRY_SEC = 2 * 3600;         // retry after 2 h if the time could not be fetched
// =====================================================================

#define C_BLACK   EPD_5IN83G_BLACK
#define C_WHITE   EPD_5IN83G_WHITE
#define C_YELLOW  EPD_5IN83G_YELLOW
#define C_RED     EPD_5IN83G_RED

RTC_DATA_ATTR bool lastWasError = false;   // survives deep sleep

static const char* MONTH_UP[]    = {"JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY",
                                    "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"};
static const char* WEEKDAY_ABBR[] = {"SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"};
static const char* HEAD[7]       = {"MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"};

// ------------------------------------------------------------ time
bool waitForTimeSync(unsigned long timeoutMs = 10000) {
  unsigned long start = millis();
  time_t now = time(nullptr);
  while (now < 1600000000 && (millis() - start) < timeoutMs) {
    delay(200);
    now = time(nullptr);
  }
  bool synced = now >= 1600000000;
  Serial.println(synced ? "NTP time synced" : "NTP sync timed out");
  return synced;
}

// Seconds until the next REFRESH_HOUR:REFRESH_MIN (2-minute margin absorbs deep-sleep clock drift)
uint64_t secondsToNextRefresh() {
  time_t now = time(nullptr);
  struct tm t;
  localtime_r(&now, &t);
  time_t probe = now + 120;
  for (int day = 0; day < 2; day++) {
    struct tm x = t;
    x.tm_mday += day;
    x.tm_hour = REFRESH_HOUR;
    x.tm_min = REFRESH_MIN;
    x.tm_sec = 0;
    x.tm_isdst = -1;
    time_t target = mktime(&x);
    if (target > probe) return (uint64_t)(target - now);
  }
  return 24 * 3600;
}

int daysInMonth(int year, int mon) {   // mon 0-11
  static const int d[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
  if (mon == 1 && ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)) return 29;
  return d[mon];
}

int firstWeekdayMon(int year, int mon) {   // 0 = Monday ... 6 = Sunday
  struct tm t = {};
  t.tm_year = year - 1900;
  t.tm_mon = mon;
  t.tm_mday = 1;
  t.tm_hour = 12;
  mktime(&t);
  return (t.tm_wday + 6) % 7;
}

// ------------------------------------------------------------ drawing primitives
void fillRect(int x, int y, int w, int h, uint16_t color) {
  for (int j = 0; j < h; j++)
    for (int i = 0; i < w; i++)
      Paint_SetPixel(x + i, y + j, color);
}

void fillCircle(int cx, int cy, int r, uint16_t color) {
  for (int dy = -r; dy <= r; dy++) {
    int dx = (int)sqrtf((float)(r * r - dy * dy) + 0.5f);
    for (int x = cx - dx; x <= cx + dx; x++) Paint_SetPixel(x, cy + dy, color);
  }
}

// ------------------------------------------------------------ text (proportional bitmap fonts)
int glyphIndex(const PFont& f, char c) {
  const char* p = strchr(f.chars, c);
  return p ? (int)(p - f.chars) : -1;
}

int textWidth(const PFont& f, const char* s, int tracking = 0) {
  int w = 0;
  for (; *s; s++) {
    int i = glyphIndex(f, *s);
    w += (i >= 0 ? f.adv[i] : f.maxW / 2) + tracking;
  }
  return w > 0 ? w - tracking : 0;
}

// x = left edge, baseline = y of the text baseline
void drawText(int x, int baseline, const char* s, const PFont& f, uint16_t color, int tracking = 0) {
  int top = baseline - f.ascent;
  for (; *s; s++) {
    int i = glyphIndex(f, *s);
    if (i < 0) { x += f.maxW / 2 + tracking; continue; }
    const uint8_t* g = f.bitmap + (size_t)i * f.bpr * f.H;
    for (int row = 0; row < f.H; row++)
      for (int col = 0; col < f.maxW; col++)
        if (g[row * f.bpr + col / 8] & (0x80 >> (col % 8)))
          Paint_SetPixel(x + col, top + row, color);
    x += f.adv[i] + tracking;
  }
}

void drawTextCentered(int cx, int baseline, const char* s, const PFont& f, uint16_t color, int tracking = 0) {
  drawText(cx - textWidth(f, s, tracking) / 2, baseline, s, f, color, tracking);
}

// ------------------------------------------------------------ calendar
const int COL_X0 = 38, COL_PITCH = 58;   // column centres: 38, 96, 154, 212, 270, 328, 386

// Day numbers of one month; todayDay = 0 when today is not in this month
void drawDays(int top, int off, int dim, int P, int todayDay) {
  int r = min(15, P / 2 - 2);
  for (int d = 1; d <= dim; d++) {
    int idx = off + d - 1;
    int cx = COL_X0 + COL_PITCH * (idx % 7);
    int cy = top + (idx / 7) * P + P / 2;
    int base = cy + (CalDate.ascent - 1) / 2;
    char buf[4];
    snprintf(buf, sizeof(buf), "%d", d);
    if (d == todayDay) {
      fillCircle(cx, cy, r, C_RED);
      drawTextCentered(cx, base, buf, CalDate, C_WHITE);
    } else {
      drawTextCentered(cx, base, buf, CalDate, C_BLACK);
    }
  }
}

void drawMainScreen(const struct tm& now) {
  Paint_Clear(C_WHITE);

  int year = now.tm_year + 1900, mon = now.tm_mon, today = now.tm_mday;
  int year2 = year, mon2 = mon + 1;
  if (mon2 > 11) { mon2 = 0; year2++; }

  int off1 = firstWeekdayMon(year, mon),   dim1 = daysInMonth(year, mon);
  int off2 = firstWeekdayMon(year2, mon2), dim2 = daysInMonth(year2, mon2);
  int rows1 = (off1 + dim1 + 6) / 7;
  int rows2 = (off2 + dim2 + 6) / 7;

  const int ROWS_TOP = 67, ROWS_BOTTOM = 474, GAP = 4;
  int P = min(38, (ROWS_BOTTOM - ROWS_TOP - GAP) / (rows1 + rows2));   // shrinks when the months need 11-12 rows

  // Weekday header (SAT and SUN get a yellow cell)
  for (int i = 0; i < 7; i++) {
    int cx = COL_X0 + COL_PITCH * i;
    if (i >= 5) {
      int w = textWidth(CalHead, HEAD[i], 1) + 16;
      fillRect(cx - w / 2, 40, w, 19, C_YELLOW);
    }
    drawTextCentered(cx, 53, HEAD[i], CalHead, C_BLACK, 1);
  }

  // Two months, back to back (no titles, as in the design)
  drawDays(ROWS_TOP, off1, dim1, P, today);
  drawDays(ROWS_TOP + rows1 * P + GAP, off2, dim2, P, 0);

  // Right panel, full height: yellow year, red date block, black weekday block
  const int PX = 430, PW = 218;            // panel x and width (runs to the screen edge)
  fillRect(PX, 0, PW, 64, C_YELLOW);       // y 0-64
  fillRect(PX, 64, PW, 281, C_RED);        // y 64-345
  fillRect(PX, 345, PW, 135, C_BLACK);     // y 345-480

  int pcx = PX + PW / 2;                   // 539
  char buf[12];
  snprintf(buf, sizeof(buf), "%d", year);
  drawTextCentered(pcx, 45, buf, PanelYear, C_BLACK);
  snprintf(buf, sizeof(buf), "%d", today);
  drawTextCentered(pcx, 232, buf, PanelDay, C_WHITE);
  drawTextCentered(pcx, 289, MONTH_UP[mon], PanelText, C_WHITE, 1);
  drawTextCentered(pcx, 431, WEEKDAY_ABBR[now.tm_wday], PanelWeek, C_WHITE, 8);
}

void drawErrorScreen() {
  Paint_Clear(C_WHITE);
  drawTextCentered(324, 250, "Something is broken", ErrFont, C_RED);
}

void goToSleep(uint64_t seconds) {
  Serial.printf("Deep sleep for %llu s\\n", seconds);
  Serial.flush();
  esp_sleep_enable_timer_wakeup(seconds * 1000000ULL);
  esp_deep_sleep_start();
}

// ------------------------------------------------------------ main
void setup() {
  Serial.begin(115200);
  delay(300);

  bool synced = false;

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  unsigned long t0 = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - t0 < 30000) { delay(500); Serial.print("."); }
  Serial.println();

  if (WiFi.status() == WL_CONNECTED) {
    Serial.print("WiFi OK, IP: ");
    Serial.println(WiFi.localIP());
    configTime(GMT_OFFSET_SEC, 0, "in.pool.ntp.org", "pool.ntp.org", "time.google.com");
    synced = waitForTimeSync(20000);
  } else {
    Serial.printf("WiFi connection failed (status %d)\\n", WiFi.status());
  }

  // Free WiFi memory before allocating the 76 KB frame buffer
  WiFi.disconnect(true);
  WiFi.mode(WIFI_OFF);
  delay(100);

  // Skip redrawing the same error screen again and again
  bool needRender = synced || !lastWasError;
  lastWasError = !synced;

  if (needRender) {
    DEV_Module_Init();
    EPD_5IN83G_Init();

    UDOUBLE imageSize = ((EPD_5IN83G_WIDTH % 4 == 0) ? (EPD_5IN83G_WIDTH / 4) : (EPD_5IN83G_WIDTH / 4 + 1)) * EPD_5IN83G_HEIGHT;
    Serial.printf("Need %lu bytes, largest free block %u\\n", (unsigned long)imageSize, ESP.getMaxAllocHeap());
    UBYTE *Image = (UBYTE *)malloc(imageSize);
    if (Image == NULL) {
      Serial.println("Failed to allocate frame buffer");
      DEV_Module_Exit();
    } else {
      Paint_NewImage(Image, EPD_5IN83G_WIDTH, EPD_5IN83G_HEIGHT, 0, EPD_5IN83G_WHITE);
      Paint_SetScale(4);
      Paint_SelectImage(Image);

      if (synced) {
        time_t t = time(nullptr);
        struct tm now;
        localtime_r(&t, &now);
        drawMainScreen(now);
      } else {
        drawErrorScreen();
      }

      Serial.println("Refreshing display (12-20 s)...");
      EPD_5IN83G_Display(Image);
      DEV_Delay_ms(3000);

      EPD_5IN83G_Sleep();
      free(Image);
      Image = NULL;
      DEV_Delay_ms(2000);   // important, at least 2 s
      DEV_Module_Exit();
    }
  }

  goToSleep(synced ? secondsToNextRefresh() : ERROR_RETRY_SEC);
}

void loop() {
  // unreachable: deep sleep restarts from setup() each cycle
}`       