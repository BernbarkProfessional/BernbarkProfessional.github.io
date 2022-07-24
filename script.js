
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
    
})

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






