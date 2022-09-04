/**
 * 
 * Author: Kory Stennett
 * 
 * Notes: I think that I need to remove the Upgrade sidebar
 */
/**const tableDataButton = document.querySelectorAll('td');
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

}   */

const buildingTooltips = [];
const upgradeTooltips = [];
const achievementTooltips = [];

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var statsbtn = document.getElementById("stats");

// Get the button that opens Prestige modal
var prestigebtn = document.getElementById("prestige");

// Button that opens Upgrade modal
var upgradeBtn = document.getElementById("upgradeBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the content of the modal so I can inject HTML into it with data from our JS objects
const modContent = document.querySelector('.modal-content');

function createStatsPage(){
    modContent.innerHTML = '<span class="close"></span><p><strong>Total Gold Earned: $'+commafyNumber(Game.totalGold)+'<p><strong>Gold Earned This Run: $'+commafyNumber(Game.goldEarnedThisRun)+' <p><strong>Total Buildings: </strong>'+Game.totalBuildingsBuilt+'</p><p><strong>Buildings Bought This Run: </strong>'+ commafyNumber(building.getTotalBuildings())+ '</p><p><strong>Total Clicks: <strong>'+commafyNumber(Game.totalClicks);
    modContent.innerHTML += '<p><strong>Clicks This Run: '+commafyNumber(Game.clicksThisRun)+'<p><strong>';
    // Keep adding stats line by line because the long lines of HTML are hard to read/manipulate
    
}

function changeModalToPrestigeScreen(){
    modContent.innerHTML = '<span class="close"><button onclick="prestige.prestige()">Prestige Now?</button></span>'
}

function changeModalToUpgradeScreen(){
    
    modContent.innerHTML = '<span class="close">';
    for(i=0; i< upgrade.name.length; i++){
        
        // Create a section for already purchased upgrades to be reviewed
        if(upgrade.purchased[i]){
            
            modContent.innerHTML += '<table class="unselectable upgradeContainer"><tr><td class="upgradeContainer" id="'+upgrade.id[i]+'"><img style="padding: 5px; object-fit: center; opacity: 0.3;" src="./Resources/Images/'+upgrade.image[i]+'"</td><td style="opacity:0.3;"><h3>'+upgrade.name[i]+'</h3><h5>'+upgrade.effect[i]+'</h5><h5 class="emphasized">'+upgrade.description[i]+'</h5></td></tr></table>';
        }
        else {
            upgrade.spawned[i] = true;
            if(upgrade.type[i] == "building" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]){
                modContent.innerHTML += '<table class="unselectable upgradeContainer"><tr><td  id="'+upgrade.id[i]+'"><img onclick="upgrade.purchase('+i+')" style="padding: 5px; object-fit: center; " src="./Resources/Images/'+upgrade.image[i]+'"</td><td ><h3>'+upgrade.name[i]+'</h3><h5>'+upgrade.effect[i]+'</h5><h5 class="emphasized">'+upgrade.description[i]+'</h5></td></tr></table>';
            }
            else if (upgrade.type[i] == "click" && Game.clicksThisRun >= upgrade.requirement[i]){
                modContent.innerHTML += '<table class="unselectable upgradeContainer"><tr><td onclick="upgrade.purchase('+i+')" id="'+upgrade.id[i]+'"><img onclick="upgrade.purchase('+i+')"style="float: left; padding: 5px; object-fit: center; " src="./Resources/Images/'+upgrade.image[i]+'"</td><td ><h3>'+upgrade.name[i]+'</h3><h5>'+upgrade.effect[i]+'</h5><h5 class="emphasized">'+upgrade.description[i]+'</h5></td></tr></table>';
            }
            
        }
        
    }
    modContent.innerHTML += '</span>';
}

// When the user clicks on the button, open the modal
statsbtn.onclick = function() {
    createStatsPage();
    modal.style.display = "block";
}

