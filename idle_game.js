var gold = 0;

var oldCouches = 0;
var oldCouchesCost = 20;
var couchIncome = 1;

var crackedTV = 0;
var crackedTVCost = 100;
var crackedTVIncome = 5;

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

function buyCrackedTV() {
    if(gold >= crackedTVCost){
        gold = gold - crackedTVCost;
        crackedTV = crackedTV + 1;
        crackedTVCost = Math.round(crackedTVCost * 1.145);
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
    document.getElementById("crackedTVs").innerHTML = "TVs: "+crackedTV;
    document.getElementById("crackedTVCost").innerHTML = "Cracked TV: $"+crackedTVCost;
}

setInterval(function(){
    gold = gold + (couchIncome * oldCouches);
    gold = gold + (crackedTVIncome * crackedTV);
    updateUI();
}, 1000);

function saveGame(){
    var gameSave = {
        gold: gold,
        oldCouches: oldCouches,
        oldCouchesCost: oldCouchesCost,
        crackedTV: crackedTV,
        crackedTVCost, crackedTVCost
    };
    localStorage.setItem("gameSave",JSON.stringify(gameSave));
}

function loadGame(){
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if(typeof savedGame.gold !== "undefined") gold = savedGame.gold;
    if(typeof savedGame.oldCouches !== "undefined") oldCouches = savedGame.oldCouches;
    if(typeof savedGame.oldCouchesCost !== "undefined") oldCouchesCost = savedGame.oldCouchesCost;
    if(typeof savedGame.crackedTV !== "undefined") crackedTV = savedGame.crackedTV;
    if(typeof savedGame.crackedTVCost !== "undefined") crackedTVCost = savedGame.crackedTVCost;
}

setInterval(function(){
    saveGame();
}, 30000)

window.onload = function() {
    loadGame();
    updateUI();
};