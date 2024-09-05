const fs = require('fs');
const words = JSON.parse(fs.readFileSync('4.json', 'utf8'));

const {length: wordsLen} = words

console.log(wordsLen)

if(wordsLen < 100) throw Error('Not enough words')

const obj = {
    categoryId: 3,
    translations: words.map((word,i) => ({...word, id: i+1}))
}


fs.writeFileSync('4.json', JSON.stringify(obj))