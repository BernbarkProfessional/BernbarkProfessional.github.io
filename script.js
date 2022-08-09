
/*      Loading Section for Common HTML Elements        */
const sidebar = document.querySelector('#sidebar')
fetch('/sidebar.html')
.then(res=>res.text())
.then(data=>{
    if(data){
        sidebar.innerHTML = data
    }
    
})
const bottombar = document.querySelector('#bottombar')
fetch('/bottombar.html')
.then(res=>res.text())
.then(data=>{
    if(data){
        bottombar.innerHTML = data
    }
    
})/*
const question_m = document.querySelector('archive-why-button')
fetch('/question_mark.html')
.then(res=>res.text())
.then(data=>{
    if(data){
        question_m.innerHTML = data
    }
    
})*/
/*      End Loading of Common HTML Elements     */

setTimeout(function(){
    let dropdownBtn = document.querySelector('.menu-btn');
    let menuContent = document.querySelector('.menu-content');
    
    dropdownBtn.addEventListener('click',()=>{
        if(menuContent.style.display===""){
            menuContent.style.display="block";
            
        } else {
            menuContent.style.display="";
            
        }
    })

    
    
},250);

document.getElementById("WhyButton").onmouseover = function() {animateQuestionMark()};
document.getElementById("WhyButton").onmouseout = function() {animateQuestionMark()};

/* This function animates the question mark image on any pages which use it (mostly archives for now) 
    I had some trouble getting this to work properly, originally was setting the src image to nothing which was changing the size of the button.
    This was then making the button immediately fire the mouseout event and then mousein would start in a constant loop.

    To fix that I made an empty image of the same pixel size and instead of making src == "" I made it equal to that image.

    All of this trouble was because the animation was being covered up by the initial image of the question mark.
*/
function animateQuestionMark(){
    let questionMarkBtn = document.querySelector('.archive-why-button');
    if(questionMarkBtn != null){
        
        if(questionMarkBtn.getAttribute("src") == "./Resources/Images/empty_space.png"){
            questionMarkBtn.setAttribute('src','./Resources/Images/question_mark.png');
        }
        else{
            questionMarkBtn.setAttribute('src','./Resources/Images/empty_space.png');
        }
    }
}






