const tableDataButton = document.querySelectorAll('td');
for (let index = 0; index < tableDataButton.length; index++) {
    let element = tableDataButton[index];
    element.addEventListener('click', ()=> {
        console.log('text');
        let overlay = document.createElement('circle');
        overlay.style.cssText = `
            position: absolute;
            height: 450px;
            width: 450px;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            background-color: rgba(245, 222, 179, 0.514);
            z-index: -1;
            border-radius: 50%;
            opacity: 0;
            animation: button_animation .5s ease;
        `
        overlay.addEventListener('animationend',(e)=>{
            e.target.remove();
        })
        element.appendChild(overlay);
    });
}   

    


var Game = {
    gold: 0,
    totalGold: 0,
    totalClicks: 0,
    clickValue: 1,
    version: 0.001,

    addToGold: function(amount){
        this.gold += amount;
        this.totalGold += amount;
        display.updateScore();
    },

    getScorePerSecond: function(){
        var scorePerSecond = 0;
        for(i = 0; i < building.name.length; i++){
            scorePerSecond += building.income[i] * building.count[i];
        }
        return scorePerSecond;
    }

};

var building = {
    name:[
        "Old Couch:",
        "Cracked TV:",
        "3-Legged Coffee Table"
    ],
    image:[
        "oldcouch.PNG",
        "crackedtv.PNG",
        "coffeetable.PNG"
    ],
    count:[
        0,
        0,
        0
    ],
    income:[
        1,
        6,
        76
    ],
    cost:[
        20,
        100,
        10000
    ],
    description:[
        "Wow! You paid for something that should be free!",
        "Changing the definition of split-screen gaming.",
        "The fourth leg was too expensive."
    ],

    purchase: function(index){
        if(Game.gold >= this.cost[index]){
            Game.gold -= this.cost[index];
            this.count[index]++;
            this.cost[index] = Math.round(this.cost[index] * 1.145);
            display.updateScore();
            display.updateShop();
            display.updateUpgrades();
        }
    }
};

var upgrade ={
    name:[
        "Loose Change:",
        "Red Fingers:",
        "Potato",
        "Sticky Fingers",
        "Stink Eye"
    ],
    effect: [
        "2x Boost to Couch Income",
        "5x Boost to Click Power",
        "3x Boost to Couch Income",
        "10x Boost to Click Power",
        "5x Boost to TV Power"
    ],
    description: [
        "Couches are a great form of passive income.",
        "The power in the red-stained finger is brought to you by Hot Cheetos.",
        "What's a couch without a potato?",
        "I'm not even going to ask what made them sticky.",
        "You're getting the stink eye from your loved ones for not fixing the TV situation"
    ],
    image:[
        "loosechange.PNG",
        "redfinger.PNG",
        "potato.PNG",
        "stickyfingers.PNG",
        "stinkeye.PNG"
    ],
    type:[
        "building",
        "click",
        "building",
        "click",
        "building"
    ],
    cost:[
        300,
        500,
        10000,
        10000,
        1000000
    ],
    //Which building index does this upgrade affect
    buildingIndex: [
        0,
        -1,
        0,
        -1,
        1
    ],
    requirement: [
        10,
        25,
        25,
        1000,
        50
    ],
    bonus: [
        2,
        5,
        3,
        10,
        5
    ],
    purchased: [
        false,
        false,
        false,
        false,
        false
    ],
    spawned:[
        false,
        false,
        false,
        false,
        false
    ],
    
    purchase: function(index){
        if(!this.purchased[index] && Game.gold >= this.cost[index]){
            if(this.type[index] == "building" && building.count[this.buildingIndex[index]] >= this.requirement[index]){
                Game.gold -= this.cost[index];
                building.income[this.buildingIndex[index]] *= this.bonus[index];
                this.purchased[index] = true;
                display.updateUpgrades();
                display.updateScore();
            }
            else if(this.type[index] == "click" && Game.totalClicks >= this.requirement[index]){
                Game.gold -= this.cost[index];
                Game.clickValue *= this.bonus[index];
                this.purchased[index] = true;
                display.updateUpgrades();
                display.updateScore();
            }
        }
    }
};

