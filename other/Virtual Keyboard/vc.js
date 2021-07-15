//js code here
let finalString = "";
document.getElementById("inputBox").textContent = finalString;

let capsLockKey = false;
let shiftKey = false;


// LOGIC when keys are clicked via mouse

//row1 special keys logic
{
    document.getElementById('backquote').onclick = () => {
        if(shiftKey) passToInputBox("~");
        else passToInputBox("`");
    };
    document.getElementById('1').onclick = () => {
        if(shiftKey) passToInputBox("!");
        else passToInputBox("1");
    };
    document.getElementById('2').onclick = () => {
        if(shiftKey) passToInputBox("@");
        else passToInputBox("2");
    };
    document.getElementById('3').onclick = () => {
        if(shiftKey) passToInputBox("#");
        else passToInputBox("3");
    };
    document.getElementById('4').onclick = () => {
        if(shiftKey) passToInputBox("$");
        else passToInputBox("4");
    };
    document.getElementById('5').onclick = () => {
        if(shiftKey) passToInputBox("%");
        else passToInputBox("5");
    };
    document.getElementById('6').onclick = () => {
        if(shiftKey) passToInputBox("^");
        else passToInputBox("6");
    };
    document.getElementById('7').onclick = () => {
        if(shiftKey) passToInputBox("&");
        else passToInputBox("7");
    };
    document.getElementById('8').onclick = () => {
        if(shiftKey) passToInputBox("*");
        else passToInputBox("8");
    };
    document.getElementById('9').onclick = () => {
        if(shiftKey) passToInputBox("(");
        else passToInputBox("9");
    };
    document.getElementById('0').onclick = () => {
        if(shiftKey) passToInputBox(")");
        else passToInputBox("0");
    };
    document.getElementById('subtract').onclick = () => {
        if(shiftKey) passToInputBox("_");
        else passToInputBox("-");
    };
    document.getElementById('equal').onclick = () => {
        if(shiftKey) passToInputBox("+");
        else passToInputBox("=");
    };
    document.getElementById('delete').onclick = () => {deleteKey()};
}

//row2 special keys logic
{
    document.getElementById('tab').onclick = () => {passToInputBox("\t")};
    document.getElementById('openingbracket').onclick = () => {
        if(shiftKey) passToInputBox("{");
        else passToInputBox("[");
    };
    document.getElementById('closingbracket').onclick = () => {
        if(shiftKey) passToInputBox("}");
        else passToInputBox("]");
    };
    document.getElementById('backslash').onclick = () => {
        if(shiftKey) passToInputBox("|");
        else passToInputBox("\\");
    };
    
}

//row3 special keys
{
    //CAPS LOCK toggle button functionality
    document.getElementById('capslockkey').onclick = () => {
        if(capsLockKey == false){
            document.getElementById('capslockkey').classList.add("key-active");
            document.querySelector('#capsLockStatus').style.backgroundColor = "#18FA76";
            capsLockKey = true;
            setTimeout(function(){
                document.getElementById('capslockkey').classList.remove("key-active");
            }, 95);
            
        }
        else if(capsLockKey == true){
            document.getElementById('capslockkey').classList.add("key-active");
            document.querySelector('#capsLockStatus').style.backgroundColor = "#fff";
            capsLockKey = false;
            setTimeout(function(){
                document.getElementById('capslockkey').classList.remove("key-active");
            }, 95);
            
        }
    };

    document.getElementById('semicolon').onclick = () => {
        if(shiftKey) passToInputBox(":");
        else passToInputBox(";");
    };
    document.getElementById('singlequote').onclick = () => {
        if(shiftKey) passToInputBox("\"");
        else passToInputBox("'");
    };
    document.getElementById('returnkey').onclick = () => {passToInputBox("\n")};
}

