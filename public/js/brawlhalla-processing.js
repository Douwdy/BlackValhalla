// get brawlhalla patch id from the api via https://api.brawlhalla.fr/angularwebapp2/getPatch
async function getPatchID() {
    let patchApiData = "https://api.brawlhalla.fr/angularwebapp2/getPatch";
    // get brawlhalla patch id from the api
    let response = await fetch(patchApiData);
    let data = await response.json();
    // find the patch id in the json file with current value = true
    let patch = data.find(patch => patch.current === true);
    // get the patch id from the json file
    return patch.id;
};

function clearAndLoadData() {
    // Clear all existing data from the page
    document.getElementById("progress").innerHTML = `
        <div class="top-data-progress__bar" id="progress-bar">
        <div class="top-data-progress__bar__silver" id="silver">
            <i class="fas fa-circle-dot" style="color: #424242"></i>
        </div>
        <div class="top-data-progress__bar__between" style="background-color: #424242;"></div>
        <div class="top-data-progress__bar__gold" id="gold">
            <i class="fas fa-circle-dot" style="color: #424242"></i>
        </div>
        <div class="top-data-progress__bar__between" style="background-color: #424242;"></div>
        <div class="top-data-progress__bar__platinum" id="platinum">
            <i class="fas fa-circle-dot" style="color: #424242"></i>
        </div>
        <div class="top-data-progress__bar__between" style="background-color: #424242;"></div>
        <div class="top-data-progress__bar__diamond" id="diamond">
            <i class="fas fa-circle-dot" style="color: #424242"></i>
        </div>
    </div>
    <div class="top-data-progress-rank">
        <h2 class="top-data-progress-rank__title" style="color: #424242">UnRanked</h2>
    </div>
    `;

    document.getElementById("top-characters").innerHTML = `
        <div class="top-character" id="top-2">
            <img class="top-character__icon" src="./public/img/legends/Portrait_default.webp" alt="default frame">
            <div class="top-character__level">
                <h2 style="color: #A8A9AD">??</h2>
            </div>
        </div>
        <div class="top-character" id="top-1">
            <i class="fa-solid fa-crown top-character_1"></i>
            <img class="top-character__icon" src="./public/img/legends/Portrait_default.webp" alt="default frame">
            <div class="top-character__level">
                <h2 style="color: #FFD700">??</h2>
            </div>
        </div>
        <div class="top-character" id="top-3">
            <img class="top-character__icon" src="./public/img/legends/Portrait_default.webp" alt="default frame">
            <div class="top-character__level">
                <h2 style="color: #CD7F32">??</h2>
            </div>
        </div>
            `;
    // fetch legend names from the legends.json file
    fetch("./public/js/legends.json").then(response => {
        return response.json();
    }).then(data => {
        // get the legend names from the json file
        let legendData = data;
        // for loop to parse through the legend names
        for (let i = 0; i < legendData.length; i++) {
            let legends = legendData[i];
            let legendName = legends;
        document.getElementById(`${legendName}`).innerHTML = `
            <img class="container-character__icon" src="./public/img/legends/Portrait_default.webp" alt="default frame">
            <div class="container-character__checkmark-none">
            <i class="fa-sharp fa-solid fa-circle-xmark"></i>
            </div>
            <div class="container-character__level">
                <h2 style="color: crimson">??</h2>
            </div>
            `;
    }});
    // Call the getBrawlhallaID function to load new data
    getBrawlhallaID();
}

// Get brawlhalla id from input field brawlhallaID and update the playerID variable for the json call
async function getBrawlhallaID() {
    let patchID = await getPatchID();
    // get the brawlhalla id from the input field
    playerID = document.getElementById("brawlhallaID").value;
    // update the playerData url with the new playerID
    legendApiData = `https://api.brawlhalla.fr/angularwebapp2/playerLegends?name=${playerID}&patch=${patchID}`;
    rankedApiData = `https://api.brawlhalla.fr/angularwebapp2/playerMain?name=${playerID}&patch=${patchID}`;
    // write the new data to the page
    getPlayerName(patchID);
    getPlayerData(legendApiData);
    getHighestLevel(legendApiData);
    getWinsLossesRatio(rankedApiData);
    getRank(rankedApiData);
    getPlayerElo(rankedApiData);
};

