const fs = require('fs')
const csv = require('csv-parser')
const results = []

fs.createReadStream('./csv/onehitwonders.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results[0])
  })