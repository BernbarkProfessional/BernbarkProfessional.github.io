

const tableDataButton = document.querySelectorAll('td');
for (let index = 0; index < tableDataButton.length; index++) {
    let element = tableDataButton[index];
    element.addEventListener('click', ()=> {
        
        
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
<<<<<<< HEAD
    },

    currentTimeUpdate: function(seconds){
        this.gold += Math.ceil(seconds * this.getScorePerSecond());
    },
=======
    }
>>>>>>> parent of 577a429 (Trying to figure out offline progress)

};

var building = {
    name:[
        "Old Couch:",
        "Cracked TV:",
        "3-Legged Coffee Table:"
    ],
    image:[
        "oldcouch.png",
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
        10,
        100
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
    id:[
        'oldcouch',
        'crackedtv',
        'coffeetable'
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
        "Potato:",
        "Sticky Fingers:",
        "Stink Eye:"
    ],
    id:[
        'loosechange',
        'redfingers',
        'potato',
        'stickyfingers',
        'stinkeye'

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

var achievement = {
    name: [
        "Not So Idle, Guy",
        "Get More Couches",
        "Secret Tip"
    ],
    id:[
        "click100",
        "couch25",
        "secrettip"
    ],
    description: [
        "Click 100 times!",
        "I don't see why you don't just get even more of them",
        "You found the secret tooltip!"
    ],
    image:[
        "click100.PNG",
        "couch25.PNG",
        "secrettip.PNG"
    ],
    // building, click, goldEarned, etc.
    type:[
        "click",
        "building",
        "secret"
    ],
    requirement:[
        100,
        25,
        1
    ],
    // -1 if it's not a building, otherwise go with the building index we are referring to
    objectIndex:[
        -1,
        0,
        -1
    ],
    awarded:[
        false,
        false,
        false
    ],
    
    earn: function(index){
        this.awarded[index] = true;
    }
};

var secret = {
    name:[
        "Secret Tip:"
    ],
    description:[
        "Good job finding me! The first time you click this button, receive 10000 in cold hard cash!"
    ],
    activated:[
        false
    ],

    activate: function(index){
        this.activated[index] = true;
    }
}

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
            document.querySelector('.shopContainer').innerHTML += '<td id="'+building.id[i]+'" style="background-image: url(./Resources/Images/'+building.image[i]+'); background-size: cover; width: 180px; background-repeat: no-repeat;"></td><td onclick="building.purchase('+i+')"><p>'+building.name[i]+'</p><p>$'+building.cost[i]+'</p><p>'+building.count[i]+'</p><h3>'+building.description[i]+'</h3></td></span>'
        }
        // When shop items get purchased, the content of the tooltip
        // has changed and must be created again
        createTooltips();
    },
    updateUpgrades: function() {
        document.querySelector('.upgradeContainer').innerHTML = "";
        document.querySelector('.upgrade-sidebar').innerHTML = '';
        for(i=0; i< upgrade.name.length; i++){
            
            // Create a section for already purchased upgrades to be reviewed
            if(upgrade.purchased[i]){
                
                document.querySelector('.upgradeContainer').innerHTML += '<tr><td id="'+upgrade.id[i]+'"><img style="padding: 5px; object-fit: center; opacity: 0.5;" src="./Resources/Images/'+upgrade.image[i]+'"</td><td><h3>'+upgrade.name[i]+'</h3><h5>'+upgrade.effect[i]+'</h5><h5 class="emphasized">'+upgrade.description[i]+'</h5></td></tr>';
            }
            else {
                upgrade.spawned[i] = true;
                if(upgrade.type[i] == "building" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]){
                    document.querySelector('.upgrade-sidebar').innerHTML += '<img id="'+upgrade.id[i]+'" src="./Resources/Images/'+upgrade.image[i]+'" >';
                }
                else if (upgrade.type[i] == "click" && Game.totalClicks >= upgrade.requirement[i]){
                    document.querySelector('.upgrade-sidebar').innerHTML += '<img id="'+upgrade.id[i]+'" src="./Resources/Images/'+upgrade.image[i]+'" >';
                }
                
            }
            
        }
       // When shop items get purchased, the content of the tooltip
        // has changed and must be created again
        createTooltips();
    },
    updateAchievements: function(){
        document.querySelector('.achievementContainer').innerHTML = "";
        for (let index = 0; index < achievement.name.length; index++) {
            if(achievement.awarded[index]){
                document.querySelector('.achievementContainer').innerHTML += '<img id="'+achievement.id[index]+'" src="./Resources/Images/'+achievement.image[index]+'" >';
            }
            
        }
        // When shop items get purchased, the content of the tooltip
        // has changed and must be created again
        createTooltips();
    }
};