//row4 special keys
{
    //left SHIFT Key toggle functionality 
    document.getElementById('leftshiftkey').onclick = () => {

        if(document.getElementById('leftshiftkey').classList == "default key"){
            document.getElementById('leftshiftkey').classList.remove("key");
            document.getElementById('leftshiftkey').classList.add("key-alt");
            document.getElementById('leftshiftkey').classList.add("key-alt-active");
            shiftKey = true;
        }
        else if (document.getElementById('leftshiftkey').classList == "default key-alt key-alt-active"){
            document.getElementById('leftshiftkey').classList.remove("key-alt-active");
            document.getElementById('leftshiftkey').classList.remove("key-alt");
            document.getElementById('leftshiftkey').classList.add("key");

            if(document.getElementById('rightshiftkey').classList == "default key-alt key-alt-active"){
                shiftKey = true;
            }
            else shiftKey = false;
        }
    };

    document.getElementById('comma').onclick = () => {
        if(shiftKey) passToInputBox("<");
        else passToInputBox(",");
    };
    document.getElementById('fullstop').onclick = () => {
        if(shiftKey) passToInputBox(">");
        else passToInputBox(".");
    };
    document.getElementById('slash').onclick = () => {
        if(shiftKey) passToInputBox("?");
        else passToInputBox("/");
    };

    //right SHIFT Key toggle functionality 
    document.getElementById('rightshiftkey').onclick = () => {
        if(document.getElementById('rightshiftkey').classList == "default key"){
            document.getElementById('rightshiftkey').classList.remove("key");
            document.getElementById('rightshiftkey').classList.add("key-alt");
            document.getElementById('rightshiftkey').classList.add("key-alt-active");
            shiftKey = true;
        }
        else if (document.getElementById('rightshiftkey').classList == "default key-alt key-alt-active"){
            document.getElementById('rightshiftkey').classList.remove("key-alt-active");
            document.getElementById('rightshiftkey').classList.remove("key-alt");
            document.getElementById('rightshiftkey').classList.add("key");

            if(document.getElementById('leftshiftkey').classList == "default key-alt key-alt-active"){
                shiftKey = true;
            }
            else shiftKey = false;
        }
    };
}

//row5 keys
{
    //space bar key
    document.getElementById('spacekey').onclick = () => {passToInputBox(" ")};
}


var x = document.querySelectorAll(['#Q','#W','#E','#R','#T','#Y','#U','#I','#O','#P',
'#A','#S','#D','#F','#G','#H','#J','#K','#L','#Z','#X','#C','#V','#B','#N','#M']);
//on click block for all alphabets
{
    x[0].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[0].innerText);     
        else  passToInputBox(x[0].innerText.toLowerCase());   
    }
    x[1].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[1].innerText);     
        else  passToInputBox(x[1].innerText.toLowerCase());   
    }
    x[2].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[2].innerText);     
        else  passToInputBox(x[2].innerText.toLowerCase());   
    }
    x[3].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[3].innerText);     
        else  passToInputBox(x[3].innerText.toLowerCase());   
    }
    x[4].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[4].innerText);     
        else  passToInputBox(x[4].innerText.toLowerCase());   
    }
    x[5].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[5].innerText);     
        else  passToInputBox(x[5].innerText.toLowerCase());   
    }
    x[6].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[6].innerText);     
        else  passToInputBox(x[6].innerText.toLowerCase());   
    }
    x[7].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[7].innerText);     
        else  passToInputBox(x[7].innerText.toLowerCase());   
    }
    x[8].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[8].innerText);     
        else  passToInputBox(x[8].innerText.toLowerCase());   
    }
    x[9].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[9].innerText);     
        else  passToInputBox(x[9].innerText.toLowerCase());   
    }
    x[10].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[10].innerText);     
        else  passToInputBox(x[10].innerText.toLowerCase());   
    }
    x[11].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[11].innerText);     
        else  passToInputBox(x[11].innerText.toLowerCase());   
    }
    x[12].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[12].innerText);     
        else  passToInputBox(x[12].innerText.toLowerCase());   
    }
    x[13].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[13].innerText);     
        else  passToInputBox(x[13].innerText.toLowerCase());   
    }
    x[14].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[14].innerText);     
        else  passToInputBox(x[14].innerText.toLowerCase());   
    }
    x[15].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[15].innerText);     
        else  passToInputBox(x[15].innerText.toLowerCase());   
    }
    x[16].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[16].innerText);     
        else  passToInputBox(x[16].innerText.toLowerCase());   
    }
    x[17].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[17].innerText);     
        else  passToInputBox(x[17].innerText.toLowerCase());   
    }
    x[18].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[18].innerText);     
        else  passToInputBox(x[18].innerText.toLowerCase());   
    }
    x[19].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[19].innerText);     
        else  passToInputBox(x[19].innerText.toLowerCase());   
    }
    x[20].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[20].innerText);     
        else  passToInputBox(x[20].innerText.toLowerCase());   
    }
    x[21].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[21].innerText);     
        else  passToInputBox(x[21].innerText.toLowerCase());   
    }
    x[22].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[22].innerText);     
        else  passToInputBox(x[22].innerText.toLowerCase());   
    }
    x[23].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[23].innerText);     
        else  passToInputBox(x[23].innerText.toLowerCase());   
    }
    x[24].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[24].innerText);     
        else  passToInputBox(x[24].innerText.toLowerCase());   
    }
    x[25].onclick = () =>{
        if(capsLockKey||shiftKey) passToInputBox(x[25].innerText);     
        else  passToInputBox(x[25].innerText.toLowerCase());   
    }
}

