var dicePics = document.querySelectorAll(".dice");

const whiteDiePics = ["./images/white_dice1.png","./images/white_dice2.png","./images/white_dice3.png","./images/white_dice4.png","./images/white_dice5.png", "./images/white_dice6.png"];
const greenDiePics = ["./images/green_dice1.png", "./images/green_dice2.png", "./images/green_dice3.png", "./images/green_dice4.png", "./images/green_dice5.png", "./images/green_dice6.png"];

document.addEventListener("keydown", (event)=>{
  if(event.key==="z"){
    console.log("Player 1!");
    player1.rollDice();
    dicePics[0].src=(whiteDiePics[player1.dice[0].number - 1]);
    dicePics[1].src=(greenDiePics[player1.dice[1].number - 1]);
  } else if (event.key==="/"){
    console.log("Player 2!");
    dicePics[2].src=(whiteDiePics[player2.dice[0].number - 1]);
    dicePics[3].src=(greenDiePics[player2.dice[1].number - 1]);
  }
  completeTurn();
});

class Die{
  constructor(number){
    this.number = number;
  }
    roll(){
    this.number = Math.floor(Math.random()*6)+1;
  }
}

class Player{
  dice = [new Die(1), new Die(1)];
  ready = true;
  score = 13;
  gamesWon = 0;
  rollDice(){
    if(this.ready===true){
    this.dice.forEach((die)=>{
      die.roll();
    });
    this.ready=false;
    }
  }
}

function compareRolls(){
  if(player1.ready === true && player2.ready === true){
    let difference1 = Math.abs(player1.dice[0].number-player1.dice[1].number);
    let difference2 = Math.abs(player2.dice[0].number-player2.dice[1].number);
    if(difference2 > difference1){
      //player1 wins round
    } else if (difference1 > difference2){
      //player2 wins round
    } else if (difference1 === difference2){
      if(player1.dice[0].number>player2.dice[0].number){
        //player1 wins round
      } else if (player1.dice[0].number<player2.dice[0].number){
        //player2 wins round
      } else if (player1.dice[0].number===player2.dice[0].number){
        //tie
      }
    }
  }
}


const player1 = new Player();
const player2 = new Player();

function endTurn(adjustScore){
  player1.ready = true;
  player2.ready = true;
  player1Score += adjustScore;
  player2Score -= adjustScore;
  checkWin();
}

function checkWin(){
  if(player1Dice > 0 || player2Dice > 0){
    return false
  } else if (player1Dice > 25){
    document.querySelectorAll(".player1").innerHTML="Player 1 Wins! 🏆";
    document.querySelectorAll(".player2").innerHTML="Better Luck Next Time...";
  } else if (player2Dice > 25){
    document.querySelectorAll(".player1").innerHTML="...Better Luck Next Time";
    document.querySelectorAll(".player2").innerHTML="Player 2 Wins! 🏆";
  }
}

console.log(player1.dice);
//document.addEventListener("keydown", function(event){
//  rollDice(event.key);
//  buttonAnimation(event.key);
//});
