/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
  // and so on
]
/*---------------------------- Variables (state) ----------------------------*/
let board
let turn
let winner
let tie

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.getElementById('message')
const resetBtnEl = document.getElementById('rest')
/*-------------------------------- Functions --------------------------------*/

/*----------------------------- Event Listeners -----------------------------*/
const render = () => {
  updateBoard()
  updateMessage()
}

const updateBoard = () => {
  board.forEach((input, id) => {
    squareEls[id].textContent = input

    if (input === 'X') {
      squareEls[id].style.color = 'red'
    } else if (input === 'O') {
      squareEls[id].style.color = 'blue'
    } else {
      squareEls[id].style.color = 'black'
    }
  })
}
function updateMessage() {
  if (winner == false && tie == false) {
    messageEl.textContent = `  turn  ${turn}`
  } else if (tie == true) {
    messageEl.textContent = ' tie no one won'
  } else if (winner == true) {
    messageEl.textContent = `The winner is ${turn}`
  } else {
    messageEl.textContent = `Your turn ${turn}`
  }
}

const init = () => {
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'X'
  winner = false
  tie = false

  render()
}
init()

const handleClick = (event) => {
  if (!event.target.classList.contains('sqr')) return
  const squareIndex = event.target.id
  const index = parseInt(squareIndex)
  if (board[index] === 'X' || board[index] === 'O' || winner) return

  placePiece(index)
  checkForWinner()
  checkForTie()
  switchPlayerTurn()
  render()
}

const placePiece = (index) => {
  board[index] = turn
}

const checkForWinner = () => {
  winningCombos.forEach((win) => {
    const [a, b, c] = win

    if (board[a] !== '') {
      if (board[a] === board[b] && board[a] === board[c]) {
        winner = true
      }
    }
  })
}

const checkForTie = () => {
  if (winner == true) return
  if (board.includes('')) {
    tie = turn
  } else {
    tie = false
  }
}
const switchPlayerTurn = () => {
  if (winner == true) return
  turn = turn === 'X' ? 'O' : 'X'
}

resetBtnEl.addEventListener('click', init)
squareEls.forEach((square) => {
  square.addEventListener('click', handleClick)
})
