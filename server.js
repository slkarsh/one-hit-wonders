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

app.get('/api/v1/players', (request, response) => {
  database('players').select()
    .then((players) => {
      response.status(200).json(players)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/leagues/:id', (request, response) => {
  database('leagues').where('id', request.params.id).select()
    .then(leagues => {
      if (leagues.length) {
        response.status(200).json(leagues)
      } else {
        response.status(404).json({
          error: `Could not find league with id ${request.params.id}`
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/players/:id', (request, response) => {
  // console.log('request', request)
  database('players').where('id', request.params.id).select()
    .then(players => {
      if (players.length) {
        response.status(200).json(players)
      } else {
        response.status(404).json({
          error: `Could not find player with id ${request.params.id}`
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})



// app.get('/api/v1/sports/:id', (request, response) => {
//   const { id } = request.params

//   const sport = app.locals.info.find(item => item.id === id)
// })