//JS File for Calculator by Anshul Singh

//func to make the display zero
function display_zero() {
    document.getElementById("calc_result").textContent = "0";
}

var final_str = "";

//function to register a click on the digit button or from the keyboard numeric keys 
function input_tracking() {
    
} 


//function to save the digit button
function onclick_digit(digit)
{
    final_str += digit;
    show_display();
}
//func to display the final variable value on display
function show_display(){
    document.getElementById("calc_result").textContent = final_str;
}

//func to clear everything and display zero
function clear_all(){
    final_str = "";
    display_zero();
}

//function to show the result 
function show_result(){
    var final_num;
    var number_array = ["",""];
    var x = 0; 
    var operator = "";
    var n1,n2;
    for(var i=0; i<final_str.length; )
    {
        if(final_str[i]=="0" || final_str[i]=="1" || final_str[i]=="2" || final_str[i]=="3" || final_str[i]=="4" || final_str[i]=="5" || final_str[i]=="6" || final_str[i]=="7" || final_str[i]=="8" || final_str[i]=="9" || final_str[i]==".")
        {
            number_array[x] += final_str[i];
            i++;
        }
        if(final_str[i]=="*" || final_str[i]=="/" || final_str[i]=="+" || final_str[i]=="-")
        {
            operator = final_str[i];
            x++;
            i++;
        }    
    }
    n1 = Number(number_array[0]);
    n2 = Number(number_array[1]);
    
    //if the second number is zero - throw error
    if(n2 == 0)
    {
        document.getElementById("calc_result").textContent = "Error !";
        final_str ="";
    }
    else
    {
        switch(operator){
                case "+":   final_num = n1 + n2;
                            break;
                case "*":   final_num = n1 * n2;
                            break;
                case "-":   final_num = n1 - n2;
                            break;
                case "/":   final_num = n1 / n2;
                            break;
        }
        document.getElementById("calc_result").textContent = final_num;
        final_str ="";
    }
}