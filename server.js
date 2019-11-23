// const fs = require('fs')
// const csv = require('csv-parser')
const express = require('express')
const app = express()
const results = []

const environment = process.env.NODE_ENV || 'development'

// fs.createReadStream('./csv/onehitwonders.csv')
//   .pipe(csv())
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//     const example = results.slice(0, 10)
//     console.log(example)
//   })

app.set('port', process.env.PORT || 3000)
app.use(express.json())
app.locals.title = "Sports' One Hit Wonders"

app.locals.info = results;

app.get('/', (request, response) => {
  response.send("Sports' Greatest One Hit Wonders!")
})

app.get('/api/v1/sports', (request, response) => {
  const { info } = app.locals

  response.json({ info })
})

app.get('/api/v1/sports/:id', (request, response) => {
  const { id } = request.params

  const sport = app.locals.info.find(item => item.id === id)
})