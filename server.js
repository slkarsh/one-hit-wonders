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

app.post('/api/v1/leagues', (request, response) => {
  const league = request.body

  for (let requiredParameter of ['league', 'sport_name']) {
    if (!league[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { league: <string>, sport_name: ><String>}. You're missing a "${requiredParameter}" property.`})
    }
  }

  database('leagues').insert(league, 'id')
    .then(league => {
      response.status(201).json({ id: league[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.post('/api/v1/players', (request, response) => {
  const player = request.body
  
  for (let requiredParameter of ['first_name', 'last_name', 'league_name', 'team']) {
    if (!player[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: first_name: <string>, last_name: <string>, league_name: <string>, team: <string>. You're missing a "${requiredParameter}" property.`})
    }
  }

  database('players').insert(player, 'id')
    .then(player => {
      response.status(201).json({ id: player[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.delete('/api/v1/players/:id', (request, response) => {
  const { id } = request.params

  database('players')
    .where({ id: id })
    .del()
    .then(player => {
      response.status(201).json({ id })
    })
    .catch(error => {
      response.status(422).json({ error })
    })
})

