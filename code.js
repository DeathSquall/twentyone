const defaultDeck = [
    { value: 2, type: 'hearts', code: '2' },
    { value: 2, type: 'diamonds', code: '2' },
    { value: 2, type: 'clubs', code: '2' },
    { value: 2, type: 'spades', code: '2' },
    { value: 3, type: 'diamonds', code: '3' },
    { value: 3, type: 'hearts', code: '3' },
    { value: 3, type: 'clubs', code: '3' },
    { value: 3, type: 'spades', code: '3' },
    { value: 4, type: 'hearts', code: '4' },
    { value: 4, type: 'diamonds', code: '4' },
    { value: 4, type: 'clubs', code: '4' },
    { value: 4, type: 'spades', code: '4' },
    { value: 5, type: 'hearts', code: '5' },
    { value: 5, type: 'diamonds', code: '5' },
    { value: 5, type: 'clubs', code: '5' },
    { value: 5, type: 'spades', code: '5' },
    { value: 6, type: 'hearts', code: '6' },
    { value: 6, type: 'diamonds', code: '6' },
    { value: 6, type: 'clubs', code: '6' },
    { value: 6, type: 'spades', code: '6' },
    { value: 7, type: 'hearts', code: '7' },
    { value: 7, type: 'diamonds', code: '7' },
    { value: 7, type: 'clubs', code: '7' },
    { value: 7, type: 'spades', code: '7' },
    { value: 8, type: 'hearts', code: '8' },
    { value: 8, type: 'diamonds', code: '8' },
    { value: 8, type: 'clubs', code: '8' },
    { value: 8, type: 'spades', code: '8' },
    { value: 9, type: 'hearts', code: '9' },
    { value: 9, type: 'diamonds', code: '9' },
    { value: 9, type: 'clubs', code: '9' },
    { value: 9, type: 'spades', code: '9' },
    { value: 10, type: 'hearts', code: '10' },
    { value: 10, type: 'diamonds', code: '10' },
    { value: 10, type: 'clubs', code: '10' },
    { value: 10, type: 'spades', code: '10' },
    { value: 2, type: 'hearts', code: 'j' },
    { value: 2, type: 'diamonds', code: 'j' },
    { value: 2, type: 'clubs', code: 'j' },
    { value: 2, type: 'spades', code: 'j' },
    { value: 3, type: 'hearts', code: 'q' },
    { value: 3, type: 'diamonds', code: 'q' },
    { value: 3, type: 'clubs', code: 'q' },
    { value: 3, type: 'spades', code: 'q' },
    { value: 4, type: 'hearts', code: 'k' },
    { value: 4, type: 'diamonds', code: 'k' },
    { value: 4, type: 'clubs', code: 'k' },
    { value: 4, type: 'spades', code: 'k' },
    { value: 11, type: 'hearts', code: 'a' },
    { value: 11, type: 'diamonds', code: 'a' },
    { value: 11, type: 'clubs', code: 'a' },
    { value: 11, type: 'spades', code: 'a' },

]
const defaultPlayers = [
    {
        name: 'You',
        cards: [],
        score: 0 ,
        winsScore:0
    },
    {
        name: 'Rodion',
        cards: [],
        score: 0 ,
        winsScore: 0
    },
    {
        name: 'Elena',
        cards: [],
        score: 0 ,
        winsScore:0
    },
    {
        name: 'Peter',
        cards: [],
        score: 0 ,
        winsScore:0
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
        let cardValue = gameState.deck[k].value
        if (cardValue >= difference) {
            badCardsCount++
        }
    }
    let probability = Math.round(100 * badCardsCount / gameState.deck.length)
    return probability
}
function startGame() {
    let gameStartScreen = $("#gameStartScreen");//document.getElementById('gameStartScreen')
    
    gameStartScreen.removeClass('visible')

    let gameScreen = document.getElementById('gameScreen')
    gameScreen.classList.add('visible')


    let gameScreenActions = document.getElementById('gameScreenActions')
    gameScreenActions.classList.remove('invisible')

    restart()

    let playersCards = document.getElementById('playersCards')
    playersCards.innerHTML = ''
    for (let i = 0; i < gameState.players.length; i++) {
        //html = html + '<td class="cards"> '
        let cards = document.createElement('td')
        cards.classList.add('cards')
        playersCards.append(cards)
        gameState.players[i].cardsContainer = cards
    }


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
        let card = extractCardFromDeck()
        gameState.players[i].cards.push(card)
        gameState.players[i].lastCard = card
        gameState.players[i].score += card.value;
        let ch = chance(i)
        gameState.players[i].chance = ch
    }

    updateScores()

    for (i = 0; i < gameState.players.length; i++) {
        if (gameState.players[i].score >= 21) {
            gameEnd()
            break;
        }
    }
}

function takeCard() {

    let card = extractCardFromDeck()
    gameState.players[0].cards.push(card)
    gameState.players[0].lastCard = card
    gameState.players[0].score += card.value;
    let ch = chance(0)
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
            + chance(i)          
            + '</td> ';

    }
    document.getElementById('playersScores').innerHTML = html

    for (let i = 0; i < gameState.players.length; i++) {
        //for (let j = 0; j < gameState.players[i].cards.length; j++) {
        let card = gameState.players[i].lastCard
        if (!card) continue
        let j = gameState.players[i].cards.length - 1
        let newCardElement = document.createElement('div')
        let cardType = card.type
        let cardValue = card.value
        newCardElement.classList.add('card')
        newCardElement.classList.add('card-' + cardType)
        newCardElement.classList.add('card-' + cardValue)
        newCardElement.style = 'left:' + (j * 20) + 'px'
        gameState.players[i].cardsContainer.append(newCardElement)
        //}
    }
    /*html = ""
for (let i = 0; i < gameState.players.length; i++) {
    html = html + '<td class="cards"> '
    for (let j = 0; j < gameState.players[i].cards.length; j++) {
        let cardType = gameState.players[i].cards[j].type
        let cardValue = gameState.players[i].cards[j].value
        html = html + '<div class="card card-' + cardType + ' card-' + cardValue + ' " style="left:'+ (j*20) +'px"></div>'
    }
    html = html + '</td>';
}
document.getElementById('playersCards').innerHTML = html*/
}
function gameEnd() {
    let maxScore = 0
    let maxScorePlayer = ''
    let maxScorePlayerIndex = -1

    for (let i = 0; i < gameState.players.length; i++) {
        if (gameState.players[i].score <= 21 && maxScore < gameState.players[i].score) {
            maxScore = gameState.players[i].score
            maxScorePlayer = gameState.players[i].name
            maxScorePlayerIndex = i
        }
    }
    gameState.players[maxScorePlayerIndex].winsScore ++
    defaultPlayers[maxScorePlayerIndex].winsScore ++


    document.getElementById('maxScore').innerHTML = maxScorePlayer
    let html = ""
    for (let i = 0; i < gameState.players.length; i++) {
        html = html
            + '<td class="scores"> '
            + gameState.players[i].name
            + ' wins: </span class="scoreValue"> '
            + gameState.players[i].winsScore  
            + '</span>'
            + '</td> ';
    }
    document.getElementById('playersWinScores').innerHTML = html
    let gameEndScreen = document.getElementById('gameEndScreen')
    gameEndScreen.classList.add('visible')

    let gameScreenActions = document.getElementById('gameScreenActions')
    gameScreenActions.classList.add('invisible')
}
function passCard() {

    gameState.players[0].lastCard = null
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