// Open prestige shop using same modal
prestigebtn.onclick = function(){
    changeModalToPrestigeScreen();
    modal.style.display ="block";
}

// Open upgrade screen with same modal
upgradeBtn.onclick = function(){
    changeModalToUpgradeScreen();
    modal.style.display ="block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function commafyNumber(number){
    return number.toLocaleString('en-US');
}

var Game = {
    gold: 0,
    totalGold: 0,
    goldEarnedThisRun: 0,
    totalClicks: 0,
    clicksThisRun: 0,
    clickValue: 1,
    version: 0.001,
    secondsPlayedThisRun: 0,
    totalSecondsPlayed: 0,
    totalBuildingsBuilt: 0,
    multiplierClickFromIncome: 0,
    globalIncomeBonus: 1,


    addToGold: function(amount){
        amount = amount * this.globalIncomeBonus;
        this.gold += amount;
        this.totalGold += amount;
        this.goldEarnedThisRun += amount;
        display.updateScore();
    },

    getClickValue: function(){
        let value = this.clickValue * (1+(this.getScorePerSecond() * this.multiplierClickFromIncome));
        
        return Math.ceil(value);

    },

    getScorePerSecond: function(){
        var scorePerSecond = 0;
        for(i = 0; i < building.name.length; i++){
            scorePerSecond += building.income[i] * building.count[i];
        }
        this.totalSecondsPlayed++;
        this.secondsPlayedThisRun++;
        return scorePerSecond;
    },

    currentTimeUpdate: function(seconds){
        this.addToGold(Math.ceil(seconds * this.getScorePerSecond()));
    },

    // When we prestige
    resetGame: function(){
        this.gold = 0;
        this.clickValue = 1;
        this.secondsPlayedThisRun = 0;
        this.goldEarnedThisRun = 0;
        this.clicksThisRun = 0;
    }

};

var building = {
    
    name:[
        "Old Couch:",
        "Cracked TV:",
        "3-Legged Coffee Table:",
        "A Dimmer Switch",
        "Hand-Me-Down Console",
        "Soon-To-Be-Dead Remote",
        "Hat Cheetahs and Mountain Spew"
    ],
    image:[
        "oldcouch.png",
        "crackedtv.PNG",
        "coffeetable.PNG",
        "dimmerswitch.PNG",
        "handmedownconsole.PNG",
        "remote.PNG",
        "food.PNG"
    ],
    count:[
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ],
    // Same as income, used to initialize during prestige
    baseIncome:[
        1,
        10,
        100,
        400,
        2000,
        5000,
        10000
    ],
    income:[
        1,
        10,
        100,
        400,
        2000,
        5000,
        10000
    ],
    // Same as cost, used to initialize cost during prestige
    baseCost:[
        20,
        100,
        10000,
        50000,
        500000,
        10000000,
        50000000
    ],
    cost:[
        20,
        100,
        10000,
        50000,
        500000,
        10000000,
        50000000
    ],
    description:[
        "Wow! You paid for something that should be free!",
        "Changing the definition of split-screen gaming.",
        "The fourth leg was too expensive.",
        "It's pretty neat! It's just a shame that it doesn't work though.",
        "Huh, I didn't think there was such a thing...",
        "Just twist the batteries around and smack it, then it magically works again!",
        "This is the snack that won't stop fighting back, at your internal organs."

    ],
    id:[
        'oldcouch',
        'crackedtv',
        'coffeetable',
        'dimmerswitch',
        'console',
        'remote',
        'snack'
    ],
    // in order to track the second table data, I am making a second ID for it
    dataID:[
        'oldcouchData',
        'crackedtvData',
        'coffeetableData',
        'dimmerswitchData',
        'consoleData',
        'remoteData',
        'snackData'
    ],
    purchase: function(index){
        if(Game.gold >= this.cost[index]){
            Game.gold -= this.cost[index];
            this.count[index]++;
            this.cost[index] = Math.round(this.cost[index] * 1.145);
            display.updateScore();
            display.updateShop();
            //display.updateUpgrades();
            Game.totalBuildingsBuilt++;
            refreshBuildingTooltips();
            handleAchievementTooltips();
            //handleUpgradeTooltips();
        }
    },

    getTotalBuildings: function(){
        let sum = 0;
        for (let index = 0; index < this.count.length; index++) {
            sum += this.count[index];
            
        }
        return sum;
    },

    resetBuildings: function(){
        for (let index = 0; index < building.baseCost.length; index++) {
            building.cost[index] = building.baseCost[index];
            building.income[index] = building.baseIncome[index];
            building.count[index] = 0;
        }
    }
};

