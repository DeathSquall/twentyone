const defaultDeck = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 11, 11, 11, 11]
const defaultPlayers = [
    {
        name: 'You',
        score: 0
    },
    {
        name: 'Rodion',
        score: 0
    },
    {
        name: 'Elena',
        score: 0
    },
    {
        name: 'Peter',
        score: 0
    }
]
const gameDefaultState = {
    players: [],
    deck: defaultDeck.slice()
}

let gameState = {}
function chance(i) {
    

    let difference = 22 - gameState.players[i].score
    let k = 0
    let badCardsCount = 0
    for (k = 0; k < gameState.deck.length; k++) {
        let card = gameState.deck[k]
        if (card >= difference) {
            badCardsCount++
        }
    }
    let probability = Math.round(100 * badCardsCount / gameState.deck.length)
    return probability
}
function startGame() {
    let gameStartScreen = document.getElementById('gameStartScreen')
    gameStartScreen.classList.remove('visible')

    let gameScreen = document.getElementById('gameScreen')
    gameScreen.classList.add('visible')

    restart()
}

function extractCardFromDeck() {
    let index = Math.floor(Math.random() * gameState.deck.length)
    let card = gameState.deck[index]
    gameState.deck.splice(index, 1)
    return card
}

function botsTurn() {
    let i = 0;
    for (i = 1; i < gameState.players.length; i++) {
        let ch = chance(i)
        let card = extractCardFromDeck()
        gameState.players[i].score += card;
        gameState.players[i].chance = ch
    }

    updateScores()

    for (i = 0; i < gameState.players.length; i++) {
        if (gameState.players[i].score >= 21) {
            gameEnd()
        }
    }
}

function takeCard() {

    let ch = chance(0)
    let card = extractCardFromDeck()
    gameState.players[0].score += card;
    gameState.players[0].chance = ch

    botsTurn()
}
function updateScores() {
    let html = ""
    for (let i = 0; i < gameState.players.length; i++) {
        html = html
            + '<td class="scores"> '
            + gameState.players[i].name
            + ' score: <span class="scoreValue">'
            + gameState.players[i].score
            + '</span> chance: '
            + gameState.players[i].chance
            + '</td> ';
    }
    document.getElementById('playersScores').innerHTML = html
}

function gameEnd() {

    let maxScore = 0;
    let maxScorePlayer = '';

    for (let i = 0; i < gameState.players.length; i++) {
        if (gameState.players[i].score <= 21 && maxScore < gameState.players[i].score) {
            maxScore = gameState.players[i].score
            maxScorePlayer = gameState.players[i].name
        }
    }

    document.getElementById('maxScore').innerHTML = maxScorePlayer

    let gameScreen = document.getElementById('gameScreen')
    gameScreen.classList.remove('visible')

    let gameEndScreen = document.getElementById('gameEndScreen')
    gameEndScreen.classList.add('visible')
}

function passCard() {
    botsTurn()
}
function startNewGame() {
    let gameEndScreen = document.getElementById('gameEndScreen')
    gameEndScreen.classList.remove('visible')
    startGame()
}
function restart() {
    gameState = Object.assign({}, gameDefaultState)
    gameState.players = JSON.parse(JSON.stringify(defaultPlayers))
    gameState.deck = defaultDeck.slice()
    updateScores()
}