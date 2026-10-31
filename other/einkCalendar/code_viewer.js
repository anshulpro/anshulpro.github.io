let rawCode = '';
let rawCodeIno = '';

function renderCodeViewer(rawSrc, elId, language) {
    const el = document.getElementById(elId);
    const lines = rawSrc.split('\n');
    el.textContent = '';
    lines.forEach((line, i) => {
        const codeLine = document.createElement('span');
        codeLine.className = 'code-line';

        const ln = document.createElement('span');
        ln.className = 'ln';
        ln.textContent = i + 1;
        codeLine.appendChild(ln);

        //hljs output is HTML-escaped syntax-highlighted markup; safe to inject
        codeLine.insertAdjacentHTML('beforeend', hljs.highlight(line === '' ? ' ' : line, { language }).value);

        el.appendChild(codeLine);
        if (i < lines.length - 1) el.appendChild(document.createTextNode('\n'));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    rawCode = window.CALENDAR_CODE;
    renderCodeViewer(rawCode, 'code-content', 'python');

    rawCodeIno = window.CALENDAR_INO;
    renderCodeViewer(rawCodeIno, 'code-content-ino', 'cpp');
});

function copyCode() {
    const btn = document.getElementById('copy-btn');
    navigator.clipboard.writeText(rawCode).then(() => {
        btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
        setTimeout(() => {
            btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy';
        }, 2000);
    });
}

function copyCodeIno() {
    const btn = document.getElementById('copy-btn-ino');
    navigator.clipboard.writeText(rawCodeIno).then(() => {
        btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
        setTimeout(() => {
            btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy';
        }, 2000);
    });
}

document.getElementById('go_back_button').addEventListener('click', () => { window.location.href = '/'; });
document.getElementById('copy-btn').addEventListener('click', copyCode);
document.getElementById('copy-btn-ino').addEventListener('click', copyCodeIno);
