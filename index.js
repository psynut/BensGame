var dicePics = document.querySelectorAll(".dice");
var scoreDisplays = document.querySelectorAll(".score");
var roundsDisplay = document.querySelectorAll(".rounds-count");
var columns = document.querySelectorAll(".column");

var diceRollClips = [new Audio("./sounds/diceroll1.mp3"), new Audio("./sounds/diceroll2.mp3")];
var roundWinClips = [new Audio("./sounds/round_win1.mp3"), new Audio("./sounds/round_win2.mp3"), new Audio("./sounds/round_tie.mp3")];
var newRoundClip = new Audio("./sounds/new_round.mp3");

const whiteDiePics = ["./images/white_dice1.png", "./images/white_dice2.png", "./images/white_dice3.png", "./images/white_dice4.png", "./images/white_dice5.png", "./images/white_dice6.png"];
const greenDiePics = ["./images/green_dice1.png", "./images/green_dice2.png", "./images/green_dice3.png", "./images/green_dice4.png", "./images/green_dice5.png", "./images/green_dice6.png"];

document.addEventListener("keydown", (event) => {
  if (event.key === "z" && player1.ready === true) {
    player1.rollDice();
    dicePics[0].src = (whiteDiePics[player1.dice[0].number - 1]);
    dicePics[1].src = (greenDiePics[player1.dice[1].number - 1]);
    compareRolls();
  } else if (event.key === "/" && player2.ready === true) {
    player2.rollDice();
    dicePics[2].src = (whiteDiePics[player2.dice[0].number - 1]);
    dicePics[3].src = (greenDiePics[player2.dice[1].number - 1]);
    compareRolls();
  }
});

class Die {
  constructor(number) {
    this.number = number;
  }
  roll() {
    this.number = Math.floor(Math.random() * 6) + 1;
  }
}

class Player {
  dice = [new Die(1), new Die(1)];
  ready = true;
  score = 13;
  gamesWon = 0;
  rollDice() {
    if (this.ready === true) {
      let randomNo = Math.floor(Math.random()*(diceRollClips.length));
      console.log(randomNo);
      diceRollClips[randomNo].play();
      this.dice.forEach((die) => {
        die.roll();
      });
      this.ready = false;
    }
  }
}

const player1 = new Player();
const player2 = new Player();

//const players = [player1, player2];

//columns.forEach((column,index)=>{
//  column.addEventListener("click", playerTurn(index+1));
//});

//function playerTurn(player){
//  players[player-1].rollDice();
//  dicePics[(player*2)-2].src = (whiteDiePics[players[player-1].dice[0].number - 1]);
//  dicePics[(player*2)-1].src = (greenDiePics[players[player-1].dice[1].number - 1]);
//}

function compareRolls() {
  if (player1.ready === false && player2.ready === false) {
    console.log("compareRolls");
    let difference1 = Math.abs(player1.dice[0].number - player1.dice[1].number);
    let difference2 = Math.abs(player2.dice[0].number - player2.dice[1].number);
    if (difference2 > difference1) {
      //player1 wins round
      endTurn(player2.dice[0].number);
    } else if (difference1 > difference2) {
      //player2 wins round
      endTurn(-(player1.dice[0].number));
    } else if (difference1 === difference2) {
      if (player1.dice[0].number > player2.dice[0].number) {
        //player1 wins round
        endTurn(player2.dice[0].number);
      } else if (player1.dice[0].number < player2.dice[0].number) {
        //player2 wins round
        endTurn(-(player1.dice[0].number));
      } else if (player1.dice[0].number === player2.dice[0].number) {
        if (player1.dice[1].number > player2.dice[1].number) {
          //player1 wins
          endTurn(player2.dice[0].number);
        } else if (player1.dice[1].number < player2.dice[1].number) {
          //player2 wins
          endTurn(-(player1.dice[0].number));
        } else if (player1.dice[1].number === player2.dice[1].number) {
          //tie
          endTurn(0);
        }
      }
    }
  }
}


//If adjustScore is positive player1 won round
//If adjustScore is negative player2 won round_tie
//If adjustScore is 0 - it's a tie.
function endTurn(adjustScore) {
  setTimeout(() => {
    if(adjustScore>0){
      animatePlayer1Score(adjustScore);
      roundWinClips[0].play();
    } else if (adjustScore<0){
      animatePlayer2Score(-adjustScore);
      roundWinClips[1].play();
    } else {
      roundWinClips[2].play();
    }
    player1.ready = true;
    player2.ready = true;
    player1.score += adjustScore;
    player2.score -= adjustScore;
    let player1String = "Score: " + player1.score;
    let player2String = "Score: " + player2.score;
    scoreDisplays[0].innerHTML = player1String;
    scoreDisplays[1].innerHTML = player2String;
    checkWin();
  }, 2000);
}

function checkWin() {
  if (player2.score < 1) {
    document.querySelectorAll(".player1")[0].innerHTML = "Player 1 Wins! 🏆";
    document.querySelectorAll(".player1")[0].classList.add("winner")
    document.querySelectorAll(".player2")[0].innerHTML = "Better Luck Next Time...";
    player1.ready = false;
    player2.ready = false;
    player1.gamesWon++;
    roundsDisplay[0].innerHTML = player1.gamesWon.toString();
    document.getElementById("reset").style.display = "inline";
  } else if (player2.score > 25) {
    document.querySelectorAll(".player1")[0].innerHTML = "...Better Luck Next Time";
    document.querySelectorAll(".player2")[0].innerHTML = "Player 2 Wins! 🏆";
    document.querySelectorAll(".player2")[0].classList.add("winner")
    player1.ready = false;
    player2.ready = false;
    player2.gamesWon++;
    roundsDisplay[1].innerHTML = player2.gamesWon.toString();
    document.getElementById("reset").style.display = "block";
  }
}

function reset(){
  console.log("Ran Reset");
  document.querySelectorAll(".player1")[0].innerHTML = "Press \"Z\" to roll";
  document.querySelectorAll(".player2")[0].innerHTML = "use \"?\" to roll";
  document.querySelectorAll(".player1")[0].classList.remove("winner")
  document.querySelectorAll(".player2")[0].classList.remove("winner")
  player1.score = 13;
  player2.score = 13;
  player1.ready = true;
  player2.ready = true;
  scoreDisplays[0].innerHTML = player1.score.toString();
  scoreDisplays[1].innerHTML = player2.score.toString();
  document.getElementById("reset").style.display = "none";
  newRoundClip.play();
}

function animatePlayer2Score(points){
  let id = null;
  let score = document.getElementById("player2-score-animation")
  let pos = 0;
  score.innerHTML = points.toString();
  clearInterval(id);
  id = setInterval(frame, 6);
  function frame(){
    if(pos ===80) {
      clearInterval(id);
      score.innerHTML = "&nbsp"
    } else {
      pos++
      score.style.top = pos/2 + "%";
      score.style.left = pos + "%";
    }
  }
}

function animatePlayer1Score(points){
  let id = null;
  let score = document.getElementById("player1-score-animation")
  let pos = 0;
  score.innerHTML = points.toString();
  clearInterval(id);
  id = setInterval(frame, 6);
  function frame(){
    if(pos ===80) {
      clearInterval(id);
      score.innerHTML = "&nbsp"
    } else {
      pos++
      score.style.top = pos/2 + "%";
      score.style.right = pos + "%";
    }
  }
}


//document.addEventListener("keydown", function(event){
//  rollDice(event.key);
//  buttonAnimation(event.key);
//});