// Create a section for upgrades with odd attributes, since current upgrades can only handle straight multipliers

var upgrade ={
    name:[
        "Loose Change:",
        "Red Fingers:",
        "Potato:",
        "Sticky Fingers:",
        "Stink Eye:",
        // Couch section
        "Pillow Hands",
        "Couch Groove",
        "Couch Awareness Month",
        // TV Section
        "White Noise Machine",
        "Antennae",
        "\"New\" Broken TV",
        //Click Section
        "Remote Clicker"
    ],
    id:[
        'loosechange',
        'redfingers',
        'potato',
        'stickyfingers',
        'stinkeye',
        // Couch Section
        'pillowhands',
        'groove',
        'couchmonth',
        // TV Section
        'whitenoise',
        'antennae',
        'newtv',
        // Click Section
        'remoteclicker'

    ],
    effect: [
        "2x Boost to Couch Income",
        "5x Boost to Click Power",
        "3x Boost to Couch Income",
        "10x Boost to Click Power",
        "5x Boost to TV Income",
        "10x Boost to Click Power",
        "50x Boost to Couch Income",
        "25x Boost to Couch Income",
        "2x Boost to TV Income",
        "8x Boost to TV Income",
        "10x Boost to TV Income",
        "7x Boost to Click Power"
    ],
    description: [
        "Couches are a great form of passive income.",
        "The power in the red-stained finger is brought to you by Hot Cheetos.",
        "What's a couch without a potato?",
        "I'm not even going to ask what made them sticky.",
        "You're getting the stink eye from your loved ones for not fixing the TV situation...",
        "You've sat on the couch so long your hands have become pillows, making clicking all the easier?!",
        "Your butt has made its mark on that beautiful old couch.",
        "This poor couch has seen some atrocities in its time. The world decides to create a month, right in-between Janurary and February, dedicated to all couches!",
        "Your broken TV has at least one purpose as a solid white noise machine, listen to that sweet static!",
        "You've boosted your signal by about 1% and can sometimes almost make out shapes on the screen.",
        "Someone has gifted you a slightly less broken TV, this is so exciting!",
        "You're clicking a remote in order to avoid the hassle of cliking a button? That laziness is truly inspired!"
    ],
    image:[
        "loosechange.PNG",
        "redfinger.PNG",
        "potato.PNG",
        "stickyfingers.png",
        "stinkeye.png",
        // Couch section
        "pillowhands.PNG",
        "groove.PNG",
        "awarenessmonth.PNG",
        // TV Section
        "whitenoise.PNG",
        "antennae.PNG",
        "newtv.PNG",
        // Click Section
        "remoteclicker.PNG"
    ],
    type:[
        "building",
        "click",
        "building",
        "click",
        "building",
        "building",
        //Couch section
        "building",
        "building",
        
        // TV Section
        "building",
        "building",
        "building",
        // Click Section
        "click"
    ],
    // used to initialize for Prestige
    baseCost:[
        300,
        500,
        10000,
        10000,
        200000,
        // Couch Section
        100000,
        10000000,
        500000000,
        // TV Section
        75000,
        500000,
        35000000,
        // Click Section
        100000
    ],
    cost:[
        300,
        500,
        10000,
        10000,
        200000,
        // Couch Section
        100000,
        10000000,
        500000000,
        // TV Section
        75000,
        500000,
        35000000,
        // Click Section
        100000
    ],
    //Which building index does this upgrade affect, -1 for clicks
    buildingIndex: [
        0,
        -1,
        0,
        -1,
        1,
        0,
        0,
        0,
        1,
        1,
        1,
        -1
    ],
    requirement: [
        10,
        25,
        25,
        1000,
        50,
        50,
        100,
        200,
        10,
        25,
        100, 
        500
    ],
    bonus: [
        2,
        5,
        3,
        10,
        5,
        10,
        50,
        25,
        2,
        8,
        10,
        7
    ],
    purchased: [
        false,false,false,false,false,false,false,false,false,false,false,false
    ],
    spawned:[
        false,false,false,false,false,false,false,false,false,false,false,false
    ],
    
    purchase: function(index){
        
        if(!this.purchased[index] && Game.gold >= this.cost[index]){
            
            if(this.type[index] == "building" && building.count[this.buildingIndex[index]] >= this.requirement[index]){
                Game.gold -= this.cost[index];
                building.income[this.buildingIndex[index]] *= this.bonus[index];
                this.purchased[index] = true;
                
                
            }
            else if(this.type[index] == "click" && Game.clicksThisRun >= this.requirement[index]){
                Game.gold -= this.cost[index];
                Game.clickValue *= this.bonus[index];
                this.purchased[index] = true;
                
                
            }
            display.updateScore();
            changeModalToUpgradeScreen();
        }
        
    },

    resetUpgrades: function(){
        for (let index = 0; index < upgrade.baseCost.length; index++) {
            upgrade.cost[index] = upgrade.baseCost[index];
            this.purchased[index] = false;
            this.spawned[index] = false;
        }
    }
};

