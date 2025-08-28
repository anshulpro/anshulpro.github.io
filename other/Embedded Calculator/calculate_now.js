//display ids
let secondaryDisplayString = "";
let primaryDisplayString = "";
const secondaryDisplayId = document.getElementById("display_screen_text_secondary");
const primaryDisplayId = document.getElementById("display_screen_text_primary");

let isEqualsToPressed = false;

//function to render the secondary text on the display
function showSecondaryDisplay() {
    secondaryDisplayId.textContent = secondaryDisplayString || "0";
}

//the two functions will run the first time just to display the default 0 on the display
showSecondaryDisplay();
showPrimaryDisplay();

//function to make the commas as per indian local standards
function standardStringNotation(string) {
    let num = Number(string).toLocaleString('en-IN');
    return String(num);
} 

//function to render the primary text on the display
function showPrimaryDisplay() {
    primaryDisplayId.textContent = standardStringNotation(primaryDisplayString) || "0";
    isEqualsToPressed = true;
}


//the switch cases for the number and decimal buttons
const gridContainerNumbers = document.getElementById('grid-container-numbers');
gridContainerNumbers.onclick = (event) =>{
    switch(event.target.id){
        case 'number1': secondaryDisplayString += "1";
                        break;
        case 'number2': secondaryDisplayString += "2";
                        break;
        case 'number3': secondaryDisplayString += "3";
                        break;
        case 'number4': secondaryDisplayString += "4";
                        break;
        case 'number5': secondaryDisplayString += "5";
                        break;
        case 'number6': secondaryDisplayString += "6";
                        break;
        case 'number7': secondaryDisplayString += "7";
                        break;
        case 'number8': secondaryDisplayString += "8";
                        break;
        case 'number9': secondaryDisplayString += "9";
                        break;
        case 'number0': secondaryDisplayString += "0";
                        break;
        case 'number00': secondaryDisplayString += "00";
                        break;
        case 'number000': secondaryDisplayString += "000";
                        break;
        case 'decimal': secondaryDisplayString += ".";
                        break;
    }
    showSecondaryDisplay();
}

//capturing input keyboard keys 
document.onkeydown = (event) => {
    if(calculateParent.classList.contains('visible')){
        //numbers, decimals, operators
        const allowedKeys = "0123456789.+-*/";
        if (allowedKeys.includes(event.key)) {
            secondaryDisplayString += event.key;
            showSecondaryDisplay();
        }

        //equalTo button
        else if(event.key == "="){
            if(/[+\-*/]/.test(secondaryDisplayString)){
                primaryDisplayString = eval(secondaryDisplayString).toFixed(2);
                showPrimaryDisplay();
            }
        }

        //Delete button
        else if(event.key == "Backspace"){
            if(secondaryDisplayString.length > 0){
                secondaryDisplayString = secondaryDisplayString.slice(0, -1);
                showSecondaryDisplay();
            }
        }

        //AC button
        else if(event.key == "Clear"){
            if(secondaryDisplayString.length > 0){
                secondaryDisplayString = "";
                showSecondaryDisplay();
                primaryDisplayString = "";
                showPrimaryDisplay();
            }
        }
    }
};

//adding event listeners on all the operators
const gridContainerOperators = document.getElementById('grid-container-operator');
gridContainerOperators.onclick = (event) =>{
    if(event.target.id == "plusOperator")   
        secondaryDisplayString += "+";
    else if(event.target.id == "minusOperator")
        secondaryDisplayString += "-";
    else if(event.target.id == "divisionOperator")
        secondaryDisplayString += "/";
    else if(event.target.id == "multiplicationOperator")
        secondaryDisplayString += "*";
    showSecondaryDisplay();
}


//delete button to keep removing the last operand/operator pressed 
const deleteButton = document.getElementById('deleteButton');
deleteButton.onclick = () => {
    if(secondaryDisplayString.length > 0){
        secondaryDisplayString = secondaryDisplayString.slice(0, -1);
        showSecondaryDisplay();
    }
}

//AC or all clear button to delete the current display and reset 
const clearCurrentCalculationButton = document.getElementById('clearCurrentCalculationButton');
clearCurrentCalculationButton.onclick = () => {
    if(secondaryDisplayString.length >= 0 || primaryDisplayString.length >= 0){
        secondaryDisplayString = "";
        showSecondaryDisplay();
        primaryDisplayString = "";
        showPrimaryDisplay();
    }
}

//adding event listeners on equalsTo button 
const equalsTo = document.getElementById('equalsTo');
equalsTo.onclick = () => {
    //check if the there is an operator included or not
    if(/[+\-*/]/.test(secondaryDisplayString)){
        primaryDisplayString = eval(secondaryDisplayString);
        if(Number(primaryDisplayString) % 1 !==0){
            primaryDisplayString = String(Number(primaryDisplayString).toFixed(2));
        }
        showPrimaryDisplay();
    } 
    //last step would be to use the commas properly to show the evaluated sum
}


