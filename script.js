

const sidebar = document.querySelector('#sidebar')
fetch('/sidebar.html')
.then(res=>res.text())
.then(data=>{
    sidebar.innerHTML = data
})
let dropdownBtn = document.querySelector('.menu-btn');
let menuContent = document.querySelector('.menu-content');
if(dropdownBtn != null){
    dropdownBtn.addEventListener('click',()=>{
        if(menuContent.style.display===""){
            menuContent.style.display="block";
        } else {
            menuContent.style.display="";
        }
    })
    dropdownBtn.addEventListener('mouseout',()=>{
        
        menuContent.style.display="";
        
    })
}




