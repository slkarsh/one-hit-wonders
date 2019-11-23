// const fs = require('fs')
// const csv = require('csv-parser')
const express = require('express')
const app = express()
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)


app.set('port', process.env.PORT || 3000)
app.use(express.json())
app.locals.title = "Sports' One Hit Wonders"

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')} `)
})



app.get('/', (request, response) => {
  response.send("Sports' Greatest One Hit Wonders!")
})

app.get('/api/v1/leagues', (request, response) => {
  database('leagues').select()
    .then((leagues) => {
      response.status(200).json(leagues)
    })
    .catch((error) => {
      response.status(500).json({ error })
    })
})

// app.get('/api/v1/leagues', (request, response) => {
//   const { info } = app.locals

//   response.json({ info })
// })

app.get('/api/v1/sports/:id', (request, response) => {
  const { id } = request.params

  const sport = app.locals.info.find(item => item.id === id)
})