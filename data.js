const data = require('../csv/json-data.js')

const synthesizePlayers = () => {
  return data.reduce((acc, currentPlayer) => {
    if (currentPlayer.year_index === currentPlayer.peak_year_index) {
      acc.push(currentPlayer)
    }
    return acc
  }, [])
}


const playerData = synthesizePlayers();

module.exports = playerData;