//  Data parameters for fetching data from the server ⚙️
// const { playerID, apiKey } = require('./api_config.json');
let playerID = "default";
const apiKey = "EXAMPLE_API_KEY";
// Data sources 📄
const apiUrl = `https://api.brawlhalla.com/player/${playerID}/stats?api_key=${apiKey}`;
let playerData = `./public/js/players/${playerID}.json`;

// get brawlhalla id from input field brawlhallaID and update the playerID variable for the json call
function getBrawlhallaID() {
    // get the brawlhalla id from the input field
    playerID = document.getElementById("brawlhallaID").value;
    // update the playerData url with the new playerID
    playerData = `./public/js/players/${playerID}.json`;
    // call the getPlayerData function to update the page with the new playerID
    getPlayerData(playerData);
    getHighestLevel(playerData);
    getWinsLossesRatio(playerData);
};

// Display top 3 highest level legends 🏆
function getHighestLevel() {
    // get the data from the json file
    fetch(playerData)
        .then(response => response.json())
        .then(data => {
            // get the legends array from the json file
            let legends = data["legends"];
            // sort the legends array by level
            legends.sort((a, b) => (a.level < b.level) ? 1 : -1);
            // get the top 3 highest level legends
            let top3 = legends.slice(0, 3);
            // get the legend names of the top 3 highest level legends
            let legendNamesData = top3.map(legend => legend.legend_name_key);
            // replace spaces in legends name with nothing
            let legendNames = legendNamesData.map(legend => legend.replace(/\s+/g, ''));
            // get the legend levels
            let legendLevels = top3.map(legend => legend.level);
            // Display the top 3 highest level legends
            displayHighestLocation = document.getElementById("top-characters");

            displayHighestLocation.innerHTML = `
            <div class="top-character" id="top-2">
                <img class="top-character__icon" src="./public/img/legends/Portrait_${legendNames[1]}.webp" alt="${legendNames[1]} frame">
                <div class="top-character__level">
                    <h2 style="color: #A8A9AD">${legendLevels[1]}</h2>
                </div>
            </div>
            <div class="top-character" id="top-1">
                <i class="fa-solid fa-crown top-character_1"></i>
                <img class="top-character__icon" src="./public/img/legends/Portrait_${legendNames[0]}.webp" alt="${legendNames[0]} frame">
                <div class="top-character__level">
                    <h2 style="color: #FFD700">${legendLevels[0]}</h2>
                </div>
            </div>
            <div class="top-character" id="top-3">
                <img class="top-character__icon" src="./public/img/legends/Portrait_${legendNames[2]}.webp" alt="${legendNames[2]} frame">
                <div class="top-character__level">
                    <h2 style="color: #CD7F32">${legendLevels[2]}</h2>
                </div>
            </div>
            `;
        })
    }

// Fetching the playerdata from player.json 🛠️
function getPlayerData(playerData) {
    fetch(playerData).then(response => {
        return response.json();
    }).then(data => {
        // Processing data from player.json ⬇️
        let legendsData = data.legends;
        // For loop through all the legends from player.json 🔃
        for (let i = 0; i < legendsData.length; i++) {
            let legends = legendsData[i];
            let legendNameData = legends.legend_name_key;
            let legendName = legendNameData.replace(/\s+/g, '');
            let legendLevel = legends.level;
            let legendLocation = document.getElementById(`${legendName}`);

            // if function displaying legends if they got 25 levels 🏆
            if (legendLevel >= 25) { // If they have 25 levels it display it as completed ✅
                legendLocation.innerHTML = `
                    <img class="container-character__icon" src="./public/img/legends/Portrait_${legendName}.webp" alt="${legendName} frame">
                    <div class="container-character__checkmark">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <div class="container-character__level">
                        <h2 style="color: rgb(125, 255, 125)">${legendLevel}</h2>
                    </div>
                    `;
                } else if ( legendLevel < 25){ // If they don't have 25 levels it display it as uncompleted 🔴
                    legendLocation.innerHTML = `
                        <img class="container-character__icon-none" src="./public/img/legends/Portrait_${legendName}.webp" alt="${legendName} frame">
                        <div class="container-character__checkmark-none">
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                        <div class="container-character__level">
                            <h2 style="color: crimson">${legendLevel}</h2>
                        </div>
                        `;
                };
        }
    }
    ).catch(error => { // Basic error catcher🐛
        console.log(error);
    });
};

// display wins and losses ratio 📊
function getWinsLossesRatio() {
    fetch(playerData).then(response => {
        return response.json();
    }).then(data => {
        let wins = data.wins;
        let losses = data.games - data.wins;
        let ratioLocation = document.getElementById("ratio");
        ratioLocation.innerHTML = `
        <h2 style="color: green;">${wins} W</h2>
        <h2 style="color: black;">/</h2>
        <h2 style="color: crimson;">${losses} L</h2>
        `;
    })};

// display the default playerID data on page load
getBrawlhallaID();