const fetch = require("node-fetch");
const cheerio = require("cheerio");
const fs = require("fs");
// function to get the raw data
const getRawData = (URL) => {
   return fetch(URL)
      .then((response) => response.text())
      .then((data) => {
         return data;
      });
};
// URL for data
const URL = "https://www.stats.brawlhalla.fr/player/5466734";
// start of the program
const getBrawlhallaCharacterLevel = async () => {
   const rawData = await getRawData(URL);
   // parsing the data
   const parsedData = cheerio.load(rawData);
   console.log(parsedData);
   // write code to extract the data
   // extracting character name
   const nameColumn = columns[0];
   if (nameColumn) {
      character = nameColumn.children[0];
      if (character) {
        character = character.children[0].data;
      }
   }
   // extracting the level of the character
   const levelColumn = columns[3];
   if (levelColumn) {
      level = levelColumn.children[1];
      if (level) {
        level = level.children[0].data;
      }
   }
};
// invoking the main function
getBrawlhallaCharacterLevel();