var achievement = {
    name: [
        "Not So Idle, Guy",
        "Get More Couches",
        // Secrets shhhhh
        "Secret Tip",
        "Visited Tour",
        "What Up Homie?"
    ],
    id:[
        "click100",
        "couch25",
        // S
        "secrettip",
        "visitedtour",
        "checkedCode"
    ],
    description: [
        "Click 100 times!",
        "I don't see why you don't just get even more of them. Receive a flat +10 bonus gold income from couches.",
        "Good job finding me! The first time you click this button, receive 10000 in cold hard cash! And a 1% bonus to global income.",
        "Thanks for visiting the tour! It means a lot to me that people are willing to check out my work! Add a 1% bonus to global income.",
        "What did you think of that older project? Kind of messy looking back...Add a 1% bonus to global income."
        
    ],
    image:[
        "click100.PNG",
        "couch25.PNG",
        "secrettip.png",
        "tourchamp.PNG",
        "checkedCode.PNG"
    ],
    // what type of building, click, goldEarned, etc needs to be earned.
    type:[
        "click",
        "building",
        "secret",
        "secret",
        "secret"
    ],
    requirement:[
        100,
        25,
        1,
        1,
        1
    ],

    // what type of building, click etc. that needs to be rewarded
    bonusType:[
        "clickPercentFromIncome",
        "buildingFlatRate",
        "globalIncomePercentBonus",
        "globalIncomePercentBonus",
        "globalIncomePercentBonus"
    ],
    bonusAmount:[
        .02,
        10,
        .01,
        .01,
        .01
    ],
    // -1 if it's not a building, otherwise go with the building index we are referring to
    objectIndex:[
        -1,
        0,
        -1,
        -1,
        -1
    ],
    awarded:[
        false,
        false,
        false,
        false,
        false
    ],

    prestigeAchievements: function(){
        for (let index = 0; index < this.name.length; index++) {
            if(this.awarded[index] == true){
                this.earn(index);
            }
            
        }
    },
    
    earn: function(index){
        
        
        if(this.bonusType[index] == "clickPercentFromIncome"){
            Game.multiplierClickFromIncome += this.bonusAmount[index];
        }
        else if(this.bonusType[index] == "buildingFlatRate"){
            building.income[this.objectIndex[index]] += this.bonusAmount[index];
            display.updateShop();
        }
        else if(this.bonusType[index] == "globalIncomePercentBonus"){
            Game.globalIncomeBonus += this.bonusAmount[index];
        }
        this.awarded[index] = true;
        
        
    }
};

