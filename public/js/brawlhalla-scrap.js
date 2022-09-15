// DATA SOURCES
let playerID = 5466734;
const apiUrl = `https://brawlhallastats.herokuapp.com/api/submit-form3-by-id?player=${playerID}`;
const playerData = "./public/js/player.json";
// const legendLocation = document.getElementById(`${data.legends.legend_name_key}`);
let legendsData = [];
// fetching the playerdata from player.json
fetch(playerData).then(response => {
    return response.json();
}).then(data => {
    let legendsData = data.legends;
    for (let i = 0; i < legendsData.length; i++) {
        let legends = legendsData[i];
        let legendNameData = legends.legend_name_key;
        let legendName = legendNameData.replace(/\s+/g, '');
        let legendLevel = legends.level;
        let legendLocation = document.getElementById(`${legendName}`);
        console.log(legendName + ": " + legendLevel);
        if (legendLevel >= 25) {
            legendLocation.innerHTML = `
                <img src="./public/img/legends/Portrait_${legendName}.webp" alt="${legendName} frame">
                <div class="container-character__checkmark">
                    <i class="fa-solid fa-circle-check"></i>
                </div>
                <div class="container-character__level">
                    <h2 style="color: rgb(125, 255, 125)">${legendLevel}</h2>
                </div>
                `;
            } else {
                legendLocation.innerHTML = `
                    <img src="./public/img/legends/Portrait_${legendName}.webp" alt="${legendName} frame">
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
).catch(error => {
    console.log(error);
});