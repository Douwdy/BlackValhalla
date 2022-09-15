// DATA SOURCES
let playerID = 5466734;
import playerFile from './player.json' assert {type: 'json'};
const apiUrl = `https://brawlhallastats.herokuapp.com/api/submit-form3-by-id?player=${playerID}`
// GET json data from apiUrl and return a JSON object
fetch(apiUrl,
    function (error, response) {
        if (error) {
            console.log(error);
            }
            else {
                console.log(response);
                }
            });