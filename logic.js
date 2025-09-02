//function for a header tab to make active... 
function make_tab_active(temp)
{
    if(temp == "work_tab")
    {
        document.getElementById("work_container").style.display = "flex";
        document.getElementById("work_tab").classList = "tab_active";
        
        document.getElementById("afterwork_container").style.display = "none";
        document.getElementById("afterwork_tab").classList = "tab_inactive"; 
        
    }
    else if(temp == "afterwork_tab")
    {
        document.getElementById("afterwork_container").style.display = "flex";
        document.getElementById("afterwork_tab").classList = "tab_active";
        
        document.getElementById("work_container").style.display = "none";
        document.getElementById("work_tab").classList = "tab_inactive";
    }
}

//function for hello animation and delay
const animationStart = () => {
    document.getElementById('hello_container').classList.add('fin');
}
setTimeout(animationStart, 150);
animationStart();