var secret = {
    name:[
        "Secret Tip:",
        "World Tour Champ:",
        "What Up Homie?"
    ],
    activated:[
        false,
        false,
        false
    ],
    achievementIndex:[
        2,
        3,
        4
    ],

    activate: function(index){
        this.activated[index] = true;
        achievement.earn(this.achievementIndex[index]);
    }
};

var prestige = {
    // the currency we're using
    idlePoints: 0,
    // number of times we have restarted
    timesPrestiged: 0,

    // multiplier to prestige currency gain, high number = better prestige gains
    prestigeMult: .0000001,

    // set whether we have prestiged or not for the first time
    prestiged: false,

    prestige: function(){
        let idleCoins = document.getElementById('idleCoins');
        this.prestiged = true;
        this.timesPrestiged++;
        this.idlePoints = Math.floor(Game.goldEarnedThisRun * this.prestigeMult);
        idleCoins.innerHTML = "Idle Coins: "+this.idlePoints;
        Game.resetGame();
        building.resetBuildings();
        upgrade.resetUpgrades();
        display.updateShop();
        achievement.prestigeAchievements();
        saveGame();
    }
};



var prestigeUpgrades = {
    name:[

    ],
    description:[

    ],
    effect:[

    ],
    cost:[

    ],
    purchased:[

    ],
    activate: function(index){
        this.activated[index] = true;
    }
};

var display = {
    
    
    updateScore: function() {
        let commaSeparatedNumber = Game.gold.toLocaleString('en-US');
        document.getElementById("gold").innerHTML = "Gold: $" +commaSeparatedNumber;
        let goldPerSecond = Game.getScorePerSecond();
        commaSeparatedNumber = goldPerSecond.toLocaleString('en-US');
        document.getElementById("goldPerSecond").innerHTML = "Gold per second: " +commaSeparatedNumber;
        document.getElementById("clickPower").innerHTML = "Gold per click: " +Game.getClickValue();
        
    },
    createShop:function(){
        
        const shopContainer = document.getElementById('#shopContainer');
        shopContainer.innerHTML = '';
        for(i=0; i < building.name.length; i++){
            let individualBuildingIncome = building.income[i] * building.count[i];
            shopContainer.innerHTML += '<td id="'+building.id[i]+'" style="background-image: url(./Resources/Images/'+building.image[i]+'); background-size: cover; width: 180px; background-repeat: no-repeat;"></td><td id="'+building.dataID[i]+'" onclick="building.purchase('+i+')"><p>'+building.name[i]+'</p><p>$'+commafyNumber(building.cost[i])+'</p><p><strong>Owned: </strong>'+building.count[i]+'</p><h3>'+building.description[i]+'</h3><p><strong>Income: </strong>$'+individualBuildingIncome+'/sec</p></td></span>';
            
            
        
        }
           
    },
    updateShop: function() {
        
        for(i=0; i < building.name.length; i++){
            let element = document.getElementById(building.dataID[i]);
            let individualBuildingIncome = building.income[i] * building.count[i];
            element.innerHTML ='';
            element.innerHTML += '<td onclick="building.purchase('+i+')"><p>'+building.name[i]+'</p><p>$'+commafyNumber(building.cost[i])+'</p><p><strong>Owned: </strong>'+building.count[i]+'</p><h3>'+building.description[i]+'</h3><p><strong>Income: </strong>$'+individualBuildingIncome+'/sec</p></td></span>'
            
                    }
        // When shop items get purchased, the content of the tooltip
        // has changed and must be created again
        //refreshTooltips();
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
        
    }
};

