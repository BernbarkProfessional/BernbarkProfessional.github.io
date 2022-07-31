setTimeout(function(){
    var rotateOn = document.querySelector("input");
    function updateDebugState() {
        let archiveWrapper = document.querySelector("archive-body");
        archiveWrapper.classList.toggle('rotate-on', rotateOn.checked);
    };
    rotateOn.addEventListener("click", updateDebugState);
    updateDebugState();
},250)