var display = {
    updateScore: function() {
        document.getElementById("gold").innerHTML = "Gold: " +Game.gold;
        document.getElementById("goldPerSecond").innerHTML = "Gold per second: " +Game.getScorePerSecond();
        document.getElementById("clickPower").innerHTML = "Gold per click: " +Game.clickValue;
        document.title = "Gold: " + Game.gold;
    },
    updateShop: function() {
        document.querySelector('.shopContainer').innerHTML = "";
        for(i=0; i < building.name.length; i++){
            document.querySelector('.shopContainer').innerHTML += '<td style="background-image: url(./Resources/Images/'+building.image[i]+'); background-size: cover; width: 180px; background-repeat: no-repeat;"></td><td onclick="building.purchase('+i+')"><p>'+building.name[i]+'</p><p>$'+building.cost[i]+'</p><p>'+building.count[i]+'</p><h3>'+building.description[i]+'</h3></td>'
        }
    },
    updateUpgrades: function() {
        document.querySelector('.upgradeContainer').innerHTML = "";
        document.querySelector('.upgrade-sidebar').innerHTML = '';
        for(i=0; i< upgrade.name.length; i++){
            
            // Create a section for already purchased upgrades to be reviewed
            if(upgrade.purchased[i]){
                
                document.querySelector('.upgradeContainer').innerHTML += '<td><img style="padding: 5px; object-fit: center; opacity: 0.5; top:40%;" src="./Resources/Images/'+upgrade.image[i]+'" title="'+upgrade.name[i] +' &#10; '+upgrade.effect[i]+' &#10; '+upgrade.description[i]+'&#10; ($'+upgrade.cost[i]+')"></td>';
            }
            else {
                upgrade.spawned[i] = true;
                if(upgrade.type[i] == "building" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]){
                    document.querySelector('.upgrade-sidebar').innerHTML += '<img src="./Resources/Images/'+upgrade.image[i]+'" title="'+upgrade.name[i] +' &#10; '+upgrade.effect[i]+' &#10; '+upgrade.description[i]+'&#10; ($'+upgrade.cost[i]+')" onclick="upgrade.purchase('+i+')">';
                }
                else if (upgrade.type[i] == "click" && Game.totalClicks >= upgrade.requirement[i]){
                    document.querySelector('.upgrade-sidebar').innerHTML += '<img src="./Resources/Images/'+upgrade.image[i]+'" title="'+upgrade.name[i] +' &#10; '+upgrade.effect[i]+' &#10; '+upgrade.description[i]+'&#10; ($'+upgrade.cost[i]+')" onclick="upgrade.purchase('+i+')">';
                }
                
            }
            
        }
    }
};

function resetGame(){
    //if(confirm("Are you sure you wish to reset all of your progress?")){
        var gameSave = {};
        localStorage.setItem("gameSave",JSON.stringify(gameSave));
        location.reload();
    //}
}

function saveGame(){
    var gameSave = {
        gold: Game.gold,
        totalGold: Game.totalGold,
        totalClicks: Game.totalClicks,
        clickValue: Game.clickValue,
        version: Game.version,
        buildingCount: building.count,
        buildingIncome: building.income,
        buildingCost: building.cost,
        upgradePurchased: upgrade.purchased
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame(){
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if(localStorage.getItem('gameSave') !== null){
        if(typeof savedGame.gold !== "undefined") Game.gold = savedGame.gold;
        if(typeof savedGame.totalGold !== "undefined") Game.totalGold = savedGame.totalGold;
        if(typeof savedGame.totalClicks !== "undefined") Game.totalClicks = savedGame.totalClicks;
        if(typeof savedGame.clickValue !== "undefined") Game.clickValue = savedGame.clickValue;
        if(typeof savedGame.buildingCount !== "undefined"){
            for (let index = 0; index < savedGame.buildingCount.length; index++) {
                building.count[index] = savedGame.buildingCount[index];
                
            }
        }
        if(typeof savedGame.buildingIncome !== "undefined"){
            for (let index = 0; index < savedGame.buildingIncome.length; index++) {
                building.income[index] = savedGame.buildingIncome[index];
                
            }
        }
        if(typeof savedGame.buildingCost !== "undefined"){
            for (let index = 0; index < savedGame.buildingCost.length; index++) {
                building.cost[index] = savedGame.buildingCost[index];
                
            }
        }
        if(typeof savedGame.upgradePurchased !== "undefined"){
            for (let index = 0; index < savedGame.upgradePurchased.length; index++) {
                upgrade.purchased[index] = savedGame.upgradePurchased[index];
                
            }
        }
    }
}

setInterval(function() {
    saveGame();
},30000);

setInterval(function() {
    display.updateScore();
    display.updateUpgrades();
},10000);

document.getElementById("clicker").addEventListener("click", function(){
    Game.totalClicks++;
    Game.addToGold(Game.clickValue);
}, false);

window.onload = function(){
    loadGame();
    display.updateScore();
    display.updateUpgrades();
    display.updateShop();
}

setInterval(function(){
    Game.gold += Game.getScorePerSecond();
    Game.totalGold += Game.getScorePerSecond();
    display.updateScore();
},1000)

/*var gold = 0;

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
};*/