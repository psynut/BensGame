var dicePics = document.querySelectorAll(".dice");
var scoreDisplays = document.querySelectorAll(".score");

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
      this.dice.forEach((die) => {
        die.roll();
        console.log("Rolled a " + die.number);
      });
      this.ready = false;
      console.log(this.ready);
    }
  }
}

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


const player1 = new Player();
const player2 = new Player();

function endTurn(adjustScore) {
  setTimeout(() => {
    player1.ready = true;
    player2.ready = true;
    console.log(player1.ready + " " + player2.ready);
    console.log("Ready to play next round!");
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
    document.querySelectorAll(".player2")[0].innerHTML = "Better Luck Next Time...";
    player1.ready = false;
    player2.ready = false;
    player1.gamesWon++;
  } else if (player2.score > 25) {
    document.querySelectorAll(".player1")[0].innerHTML = "...Better Luck Next Time";
    document.querySelectorAll(".player2")[0].innerHTML = "Player 2 Wins! 🏆";
    player1.ready = false;
    player2.ready = false;
    player2.gamesWon++;
  }
}


//document.addEventListener("keydown", function(event){
//  rollDice(event.key);
//  buttonAnimation(event.key);
//});
