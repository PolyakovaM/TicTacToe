const blocks = document.querySelectorAll('.block')
const winText = document.querySelector('.win_text')
const main = document.querySelector('.main')
const itemCross =  document.querySelector('.item_cross')
const itemZero = document.querySelector('.item_zero')
const resetCounter = document.querySelector('.reset_counter')
const restartButton = document.querySelector('.restart')

const winComb = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

let step = 0
let value = 'O'
let hasWinner = false
let winCross = 0 
let winZero = 0

blocks.forEach(block => {
  block.addEventListener('click', function() {
    if (block.innerHTML || hasWinner) return
    block.innerHTML = value
    value = value === 'X' ? 'O' : 'X'
    step++
    checkWinner()
    if (!hasWinner && step === 9) {
      winText.innerHTML = 'Ничья'
      winText.style.display = 'block'
    }
    restart()
  })
})

function checkWinner() {
  winComb.forEach(elem => {
    const firstElem = blocks[elem[0]].innerHTML
    const secondElem = blocks[elem[1]].innerHTML
    const thirdElem = blocks[elem[2]].innerHTML
    const isValuesExist = firstElem && secondElem && thirdElem
    if (
      isValuesExist 
      && firstElem === secondElem
      && secondElem === thirdElem
    ) {
        hasWinner = true
        winnerShow(firstElem)
    }
    
  }) 
}

function winnerShow(elem) {
  setTimeout(() => {
    winText.innerHTML = `Выиграл: ${elem}!`
    winText.style.display = 'block'
    restart()
    if (elem === 'X') {
      winCross++
      itemCross.innerHTML = `${elem}: ${winCross}`
    } else {
      winZero++
      itemZero.innerHTML = `${elem}: ${winZero}`
    }
  }, 200)
}

function restart() {
  restartButton.addEventListener('click', function() {
    step = 0
    blocks.forEach(elem => {
      elem.innerHTML = ''
      hasWinner = false
      winText.style.display = 'none'
    })
  })
}

resetCounter.addEventListener('click', () => initialState())

function initialState() {
  winCross = 0 
  winZero = 0
  itemCross.innerHTML = `X: ${winCross}`
  itemZero.innerHTML = `O: ${winZero}`
}

initialState()