function createTooltips(){
    for (let index = 0; index < building.name.length; index++) {
        tippy('#'+building.id[index],{
            content: building.name[index] +" $"+building.cost[index] ,    
        }); 
    }
    for(let index = 0; index < upgrade.name.length; index++){
        tippy('#'+upgrade.id[index],{
            
            content: upgrade.name[index] + ' $'+upgrade.cost[index]+'\r\n'+upgrade.effect[index] +'\r\n' + upgrade.description[index],
            theme: 'tomato',
        });
    }
    for(let index = 0; index < upgrade.name.length; index++){
        tippy('#'+achievement.id[index],{
            content: achievement.name[index] + '\r\n' + achievement.description[index]
        });
    }
    tippy('#tippySec',{
        content: '<strong id="strongTip" >NO?</strong>',
        interactive: 'true',
        placement: 'right',
        allowHTML: true
    });
    tippy('#strongTip',{
        content: '<p id="strangeTip" >MAYBE?</p>',
        allowHTML: true,
        placement: 'bottom',
        interactive: 'true'
    })
    tippy('#strangeTip',{
        content: '<p id="ridiculousTip" >Okay fine...</p>',
        allowHTML: true,
        placement: 'bottom',
        interactive: 'true'
    })
    tippy('#ridiculousTip',{
        content: '<button onclick="secretTipEnding();">Don\'t Click Me</button>',
        placement: 'right',
        allowHTML: true,
        interactive: 'true'
    })
}

function secretTipEnding(){
    // 0 index is the tooltip secret
    if(!secret.activated[0]){
        secret.activate(0);
        achievement.earn(2);
        Game.gold += 10000;
    }
}

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
        upgradePurchased: upgrade.purchased,
<<<<<<< HEAD
        achievementAwarded: achievement.awarded,
        secretsFound: secret.activated,
        timeOfQuit: new Date()
=======
        achievementAwarded: achievement.awarded
>>>>>>> parent of 577a429 (Trying to figure out offline progress)
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
        if(typeof savedGame.achievementAwarded !== "undefined"){
            for (let index = 0; index < savedGame.achievementAwarded.length; index++) {
                achievement.awarded[index] = savedGame.achievementAwarded[index];
                
            }
        }
<<<<<<< HEAD
        if(typeof savedGame.secretsFound !== "undefined"){
            for (let index = 0; index < savedGame.secretsFound.length; index++) {
                secret.activated[index] = savedGame.secretsFound[index];
                
            }
        }
        if(typeof savedGame.timeOfQuit !== "undefined"){
            var currentTime = new Date();
            var currentTimeInSeconds = currentTime.getTime() / 1000;
            var quitTime = new Date(savedGame.timeOfQuit);
            var quitTimeInSeconds = quitTime.getTime() / 1000
            var secondsSinceOnline = currentTimeInSeconds - quitTimeInSeconds; 
            console.log("Gone for "+ secondsSinceOnline+ " seconds");
            Game.currentTimeUpdate(secondsSinceOnline);
        }
=======
>>>>>>> parent of 577a429 (Trying to figure out offline progress)
    }
}

setInterval(function() {
    saveGame();
},30000);

setInterval(function() {
    for (let index = 0; index < achievement.name.length; index++) {
        if(achievement.type[index] == "goldEarned" && Game.totalGold >= achievement.requirement[index]){
            achievement.earn(index);
        }
        else if(achievement.type[index] == "click" && Game.totalClicks >= achievement.requirement[index]){

            achievement.earn(index);
        }
        else if(achievement.type[index] == "building" && building.count[achievement.objectIndex[index]] >= achievement.requirement[index]){
            achievement.earn(index);
        }
    }
    display.updateScore();
    display.updateUpgrades();
    display.updateAchievements();
    
},5000);

document.getElementById("clicker").addEventListener("click", function(){
    Game.totalClicks++;
    Game.addToGold(Game.clickValue);
}, false);

window.onload = function(){
    loadGame();
    display.updateScore();
    display.updateUpgrades();
    display.updateAchievements();
    display.updateShop();
    createTooltips();
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