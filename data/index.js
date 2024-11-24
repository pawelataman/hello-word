const fs = require("fs");
const inputFileName = "words_v2.json";
const outputFileName = "words.json";

const output = [];
const categoriesWithWords = JSON.parse(fs.readFileSync(inputFileName, "utf8"));
categoriesWithWords.forEach((categoryWithWord) => {
  categoryWithWord.words.forEach((word) => {
    output.push({
      categoryId: categoryWithWord.id,
      en: word["en"][0],
      pl: word["pl"],
    });
  });
});

console.log(output.length);
fs.writeFileSync(outputFileName, JSON.stringify(output), "utf8");
