setTimeout(function(){
    var rotateOn = document.querySelector("rotate-button");
    function updateDebugState() {
        let archiveWrapper = document.querySelector("archive-body");
        archiveWrapper.classList.toggle('rotate-on', rotateOn.checked);
    };
    rotateOn.addEventListener("click", updateDebugState);
    updateDebugState();
},250)
