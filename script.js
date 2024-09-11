const cards = [
    "A",
    "A",
    "B",
    "B",
    "C",
    "C",
    "D",
    "D",
    "E",
    "E",
    "F",
    "F",
    "G",
    "G",
    "H",
    "H",
  ]
  
  const gameBoard = document.getElementById("game-board")
  const restartButton = document.getElementById("restart-button")
  let flippedCards = []
  let matchedPairs = 0
  
  function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }
  
  function createCard(cardValue) {
    const card = document.createElement("div")
    card.classList.add("card")
  
    const cardInner = document.createElement("div")
    cardInner.classList.add("card-inner")
  
    const cardFront = document.createElement("div")
    cardFront.classList.add("card-face", "card-front")
  
    const cardBack = document.createElement("div")
    cardBack.classList.add("card-face", "card-back")
    cardBack.textContent = cardValue
  
    cardInner.appendChild(cardFront)
    cardInner.appendChild(cardBack)
  
    card.appendChild(cardInner)
  
    card.addEventListener("click", () => {
      if (card.classList.contains("flipped") || flippedCards.length === 2) {
        return
      }
      card.classList.add("flipped")
      flippedCards.push(card)
  
      if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards
        if (
          card1.querySelector(".card-back").textContent ===
          card2.querySelector(".card-back").textContent
        ) {
          matchedPairs++
          if (matchedPairs === cards.length / 2) {
            setTimeout(() => alert("Congratulations! You won the game"), 500)
          }
        } else {
          setTimeout(() => {
            card1.classList.remove("flipped")
            card2.classList.remove("flipped")
          }, 600)
        }
        flippedCards = []
      }
    })
  
    return card
  }
  
  function startGame() {
    shuffleCards(cards)
    gameBoard.innerHTML = ""
    matchedPairs = 0
  
    for (const cardValue of cards) {
      const card = createCard(cardValue)
      gameBoard.appendChild(card)
    }
  }
  
  restartButton.addEventListener("click", startGame)
  startGame()