function handleUpgradeTooltips(){
    destroyUpgradeTooltips();
    createUpgradeTooltips();
    refreshUpgradeTooltips();
}



function createUpgradeTooltips(){
    
    for(let index = 0; index < upgrade.name.length; index++){
        
        
        let toolTip =tippy('#'+upgrade.id[index],{
            
            content: upgrade.name[index] + ' $'+upgrade.cost[index]+'</br>'+upgrade.effect[index] +'\r\n' + upgrade.description[index],
            allowHTML: true,
            
        });
        
        upgradeTooltips[index] = toolTip;
    }
}

function createTooltips(){
    
    for (let index = 0; index < building.name.length; index++) {
        let toolTip = tippy('#'+building.id[index],{
            content: building.name[index] +" $"+building.cost[index],
               
        }); 
        
        buildingTooltips[index] = toolTip;
    }
    createUpgradeTooltips();
    createAchievementTooltips();
    
}

function refreshBuildingTooltips(){
    for (let index = 0; index < buildingTooltips.length; index++) {
        
        //let toolTip = buildingTooltips[index][0];
        //toolTip.setContent('Hello');
        buildingTooltips[index][0].setContent(building.name[index] + " $" + building.cost[index]);
    }
}

function destroyUpgradeTooltips(){
    for(let index = 0; index < upgradeTooltips.length; index++){ 
        if(typeof(upgradeTooltips[index][0]) !== "undefined"){
            upgradeTooltips[index][0].destroy();
        }
    }
}

function refreshUpgradeTooltips(){
    for(let index = 0; index < upgradeTooltips.length; index++){
        
        if(typeof(upgradeTooltips[index][0]) !== "undefined"){
            
            
            
            
            upgradeTooltips[index][0].setContent(upgrade.name[index] + ' $'+upgrade.cost[index]+'</br>'+upgrade.effect[index] +'</br>' + upgrade.description[index]);
            upgradeTooltips[index][0].setProps({
                placement: 'top',
                
            });
        }
        //upgradeTooltips[index][0].destroy();
    }
}

function handleAchievementTooltips(){
    destroyAchievementTooltips();
    createAchievementTooltips();
    refreshAchievementTooltips();
}

function createAchievementTooltips(){
    for(let index = 0; index < achievement.name.length; index++){
        let toolTip = tippy('#'+achievement.id[index],{
            appendTo: document.body,
            
            content: achievement.name[index] + '\r\n' + achievement.description[index]
        });
        achievementTooltips[index] = toolTip;
    }
}

function destroyAchievementTooltips(){
    for(let index = 0; index < achievementTooltips.length; index++){ 
        if(typeof(achievementTooltips[index][0]) !== "undefined"){
            achievementTooltips[index][0].destroy();
        }
    }
}

function refreshAchievementTooltips(){
    for (let index = 0; index < achievementTooltips.length; index++) {
        if(typeof(achievementTooltips[index][0]) !== "undefined"){
            
            
            
            
            achievementTooltips[index][0].setContent(achievement.name[index] + '\r\n' + achievement.description[index]);
            achievementTooltips[index][0].setProps({
                placement: 'top',
                
            });
        }
        
    }
}