//function to pass key value that is passed to the final string
function passToInputBox(keyboardKey){   
    // document.getElementById("inputBox").value = finalString.concat(keyboardKey);
    finalString += keyboardKey;
    document.getElementById("inputBox").textContent = finalString;
}

//func to remove last character from final string when delete key is pressed
function deleteKey(){   
    finalString = finalString.slice(0, finalString.length - 1);
    document.getElementById("inputBox").textContent = finalString;
}

//fuc to pass ALPHABET Key to input box and add/remove the CSS accordingly
function alphabetkey(alphabet){

    //if alphabet is small case or upper case, temp will be upper case character (for div ID)
    // var temp = alphabet.charAt(0).toUpperCase();
    var temp = alphabet.toUpperCase();
    document.getElementById(temp).classList.add("key-active");
    passToInputBox(alphabet);
    setTimeout(function(){
        document.getElementById(temp).classList.remove("key-active");
    }, 95);
    
    
}

const alphabetList = ['q','Q','w','W','e','E','r','R','t','T','y','Y','u','U','i','I','o','O','p','P',
        'a','A','s','S','d','D','f','F','g','G','h','H','j','J','k','K','l','L',
        'z','Z','x','X','c','C','v','V','b','B','n','N','m','M'];

//EVENT listener to check what keys are being pressed by user on keyboard (keydown)
document.addEventListener("keydown", (e) => {

    //to change the shift keys from pressed to unpressed when any key is detected from keyboard
    if(shiftKey == true){
        document.getElementById('leftshiftkey').classList.remove("key-alt-active");
        document.getElementById('leftshiftkey').classList.remove("key-alt");
        document.getElementById('leftshiftkey').classList.add("key");
        document.getElementById('rightshiftkey').classList.remove("key-alt-active");
        document.getElementById('rightshiftkey').classList.remove("key-alt");
        document.getElementById('rightshiftkey').classList.add("key");
        shiftKey = false;
    }

    //to change the caps key off if on actual keyboard its off 
    if(capsLockKey == true){
        document.getElementById('capslockkey').classList.add("key-active");
        document.querySelector('#capsLockStatus').style.backgroundColor = "#fff";
        capsLockKey = false;
        setTimeout(function(){
            document.getElementById('capslockkey').classList.remove("key-active");
        }, 95);
    }

    //for all alphabet key I check if the alphabet from the array alphabetlist and then send it to Inputbox
    if(alphabetList.includes(e.key)) {
        alphabetkey(e.key);
    }

    //if left shift key is pressed
    if(e.key == "Shift" && e.code =="ShiftLeft"){
        document.getElementById('leftshiftkey').classList.add("key-active");
    } 

    //if right shift key is pressed 
    if(e.key == "Shift" && e.code =="ShiftRight"){
        document.getElementById('rightshiftkey').classList.add("key-active");
    } 

    //if space is pressed 
    if(e.code =="Space"){
        document.getElementById('spacekey').classList.add("key-active");
        passToInputBox(" ");
    } 

    //if enter is pressed 
    if(e.key == "Enter"){
        document.getElementById('returnkey').classList.add("key-active");
        passToInputBox("\n");
    }

    //if ~ or ` is pressed 
    if(e.key == '~' || e.key == "`"){
        document.getElementById('backquote').classList.add("key-active");
        passToInputBox(e.key);
    }

    //if 1 is pressed 
    if(e.key == '!' || e.key == "1"){
        document.getElementById('1').classList.add("key-active");
        passToInputBox(e.key);
    }

    //if 2 is pressed 
    if(e.key == '@' || e.key == "2"){
        document.getElementById('2').classList.add("key-active");
        passToInputBox(e.key);
    }

    //if 3 is pressed 
    if(e.key == '#' || e.key == "3"){
        document.getElementById('3').classList.add("key-active");
        passToInputBox(e.key);
    }

    //if 4 is pressed 
    if(e.key == '$' || e.key == "4"){
        document.getElementById('4').classList.add("key-active");
        passToInputBox(e.key);
    }

    //if 5 is pressed 
    if(e.key == '%' || e.key == "5"){
        document.getElementById('5').classList.add("key-active");
        passToInputBox(e.key);
    }

    //if 6 is pressed 
    if(e.key == '^' || e.key == "6"){
        document.getElementById('6').classList.add("key-active");
        passToInputBox(e.key);
    }

    //if 7 is pressed 
    if(e.key == '&' || e.key == "7"){
        document.getElementById('7').classList.add("key-active");
        passToInputBox(e.key);
    }

    //if 8 is pressed 
    if(e.key == '*' || e.key == "8"){
        document.getElementById('8').classList.add("key-active");
        passToInputBox(e.key);
    }

    //if 9 is pressed 
    if(e.key == '(' || e.key == "9"){
        document.getElementById('9').classList.add("key-active");
        passToInputBox(e.key);
    }

    //if 0 is pressed 
    if(e.key == ')' || e.key == "0"){
        document.getElementById('0').classList.add("key-active");
        passToInputBox(e.key);
    }

    //if subtract is pressed 
    if(e.key == '-' || e.key == "_"){
        document.getElementById('subtract').classList.add("key-active");
        passToInputBox(e.key);
    }

    //if equal is pressed 
    if(e.key == '=' || e.key == "+"){
        document.getElementById('equal').classList.add("key-active");
        passToInputBox(e.key);
    }

    //if tab is pressed (will not work as div is not editable)
    if(e.key == 'tab'){
        document.getElementById('tab').classList.add("key-active");
        passToInputBox("\t");
    }

    //if openbracket is pressed 
    if(e.key == '[' || e.key == "{"){
        document.getElementById('openingbracket').classList.add("key-active");
        passToInputBox(e.key);
    }

    //if closedbracket is pressed 
    if(e.key == ']' || e.key == "}"){
        document.getElementById('closingbracket').classList.add("key-active");
        passToInputBox(e.key);
    }
    
    //if backslash is pressed 
    if(e.key == '|' || e.key == "\\"){
        document.getElementById('backslash').classList.add("key-active");
        passToInputBox(e.key);
    }

    //if semicolon is pressed 
    if(e.key == ';' || e.key == ":"){
        document.getElementById('semicolon').classList.add("key-active");
        passToInputBox(e.key);
    }

    //if singlequote is pressed 
    if(e.key == '\'' || e.key == "\""){
        document.getElementById('singlequote').classList.add("key-active");
        passToInputBox(e.key);
    }

    //if comma is pressed 
    if(e.key == ',' || e.key == "<"){
        document.getElementById('comma').classList.add("key-active");
        passToInputBox(e.key);
    }

    //if fullstop is pressed 
    if(e.key == '.' || e.key == ">"){
        document.getElementById('fullstop').classList.add("key-active");
        passToInputBox(e.key);
    }

    //if slash is pressed 
    if(e.key == '/' || e.key == "?"){
        document.getElementById('slash').classList.add("key-active");
        passToInputBox(e.key);
    }

    //if caps lock is clicked
    if(e.key == "CapsLock"){
        document.getElementById('capslockkey').classList.add("key-active");
        capsLockKey = true;
        document.querySelector('#capsLockStatus').style.backgroundColor = "#18FA76";
        setTimeout(function(){
            document.getElementById('capslockkey').classList.remove("key-active");
        }, 95);
    }

    //if delete key is pressed
    else if(e.key == "Backspace"){
        document.getElementById('delete').classList.add("key-active");
        deleteKey();
        setTimeout(function(){
            document.getElementById('delete').classList.remove("key-active");
        }, 95);
    }

    //if left modifier keys are pressed 
    if(e.code == "ControlLeft" || e.code == "AltLeft" || e.code == "MetaLeft" || e.code == "MetaRight" || e.code == "AltRight" || e.code =="ArrowLeft" || e.code =="ArrowRight"){
        document.getElementById(e.code).classList.add("key-active");
        setTimeout(function(){
            document.getElementById(e.code).classList.remove("key-active");
        }, 95);
    }

    //if up and down modifier keys are pressed 
    if(e.code == "ArrowUp" || e.code == "ArrowDown"){
        document.getElementById(e.code).classList.add("arrowkey-active");
        setTimeout(function(){
            document.getElementById(e.code).classList.remove("arrowkey-active");
        }, 95);
    }

});

