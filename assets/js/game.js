// Game States
// "WIN" - Player robot has defeated all enemy robots
//      * Fight all enemy robots
//      * Defeact each enemy robot
// "LOSE" - player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
// var playerHealth = 100;
var playerHealth = 36;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ['Roborto', 'Amy Android', 'Robo Trumble'];
// var enemyHealth = 50;
var enemyHealth = 24;
var enemyAttack = 12;

var fight = function (enemyName) {
  // repeat and execute as long as the enemy robot is alive
  while (enemyHealth > 0 && playerHealth > 0) {
    // Alert users that they are starting the round
    // window.alert('Welcome to Robot Gladiators');

    // Ask to continue
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle?');
    if (promptFight === 'skip' || promptFight === 'SKIP') {
      // confirm user wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerMoney for skipping
        playerMoney = playerMoney - 5;
        // playerMoney = playerMoney - 10;
        console.log('playerMoney', playerMoney);
        break;
      } else {
        // if no (false), ask question again by running fight() again
        fight();
      }
    }

    // if player chooses to fight, then fight
    if (promptFight === 'fight' || promptFight === 'FIGHT') {
      // Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealth' variable
      enemyHealth = enemyHealth - playerAttack;
      // Log a resulting message to the console so we know that it worked.
      console.log(
        playerName +
        ' attacted ' +
        enemyName +
        '. ' +
        enemyName +
        ' now has ' +
        enemyHealth +
        ' health remaining.'
      );
      // Check enemy's health
      if (enemyHealth <= 0) {
        window.alert(enemyName + ' has died!');

        // award player money for winning
        playerMoney = playerMoney + 5;
        // playerMoney = playerMoney + 20;

        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
      }

      // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the playerHealth' variable
      playerHealth = playerHealth - enemyAttack;
      // Log a resulting message to the console so we know that it worked.
      console.log(
        enemyName +
        ' attacted ' +
        playerName +
        '. ' +
        playerName +
        ' now has ' +
        playerHealth +
        ' health remaining.'
      );
      // Check player's health
      if (playerHealth <= 0) {
        window.alert(playerName + ' has died!');
        // leave while loop if player is dead
        break;
      } else {
        window.alert(playerName + ' still has ' + playerHealth + ' health left.');
      }
    } else {
      window.alert('You need to pick a valid option.  Try again!');
    }
  }
};


// function to start a new game
var startGame = function () {
  // debugger;
  // reset player stats
  // var playerHealth = 100;
  playerHealth = 36;
  playerAttack = 10;
  playerMoney = 10;

  for (var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
      window.alert("Welcome to Robot Gladiators!  Round " + (i + 1));
      var pickedEnemyName = enemyNames[i];
      // enemyHealth = 50;
      enemyHealth = 24;
      // call fight function with enemy robot
      fight(enemyNames[i]);
    } else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }
  // after the loop ends, player is either out of health or enemies to fight, so run endGame function
  endGame();
}

var endGame = function () {
  // if player is still alive, player wins
  if (playerHealth > 0) {
    window.alert("Great job, you've survived the game.  You now have a score of " + playerMoney + ".");
  } else {
    window.alert("You've lost your robot in battle.");
  }

  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators.  Come back soon.");
  }

}

// start the game on page load
startGame();

