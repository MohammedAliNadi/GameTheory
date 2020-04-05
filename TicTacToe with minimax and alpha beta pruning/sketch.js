// Implementation of the minimax algorithm is based on these websites:
//https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/

// https://towardsdatascience.com/tic-tac-toe-creating-unbeatable-ai-with-minimax-algorithm-8af9e52c1e7d

let stateOfBoard; //boardState
let sizeOfBoard = 3 //  boardSize Keep this at 3, increasing it any higher will take the algorithm a lot longer to process and might crash the system.

let isLooping = true

function setup() {
  createCanvas(400, 400)
  
  w = width/sizeOfBoard
  h = height/sizeOfBoard
  
  stateOfBoard = new BoardState(sizeOfBoard, 1);
  initLabels() // This initialises the texts on the canvas
}

// Here i am creating the labels and buttons for the game
// Also creating the reset board button, giving it a size and a activity listener
function initLabels() {
  restartButton = createButton('Restart the game');
  restartButton.position(width+30, 400);
  restartButton.mousePressed(newGame);
  
  gameInfo = createP('This game of Tic-Tac-Toe utilises the Minimax algorithm, meaning you will never win. Have fun.').style('background-color', '#FFF').style('font-size', '25px').style('padding', '5px')
  gameInfo.position(width+30, 0);
  
  playerTurn = createP("' turn").style('background-color', '#FFF').style('font-size', '20px').style('padding', '5px')
  playerTurn.position(width+30, 150);
  
  aiThought = createP("AI: Try as hard as you want, you will never beat me").style('background-color', '#FFF').style('font-size', '25px').style('padding', '5px')
  aiThought.position(width+30, 300);
  
  winningPlayer = createP('No winner yet').style('background-color', '#FFF').style('font-size', '25px').style('padding', '5px')
  winningPlayer.position(width+30, 200);
  
 
}

function mousePressed() {
  stateOfBoard.mousePressed()
}

function newGame() {
  stateOfBoard.createNewGame()
}

//Renders everything to the screen and canvas
function draw() {
  if(isLooping)
    if(stateOfBoard.turn == 1)
      stateOfBoard.performAIMove()
    stateOfBoard.show()
}
