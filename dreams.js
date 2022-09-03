const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    "If You...",/**
    "",
    
    "Had A Dream...",
    "",
    
    "Would You",
    "",
    
    "Let It Slip by?",
    "",
    
    "Or would you fight...",
    "",
    
    "Every day of your life?",
    "",
    
    "Dreams"
    */
];

const morphTime = 4.5;
const cooldownTime = 0.15;

let dreamSequenceFinish = false;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;
let dreamTextContainer = document.querySelector(".three-d-element");
let slides = document.querySelectorAll(".animated-rotation-slide");

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

setupSlides();


function setupSlides(){
    console.log(slides.length)
    for(let i = 0; i < slides.length; i++){
        console.log(slides[i])
        
        slides[i].onmouseover = function() {mouseOverSlides(i)};
        
        
    }
}

let parent = document.querySelector(".parent");

function setUpParentBox(){
    parent.onmouseover = function() {mouseOverParentBox()};
}

function mouseOverParentBox(){
    makeSlidesVisible();
}

function makeSlidesVisible(){
    for(let i = 0; i < slides.length; i++){
        
        slides[i].style.opacity = 1;
        
    }
}

let slideAnima;

function mouseOverSlides(index) {
    
    slides[index].style.WebkitTransitionDuration='1.5s';
    slides[index].style.webkitTransform = 'rotateX(180deg)';
    setTimeout(function() {
        slides[index].style.webkitTransform = 'rotateX(0deg)';
    }, 1500);
}

function setUpDreamText(){
    dreamTextContainer.onmouseover = function() {mouseOverDreamsText()};
}

function mouseOverDreamsText(){
    console.log(dreamSequenceFinish);
    if(dreamSequenceFinish){
        dreamTextContainer.classList.add('.is-flipped');
        dreamTextContainer.style.WebkitTransitionDuration='1s';
        dreamTextContainer.style.webkitTransform = 'rotateY(180deg)';
    }
    
}




function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

let anima;
let count = 0

function animate() {
    anima = window.requestAnimationFrame(animate);
    
    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
            
            if(textIndex  > (texts.length * 2)-2){
                // Add animation to DREAMS text here
                stopAnimation();
                endOfDreamSequence();
            }
        }
        
       
        doMorph();
        
    } else{
        
        doCooldown();
    }
    
}

function resetDreamSequence(){
    dreamSequenceFinish = false;
    textIndex = texts.length - 1;
    dreamTextContainer.classList.remove('.is-flipped');
    dreamTextContainer.style.WebkitTransitionDuration='1s';
    dreamTextContainer.style.webkitTransform = 'rotateY(-1080deg)';
    setTimeout(function() {
        
    }, 1000);
    animate();
}

function endOfDreamSequence(){
    dreamSequenceFinish = true;
}

function draw() 
{
  var canvas = document.getElementById('canvas');
  if (canvas.getContext)
  {
    var context = canvas.getContext('2d');

    context.beginPath();
    context.moveTo(75,75);
    context.lineTo(10,75);
    context.lineTo(10,25);
    context.fillStyle = "rgb(256,0,0)";
    
    
  }
}

function stopAnimation(){
    window.cancelAnimationFrame(anima);
}
setUpDreamText();
setUpParentBox();
//draw();
animate();