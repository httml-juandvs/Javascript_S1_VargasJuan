// Variables globales
let deckId = null
let currentCard = null
let nextCard = null
let playerScore = 0
let cpuScore = 0

// Elementos del DOM
const currentCardEl = document.getElementById("current-card")
const nextCardEl = document.getElementById("next-card")
const playerScoreEl = document.getElementById("player-score")
const cpuScoreEl = document.getElementById("cpu-score")
const messageEl = document.getElementById("message")
const higherBtn = document.getElementById("higher-btn")
const lowerBtn = document.getElementById("lower-btn")
const nextRoundBtn = document.getElementById("next-round-btn")
const newGameBtn = document.getElementById("new-game-btn")
const choiceButtons = document.getElementById("choice-buttons")

// Valores de las cartas
const cardValues = {
  ACE: 14,
  KING: 13,
  QUEEN: 12,
  JACK: 11,
  10: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
}

// Iniciar el juego
async function startGame() {
  // Reiniciar puntuaciones
  playerScore = 0
  cpuScore = 0
  updateScores()

  // Obtener un nuevo mazo barajado
  try {
    const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    const data = await response.json()

    if (data.success) {
      deckId = data.deck_id
      await drawFirstCard()
      messageEl.textContent = "¿La siguiente carta será mayor o menor?"

      // Mostrar botones de elección
      choiceButtons.classList.remove("hidden")
      nextRoundBtn.classList.add("hidden")
    } else {
      messageEl.textContent = "Error al obtener el mazo de cartas. Intenta de nuevo."
    }
  } catch (error) {
    console.error("Error:", error)
    messageEl.textContent = "Error de conexión. Intenta de nuevo."
  }
}

// Obtener la primera carta
async function drawFirstCard() {
  try {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    const data = await response.json()

    if (data.success) {
      currentCard = data.cards[0]
      currentCardEl.src = currentCard.image
      nextCardEl.classList.add("hidden")
    } else {
      messageEl.textContent = "Error al obtener cartas. Intenta de nuevo."
    }
  } catch (error) {
    console.error("Error:", error)
    messageEl.textContent = "Error de conexión. Intenta de nuevo."
  }
}

// Obtener la siguiente carta
async function drawNextCard() {
  try {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    const data = await response.json()

    if (data.success) {
      nextCard = data.cards[0]
      nextCardEl.src = nextCard.image
      nextCardEl.classList.remove("hidden")
      return true
    } else {
      // Si no quedan cartas, reiniciar el mazo
      if (data.remaining === 0) {
        await reshuffleDeck()
        return await drawNextCard()
      } else {
        messageEl.textContent = "Error al obtener cartas. Intenta de nuevo."
        return false
      }
    }
  } catch (error) {
    console.error("Error:", error)
    messageEl.textContent = "Error de conexión. Intenta de nuevo."
    return false
  }
}

// Rebarajar el mazo cuando se acaban las cartas
async function reshuffleDeck() {
  try {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
    const data = await response.json()

    if (!data.success) {
      messageEl.textContent = "Error al rebarajar el mazo. Intenta de nuevo."
    }
  } catch (error) {
    console.error("Error:", error)
    messageEl.textContent = "Error de conexión. Intenta de nuevo."
  }
}

// Comparar cartas y determinar el ganador
function compareCards(playerChoice) {
  const currentValue = cardValues[currentCard.value]
  const nextValue = cardValues[nextCard.value]

  let playerWins = false

  if (playerChoice === "higher") {
    playerWins = nextValue > currentValue
  } else {
    playerWins = nextValue < currentValue
  }

  if (nextValue === currentValue) {
    messageEl.textContent = "¡Empate! Las cartas tienen el mismo valor."
    return
  }

  if (playerWins) {
    playerScore++
    messageEl.textContent = "¡Correcto! Has ganado esta ronda."
  } else {
    cpuScore++
    messageEl.textContent = "¡Incorrecto! La CPU gana esta ronda."
  }

  updateScores()
}

// Actualizar puntuaciones
function updateScores() {
  playerScoreEl.textContent = playerScore
  cpuScoreEl.textContent = cpuScore
}

// Preparar la siguiente ronda
function prepareNextRound() {
  currentCard = nextCard
  currentCardEl.src = currentCard.image
  nextCardEl.classList.add("hidden")

  choiceButtons.classList.remove("hidden")
  nextRoundBtn.classList.add("hidden")

  messageEl.textContent = "¿La siguiente carta será mayor o menor?"
}

// Event Listeners
higherBtn.addEventListener("click", async () => {
  choiceButtons.classList.add("hidden")

  const success = await drawNextCard()
  if (success) {
    compareCards("higher")
    nextRoundBtn.classList.remove("hidden")
  }
})

lowerBtn.addEventListener("click", async () => {
  choiceButtons.classList.add("hidden")

  const success = await drawNextCard()
  if (success) {
    compareCards("lower")
    nextRoundBtn.classList.remove("hidden")
  }
})

nextRoundBtn.addEventListener("click", () => {
  prepareNextRound()
})

newGameBtn.addEventListener("click", () => {
  startGame()
})

// Iniciar el juego al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  startGame()
})
