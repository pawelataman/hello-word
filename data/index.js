const fs = require('fs');
const inputFileName = 'words.json'
const outputFileName = 'words_v2.json'

const categories = JSON.parse(fs.readFileSync(inputFileName, 'utf8'));

let id = 1
const mapped = categories.map((category) => {
 const { words } = category
const wordsWithId = words.map(word => ({...word, id: id++ }))
    return {
        ...category,
        words: wordsWithId
    }    
})


fs.writeFileSync(outputFileName, JSON.stringify(mapped), 'utf8');