//  Data parameters for fetching data from the server ⚙️
// const { playerID, apiKey } = require('./api_config.json');
const playerID = 5466734;
const apiKey = "EXAMPLE_API_KEY";
// Variables 📈
let legendsData = [];
// Data sources 📄
const apiUrl = `https://api.brawlhalla.com/player/${playerID}/stats?api_key=${apiKey}`;
const playerData = "./public/js/player.json";

// Fetching the playerdata from player.json 🛠️
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
            } else { // If they don't have 25 levels it display it as uncompleted 🔴
                legendLocation.innerHTML = `
                    <img class="container-character__icon-none" src="./public/img/legends/Portrait_${legendName}.webp" alt="${legendName} frame">
                    <div class="container-character__checkmark-none">
                        <i class="fa-solid fa-circle-xmark"></i>
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