// display the rank of the player 🏆
function getRank(rankedApiData) {
    fetch(rankedApiData).then(response => {
        return response.json();
    }).then(data => {
        let rank = data.tier;
        // remove spaces and numbers from the rank
        rank = rank.replace(/\s+/g, '');
        rank = rank.replace(/[0-9]/g, '');
        if (rank == "Diamond") {
            rank = "diamond";
            let rankLocation = document.getElementById("progress");
            rankLocation.innerHTML = `
            <div class="top-data-progress__bar" id="progress-bar">
                <div class="top-data-progress__bar__silver" id="silver">
                    <i class="fas fa-circle-dot" style="color: #d9d9da"></i>
                </div>
                <div class="top-data-progress__bar__between" style="background-color: #d9d9da;"></div>
                <div class="top-data-progress__bar__gold" id="gold">
                    <i class="fas fa-circle-dot" style="color: #fbd05d"></i>
                </div>
                <div class="top-data-progress__bar__between" style="background-color: #fbd05d;"></div>
                <div class="top-data-progress__bar__platinum" id="platinum">
                    <i class="fas fa-circle-dot" style="color: #005dd1"></i>
                </div>
                <div class="top-data-progress__bar__between" style="background-color: #005dd1;"></div>
                <div class="top-data-progress__bar__diamond" id="diamond">
                    <i class="fas fa-circle-dot" style="color: #382195"></i>
                </div>
            </div>
            <div class="top-data-progress-rank">
                <h2 class="top-data-progress-rank__title" style="color: #382195">Diamant</h2>
                <h3 id="elo" class="top-data-progress-rank__elo" style="color: #382195"></h3>
            </div>
            `;
        } else if (rank == "Platinum") {
            rank = "platinum";
            let rankLocation = document.getElementById("progress");
            rankLocation.innerHTML = `
            <div class="top-data-progress" id="progress">
            <div class="top-data-progress__bar" id="progress-bar">
                <div class="top-data-progress__bar__silver" id="silver">
                    <i class="fas fa-circle-dot" style="color: #d9d9da"></i>
                </div>
                <div class="top-data-progress__bar__between" style="background-color: #d9d9da;"></div>
                <div class="top-data-progress__bar__gold" id="gold">
                    <i class="fas fa-circle-dot" style="color: #fbd05d"></i>
                </div>
                <div class="top-data-progress__bar__between" style="background-color: #fbd05d;"></div>
                <div class="top-data-progress__bar__platinum" id="platinum">
                    <i class="fas fa-circle-dot" style="color: #005dd1"></i>
                </div>
                <div class="top-data-progress__bar__between" style="background-color: #424242;"></div>
                <div class="top-data-progress__bar__diamond" id="diamond">
                    <i class="fas fa-circle-dot" style="color: #424242"></i>
                </div>
            </div>
            <div class="top-data-progress-rank">
                <h2 class="top-data-progress-rank__title" style="color: #005dd1">Platine</h2>
                <h3 id="elo" class="top-data-progress-rank__title" style="color: #005dd1"></h3>
            </div>
            `;
        } else if (rank == "Gold") {
            rank = "gold";
            let rankLocation = document.getElementById("progress");
            rankLocation.innerHTML = `
            <div class="top-data-progress" id="progress">
            <div class="top-data-progress__bar" id="progress-bar">
                <div class="top-data-progress__bar__silver" id="silver">
                    <i class="fas fa-circle-dot" style="color: #d9d9da"></i>
                </div>
                <div class="top-data-progress__bar__between" style="background-color: #d9d9da;"></div>
                <div class="top-data-progress__bar__gold" id="gold">
                    <i class="fas fa-circle-dot" style="color: #fbd05d"></i>
                </div>
                <div class="top-data-progress__bar__between" style="background-color: #424242;"></div>
                <div class="top-data-progress__bar__platinum" id="platinum">
                    <i class="fas fa-circle-dot" style="color: #424242"></i>
                </div>
                <div class="top-data-progress__bar__between" style="background-color: #424242;"></div>
                <div class="top-data-progress__bar__diamond" id="diamond">
                    <i class="fas fa-circle-dot" style="color: #424242"></i>
                </div>
            </div>
            <div class="top-data-progress-rank">
                <h2 class="top-data-progress-rank__title" style="color: #fbd05d;">Or</h2>
                <h3 id="elo" class="top-data-progress-rank__title" style="color: #fbd05d;"></h3>
            </div>
            `;
        } else if (rank == "Silver") {
            rank = "silver";
            let rankLocation = document.getElementById("progress");
            rankLocation.innerHTML = `
            <div class="top-data-progress" id="progress">
            <div class="top-data-progress__bar" id="progress-bar">
                <div class="top-data-progress__bar__silver" id="silver">
                    <i class="fas fa-circle-dot" style="color: #d9d9da"></i>
                </div>
                <div class="top-data-progress__bar__between" style="background-color: #424242;"></div>
                <div class="top-data-progress__bar__gold" id="gold">
                    <i class="fas fa-circle-dot" style="color: #424242"></i>
                </div>
                <div class="top-data-progress__bar__between" style="background-color: #424242;"></div>
                <div class="top-data-progress__bar__platinum" id="platinum">
                    <i class="fas fa-circle-dot" style="color: #424242"></i>
                </div>
                <div class="top-data-progress__bar__between" style="background-color: #424242;"></div>
                <div class="top-data-progress__bar__diamond" id="diamond">
                    <i class="fas fa-circle-dot" style="color: #424242"></i>
                </div>
            </div>
            <div class="top-data-progress-rank">
                <h2 class="top-data-progress-rank__title" style="color: #d9d9da">Argent</h2>
                <h3 id="elo" class="top-data-progress-rank__title" style="color: #d9d9da"></h3>
            </div>
            `;
        }
    })};

