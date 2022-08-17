var gold = 0;

var oldCouches = 0;
var oldCouchesCost = 20;
var couchIncome = 1;

// Buying Section

function buyOldCouch() {
    if(gold >= oldCouchesCost){
        gold = gold - oldCouchesCost;
        oldCouches = oldCouches + 1;
        oldCouchesCost = Math.round(oldCouchesCost * 1.14);
        updateUI();
        saveGame();
        
    }
}

function addToScore(amount){
    gold = gold + amount;
    updateUI();
    saveGame();
}

function updateUI(){
    document.getElementById("gold").innerHTML = "Gold: " +gold;
    document.getElementById("oldCouches").innerHTML = "Couches: "+oldCouches;
    document.getElementById("oldCouchesCost").innerHTML = "Old Couch: $"+oldCouchesCost;
}

setInterval(function(){
    gold = gold + (couchIncome * oldCouches);
    updateUI();
}, 1000);

function saveGame(){
    var gameSave = {
        gold: gold,
        oldCouches: oldCouches,
        oldCouchesCost: oldCouchesCost
    };
    localStorage.setItem("gameSave",JSON.stringify(gameSave));
}

function loadGame(){
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if(typeof savedGame.gold !== "undefined") gold = savedGame.gold;
    if(typeof savedGame.oldCouches !== "undefined") oldCouches = savedGame.oldCouches;
    if(typeof savedGame.oldCouchesCost !== "undefined") oldCouchesCost = savedGame.oldCouchesCost;
}

setInterval(function(){
    saveGame();
}, 30000)

window.onload = function() {
    loadGame();
    updateUI();
};