//when save button is pressed, the calculation is saved in the memory
const calculationHistoryParent = document.getElementById('calculation_history');
const saveCurrentCalculationButton = document.getElementById('save_current_calculation_button');
saveCurrentCalculationButton.onclick = () => {
    //when equalstobutton is pressed atleast once
    if(isEqualsToPressed == true && secondaryDisplayString !=="" && primaryDisplayString !==""){
        calculationHistoryParent.insertAdjacentHTML('afterbegin', `
            <div class="calculation_history_container">
                    <div class="calculation_history_item_dropdown"> 
                        <button class="three_dot_icon_button"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19 19.75C19 18.9216 19.6716 18.25 20.5 18.25C21.3284 18.25 22 18.9216 22 19.75C22 20.5784 21.3284 21.25 20.5 21.25C19.6716 21.25 19 20.5784 19 19.75Z" fill="black" fill-opacity="0.4"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19 14.5C19 13.6716 19.6716 13 20.5 13C21.3284 13 22 13.6716 22 14.5C22 15.3284 21.3284 16 20.5 16C19.6716 16 19 15.3284 19 14.5Z" fill="black" fill-opacity="0.4"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19 25C19 24.1716 19.6716 23.5 20.5 23.5C21.3284 23.5 22 24.1716 22 25C22 25.8284 21.3284 26.5 20.5 26.5C19.6716 26.5 19 25.8284 19 25Z" fill="black" fill-opacity="0.4"/>
                        </svg></button>
                        <div class="calculation_history_item_dropdown_menu">
                            <div class="calculation_history_item_dropdown_menu_item" data-action="useCalculations">Use this value</div>
                            <div class="calculation_history_item_dropdown_menu_item" data-action="copyToClipboard">Copy</div>
                            <div class="calculation_history_item_dropdown_menu_item" data-action="removeCalculation">Remove</div>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 2px;">
                        <div class="calculation_history_text_secondary">${secondaryDisplayString}</div>
                        <div class="calculation_history_text_primary">${standardStringNotation(primaryDisplayString)}</div>
                    </div>
                </div>`);
        secondaryDisplayString = "";
        showSecondaryDisplay();
        primaryDisplayString = "";
        showPrimaryDisplay();
    }
}

//when 3 dots button is clicked the dropdown opens
const calculationHistoryList = document.getElementById('calculation_history');

//input field 
const inputField = document.getElementById('input_field');

calculationHistoryList.onclick = (event) =>{
  // Only respond if a three-dot button was clicked
  if (event.target.parentNode.classList.contains('three_dot_icon_button')) {

    // Find the dropdown for the clicked list item
    const listItem = event.target.closest('div');
    const specificdropdown = listItem.querySelector('.calculation_history_item_dropdown_menu');
    specificdropdown.style.display = 'flex';

    //option1 - "Use this value" passes the value from the history to the input field
    const useThisValue = listItem.parentNode.querySelector('[data-action="useCalculations"]');
    useThisValue.onclick = () => {
        // cleanvalue is required since the value has commas which need to removed before passing to input field as it is of type number
        inputField.value = listItem.parentNode.querySelector('.calculation_history_text_primary').textContent;
    }
    //option2 - "Copy" copies the final value to clipboard
    const copyToClipboard = listItem.parentNode.querySelector('[data-action="copyToClipboard"]');
    copyToClipboard.onclick = () =>{
        navigator.clipboard.writeText(listItem.parentNode.querySelector('.calculation_history_text_primary').textContent)
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
    }
    //option3 - "remove" removes the current calculation history item 
    const removeCalculation = listItem.parentNode.querySelector('[data-action="removeCalculation"]');
    removeCalculation.onclick = () => {
        removeCalculation.parentNode.parentNode.parentNode.remove();
    }
    // stop event bubbling
    event.stopPropagation();
  } 
  // If clicked outside any three-dot button, close all dropdowns
  else {
    document.querySelectorAll('.calculation_history_item_dropdown_menu').forEach(menu => {
      menu.style.display = 'none';
    });
  }
};

// Hide dropdowns if clicking outside the calculation history
document.onclick = () => {
    document.querySelectorAll('.calculation_history_item_dropdown_menu').forEach(menu => {
        menu.style.display = 'none';
    });
};

//toggle button on calculator icon
const calculateParent = document.getElementById('calculate_parent');
const calculateButton = document.getElementById('calculate_button');
calculateButton.onclick = () => {
    calculateButton.classList.toggle('calculate_button_OFF');
    calculateButton.classList.toggle('calculate_button_ON');
    calculateParent.classList.toggle('visible');
    calculateParent.classList.toggle('hidden');
}

//when you want to insert the current calculation to the input field
const useCurrentCalculationButton = document.getElementById('use_current_calculation_button');
useCurrentCalculationButton.onclick = () => {
    //when equalsTo button is pressed atleast once 
    if(isEqualsToPressed == true && secondaryDisplayString !=="" && primaryDisplayString !==""){
        inputField.value = standardStringNotation(primaryDisplayString);
    }
}