// Display top 3 highest level legends 🏆
function getHighestLevel(legendApiData) {
    // get the data from the json file
    fetch(legendApiData)
        .then(response => response.json())
        .then(data => {
            // get the legends array from the json file
            let legends = data;
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
function getPlayerData(legendApiData) {
    fetch(legendApiData).then(response => {
        return response.json();
    }).then(data => {
        // Processing data from player.json ⬇️
        let legendsData = data;
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
                    <i class="fa-sharp fa-solid fa-circle-check"></i>
                    </div>
                    <div class="container-character__level">
                        <h2 style="color: rgb(125, 255, 125)">${legendLevel}</h2>
                    </div>
                    `;
                } else if ( legendLevel < 25){ // If they don't have 25 levels it display it as uncompleted 🔴
                    legendLocation.innerHTML = `
                        <img class="container-character__icon-none" src="./public/img/legends/Portrait_${legendName}.webp" alt="${legendName} frame">
                        <div class="container-character__checkmark-none">
                        <i class="fa-sharp fa-solid fa-circle-xmark"></i>
                        </div>
                        <div class="container-character__level">
                            <h2 style="color: crimson">${legendLevel}</h2>
                        </div>
                        `;
                }
        }
    }
    ).catch(error => { // Basic error catcher🐛
        console.log(error);
    });
};

// Display the player name 🔎
function getPlayerName(patchID) {
    getPatchID();
    let playerName = document.getElementById("brawlhallaID").value;
    let playerNameLocation = document.getElementById("playerName");
    fetch(`https://api.brawlhalla.fr/angularwebapp2/playerMain?name=${playerName}&patch=${patchID}`).then(response => {
        return response.json();
    }).then(data => {
        let playerName = data.name;
        playerNameLocation.innerHTML = `
        <h1 class="top-data__name">${playerName}</h1>
        `;
    });
}

// Display the player ELO 📈
function getPlayerElo(rankedApiData) {
    fetch(rankedApiData).then(response => {
        return response.json();
    }).then(data => {
        let elo = data.rating;
        // convert the elo to a string
        let eloLocation = document.getElementById("elo");
        // display the elo at eloLocation
        eloLocation.innerHTML = `
        Elo: ${elo}
        `;
    });
}

// Check if the brawlhalla id is an alias and if so, replace it with the brawlhalla id 🔄️
function checkAlias() {
    let brawlhallaID = document.getElementById("brawlhallaID").value;
    fetch("./public/js/players.json").then(response => {
        return response.json();
    }).then(data => {
        let players = data;
        let player = players.find(player => player.alias === brawlhallaID);
        // if the player is found in the json file, return the brawlhalla id
        if (player) {
            document.getElementById("brawlhallaID").value = player.id;
            clearAndLoadData();
        } else {
            clearAndLoadData();
        }
    });
}

// display wins and losses ratio 📊
function getWinsLossesRatio(rankedApiData) {
    fetch(rankedApiData).then(response => {
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

// Enter key listener for the brawlhallaID input field to run the clearAndLoadData function
document.getElementById("brawlhallaID").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        checkAlias();
    }
});

clearAndLoadData();