//EVENT listener for the keyup values on keyboard
document.addEventListener("keyup", (e) => {

    //if caps lock is turned off (keyup)...
    if(e.key == "CapsLock"){
        document.getElementById('capslockkey').classList.add("key-active");
        capsLockKey = false;
        document.querySelector('#capsLockStatus').style.backgroundColor = "#fff";
        setTimeout(function(){
            document.getElementById('capslockkey').classList.remove("key-active");
        }, 95);
    }

    //if left shift key is unpressed
    if(e.key == "Shift" && e.code =="ShiftLeft"){
        document.getElementById('leftshiftkey').classList.remove("key-active");
    } 

    //if right shift key is unpressed
    if(e.key == "Shift" && e.code =="ShiftRight"){
        document.getElementById('rightshiftkey').classList.remove("key-active");
    } 

    //if space key is unpressed
    if(e.code =="Space"){
        document.getElementById('spacekey').classList.remove("key-active");
    } 

    //if enter key is unpressed
    if(e.code =="Enter"){
        document.getElementById('returnkey').classList.remove("key-active");
    } 

    //if ~ or ` is unpressed 
    if(e.key == "~" || e.key == "`"){
        document.getElementById('backquote').classList.remove("key-active");
    }

    //if 1 is unpressed 
    if(e.key == "1" || e.key == "!"){
        document.getElementById('1').classList.remove("key-active");
    }

    //if 2 is unpressed 
    if(e.key == "2" || e.key == "@"){
        document.getElementById('2').classList.remove("key-active");
    }

    //if 3 is unpressed 
    if(e.key == "3" || e.key == "#"){
        document.getElementById('3').classList.remove("key-active");
    }

    //if 4 is unpressed 
    if(e.key == "4" || e.key == "$"){
        document.getElementById('4').classList.remove("key-active");
    }

    //if 5 is unpressed 
    if(e.key == "5" || e.key == "%"){
        document.getElementById('5').classList.remove("key-active");
    }

    //if 6 is unpressed 
    if(e.key == "6" || e.key == "^"){
        document.getElementById('6').classList.remove("key-active");
    }

    //if 7 is unpressed 
    if(e.key == "7" || e.key == "&"){
        document.getElementById('7').classList.remove("key-active");
    }

    //if 8 is unpressed 
    if(e.key == "8" || e.key == "*"){
        document.getElementById('8').classList.remove("key-active");
    }

    //if 9 is unpressed 
    if(e.key == "9" || e.key == "("){
        document.getElementById('9').classList.remove("key-active");
    }

    //if 0 is unpressed 
    if(e.key == "0" || e.key == ")"){
        document.getElementById('0').classList.remove("key-active");
    }

    //if subtract is unpressed 
    if(e.key == "-" || e.key == "_"){
        document.getElementById('subtract').classList.remove("key-active");
    }

    //if equal is unpressed 
    if(e.key == "=" || e.key == "+"){
        document.getElementById('equal').classList.remove("key-active");
    }

    //if openingbracket is unpressed 
    if(e.key == "[" || e.key == "{"){
        document.getElementById('openingbracket').classList.remove("key-active");
    }

    //if closingbracket is unpressed 
    if(e.key == "}" || e.key == "]"){
        document.getElementById('closingbracket').classList.remove("key-active");
    }

    //if backslash is unpressed 
    if(e.key == "|" || e.key == "\\"){
        document.getElementById('backslash').classList.remove("key-active");
    }

    //if semicolon is unpressed 
    if(e.key == ";" || e.key == ":"){
        document.getElementById('semicolon').classList.remove("key-active");
    }

    //if singlequote is unpressed 
    if(e.key == "'" || e.key == "\""){
        document.getElementById('singlequote').classList.remove("key-active");
    }

    //if comma is unpressed 
    if(e.key == "," || e.key == "<"){
        document.getElementById('comma').classList.remove("key-active");
    }

    //if fullstop is unpressed 
    if(e.key == "." || e.key == ">"){
        document.getElementById('fullstop').classList.remove("key-active");
    }

    //if slash is unpressed 
    if(e.key == "/" || e.key == "?"){
        document.getElementById('slash').classList.remove("key-active");
    }

});