// Shh it's a secret
function refreshTooltips(){
    tippy('#tippySec',{
        content: '<strong id="strongTip" >NO!</strong>',
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
        Game.addToGold(10000);
        display.updateAchievements();
    }
}

function resetGame(){
    //if(confirm("Are you sure you wish to reset all of your progress?")){
        var gameSave = {};
        localStorage.setItem("gameSave",JSON.stringify(gameSave));
        location.reload();
    //}
}


/**
 * gold: 0,
    totalGold: 0,
    goldEarnedThisRun: 0,
    totalClicks: 0,
    clicksThisRun: 0,
    clickValue: 1,
    version: 0.001,
    secondsPlayedThisRun: 0,
    totalSecondsPlayed: 0,
    totalBuildingsBuilt: 0,
 */
function saveGame(){
    var gameSave = {
        gold: Game.gold,
        totalGold: Game.totalGold,
        goldEarnedThisRun: Game.goldEarnedThisRun,
        totalClicks: Game.totalClicks,
        clicksThisRun: Game.clicksThisRun,
        clickValue: Game.clickValue,
        secondsPlayedThisRun: Game.secondsPlayedThisRun,
        totalSecondsPlayed: Game.totalSecondsPlayed,
        version: Game.version,
        totalBuildingsBuilt: Game.totalBuildingsBuilt,
        buildingCount: building.count,
        buildingIncome: building.income,
        buildingCost: building.cost,
        upgradePurchased: upgrade.purchased,
        achievementAwarded: achievement.awarded,
        secretsFound: secret.activated,
        timeOfQuit: new Date(),
        multiplierClickFromIncome: Game.multiplierClickFromIncome,
        globalIncomeBonus: Game.globalIncomeBonus
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame(){
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if(localStorage.getItem('gameSave') !== null){
        if(typeof savedGame.gold !== "undefined") Game.gold = savedGame.gold;
        if(typeof savedGame.totalGold !== "undefined") Game.totalGold = savedGame.totalGold;
        if(typeof savedGame.goldEarnedThisRun !== "undefined") Game.goldEarnedThisRun = savedGame.goldEarnedThisRun;
        if(typeof savedGame.totalClicks !== "undefined") Game.totalClicks = savedGame.totalClicks;
        if(typeof savedGame.clicksThisRun !== "undefined") Game.clicksThisRun = savedGame.clicksThisRun;
        if(typeof savedGame.clickValue !== "undefined") Game.clickValue = savedGame.clickValue;
        if(typeof savedGame.secondsPlayedThisRun !== "undefined") Game.secondsPlayedThisRun = savedGame.secondsPlayedThisRun;
        if(typeof savedGame.totalSecondsPlayed !== "undefined") Game.totalSecondsPlayed = savedGame.totalSecondsPlayed;
        if(typeof savedGame.totalBuildingsBuilt !== "undefined") Game.totalBuildingsBuilt = savedGame.totalBuildingsBuilt;
        if(typeof savedGame.globalIncomeBonus !== "undefined") Game.globalIncomeBonus = savedGame.globalIncomeBonus;
        if(typeof savedGame.multiplierClickFromIncome !== "undefined") Game.multiplierClickFromIncome = savedGame.multiplierClickFromIncome;
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
    }
    var visitedTour = JSON.parse(localStorage.getItem("visitedTour"));
    if(localStorage.getItem('visitedTour') !== null){
        if(typeof visitedTour.visitedTour !== "undefined"){
            secret.activate(1);
        }
    }
    var checkedCode = JSON.parse(localStorage.getItem("checkedCode"));
    if(localStorage.getItem('checkedCode') !== null){
        if(typeof checkedCode.checkedCode !== "undefined"){
            secret.activate(2);
        }
    }
}

setInterval(function() {
    saveGame();
},30000);

setInterval(function() {
    for (let index = 0; index < achievement.name.length; index++) {
        if(!achievement.awarded[index]){
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
        
    }
    if(!secret.activated[0]){
        refreshTooltips();
    }
    
    //display.updateScore();
    //display.updateUpgrades();
    //display.updateAchievements();
    //refreshAchievementTooltips();
},5000);

document.getElementById("clicker").addEventListener("click", function(){
    Game.totalClicks++;
    Game.clicksThisRun++;
    Game.addToGold(Game.getClickValue());
}, false);

setInterval(function(){
    Game.addToGold(Game.getScorePerSecond());
    display.updateScore();
    
},1000)

window.onload = function(){
    loadGame();
    display.updateScore();
    //display.createUpgrades();
    display.updateAchievements();
    display.createShop();
    
    createTooltips();
    createStatsPage();
    document.title = "Idle Guy";
}
