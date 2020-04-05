class BoardState {
  constructor(boardSize, currentPlayer, board = null) {
    if(!board) this.board = new Board(boardSize)
    else this.board = board
    
    
    this.currentPlayer = currentPlayer
    this.turn = 1-(2*currentPlayer) // if currP=0 then 1 else -1
    this.symbolOfPlayer = ['O', 'X']
    this.playerOrAI = ['AI', 'Your']

    this.winner = null
  }
  
   mousePressed() {
    if(isLooping && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height && this.turn==-1) {
      let j=Math.floor(mouseX/w);
      let i=Math.floor(mouseY/h);
      let tempBoard = this.board.board;
      
      if(tempBoard[i][j] != '') return;
      tempBoard[i][j] = this.symbolOfPlayer[this.currentPlayer];
      this.currentPlayer = 1-this.currentPlayer;
      this.turn *= -1
    }
  }
  
  createNewGame() {
    this.currentPlayer = 1
    this.turn = -1
  
    this.board.newBoard()
    this.winner = null
    isLooping = true
  
    
    playerTurn.html(this.playerOrAI[this.currentPlayer] + " Turn")
    winningPlayer.html('No winner yet')
    aiThought.html("AI: Try as hard as you want, you will never beat me")
  }
  
  // Initialise alpha = -infinity and beta = infinity as the worst possible cases. 
  performAIMove() {
    let res = this.evaluateBoard(this.board, this.turn, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)
    this.board = res[0]
    if(res[1]==-1) aiThought.html("AI: Well... Seems like I've lost")
    else if(res[1]==0) aiThought.html("AI: We either draw or I win, there is no 3rd option")
    else if(res[1]==1) aiThought.html("AI: Hey just as I said...you lost.")
    this.currentPlayer = 1-this.currentPlayer;
    this.turn *= -1
  }
  
  evaluateBoard(board, turn, Alpha, Beta) {
    let winn = board.foundWinner()
    let player = this.symbolOfPlayer[this.currentPlayer]
    let otherPlayer = this.symbolOfPlayer[1-this.currentPlayer]
    if(winn) {
      if(winn==otherPlayer) return [board, -1]
      else if(winn==player) return [board, 1]
      else return [board, 0]
    }
    
    let newBoard = board.cloneBoard()
    let availableMoves = board.giveAvailableTiles()
    let lengthOfMoves = availableMoves.length
    if(lengthOfMoves==0) return [board, 0]
    
    player = this.symbolOfPlayer[(1-turn)/2]
    if(turn==-1) {
      let bestBoard = null
      for(let i=0; i<lengthOfMoves; ++i) {
        let theMove = availableMoves[i]
        newBoard.board[theMove[0]][theMove[1]] = player
        if(i!=0) {
          let prevMove = availableMoves[i-1]
          newBoard.board[prevMove[0]][prevMove[1]] = ''
        }
        let res = this.evaluateBoard(newBoard, -1*turn, Alpha, Beta)
        if(Beta>res[1]) {
          Beta=res[1]
          bestBoard = newBoard.cloneBoard()
        }
        if(Beta<=Alpha) return [bestBoard, Beta]
      }
      return [bestBoard, Beta]
    }
    // The condition to prune a node is when alpha becomes greater than or equal to beta.
    if(turn==1) {
      let bestBoard = null
      for(let i=0; i<lengthOfMoves; ++i) {
        let theMove = availableMoves[i]
        newBoard.board[theMove[0]][theMove[1]] = player
        if(i!=0) {
          let prevMove = availableMoves[i-1]
          newBoard.board[prevMove[0]][prevMove[1]] = ''
        }
        let res = this.evaluateBoard(newBoard, -1*turn, Alpha, Beta)
        if(Alpha<res[1]) {
          Alpha=res[1]
          bestBoard = newBoard.cloneBoard()
        }
        if(Beta<=Alpha) return [bestBoard, Alpha]
      }
      return [bestBoard, Alpha]
    }
	
	//console.log('Hello')
  }
  
  updateText() {
    playerTurn.html(this.playerOrAI[this.currentPlayer] + " Turn")
  }
  
  show() {
    background(250);
  
    this.updateText();
    this.board.show()
    
    this.winner = this.board.foundWinner();
    if(this.winner) {
      if(this.winner == 'DRAW')
        winningPlayer.html(this.winner);
      else {
        // Checks who won the game and displays the appropriate message
        // This conditon checker only exists because the game is scalable and the   algorithm does not perform as well with sizes bigger than 3.
        if(this.winner == 'X')
          winningPlayer.html('You Won')
        else
          winningPlayer.html('AI Won')
      }
      isLooping = false
    }
  }
}