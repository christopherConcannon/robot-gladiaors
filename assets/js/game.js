// Game States
// "WIN" - Player robot has defeated all enemy robots
//      * Fight all enemy robots
//      * Defeact each enemy robot
// "LOSE" - player robot's health is zero or less



// function to generate a random numeric value
var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1)) + min;

  return value;
}

var fight = function (enemy) {
  // repeat and execute as long as the enemy robot is alive
  while (enemy.health > 0 && playerInfo.health > 0) {
    // Alert users that they are starting the round
    // window.alert('Welcome to Robot Gladiators');

    // Ask to continue
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle?');
    if (promptFight === 'skip' || promptFight === 'SKIP') {
      // confirm user wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 5);
        // playerInfo.money = playerInfo.money - 10;
        console.log('playerMoney', playerInfo.money);
        break;
      } else {
        // if no (false), ask question again by running fight() again
        fight();
      }
    }

    // if player chooses to fight, then fight
    if (promptFight === 'fight' || promptFight === 'FIGHT') {
      // generate random damage value based on player's attack power
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      enemy.health = Math.max(0, enemy.health - damage);
      // Log a resulting message to the console so we know that it worked.
      console.log(
        playerInfo.name +
        ' attacted ' +
        enemy.name +
        '. ' +
        enemy.name +
        ' now has ' +
        enemy.health +
        ' health remaining.'
      );
      // Check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + ' has died!');

        // award player money for winning
        playerInfo.money = playerInfo.money + 5;
        // playerInfo.money = playerInfo.money + 20;

        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
      }

      // Subtract the value of 'enemy.attack' from the value of 'playerInfo.health' and use that result to update the value in the playerInfo.health' variable
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      playerInfo.health = Math.max(0, playerInfo.health - damage);
      // Log a resulting message to the console so we know that it worked.
      console.log(
        enemy.name +
        ' attacted ' +
        playerInfo.name +
        '. ' +
        playerInfo.name +
        ' now has ' +
        playerInfo.health +
        ' health remaining.'
      );
      // Check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has died!');
        // leave while loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
      }
    } else {
      window.alert('You need to pick a valid option.  Try again!');
    }
  }
};

// function to set name
var getPlayerName = function () {
  var name = "";

  // ****************************
  // ADD LOOP HERE WITH PROMPT AND CONDITION
  // ************************************
  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name);
  return name;

}

// GAME INFORMATION / VARIABLES 
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function () {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money.");
    }
  },
  upgradeAttack: function () {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough scratch");
    }
  }
}

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
]

// function to start a new game
var startGame = function () {
  // reset player stats
  playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators!  Round " + (i + 1));
      var pickedEnemyObj = enemyInfo[i];

      pickedEnemyObj.health = randomNumber(18, 24);
      // call fight function with enemy robot
      fight(pickedEnemyObj);
      // if we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask if user wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
        if (storeConfirm) {
          shop();
        }
      }
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
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game.  You now have a score of " + playerInfo.money + ".");
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

var shop = function () {
  //ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store?  Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );

  // use switch to carry out action
  switch (shopOptionPrompt) {
    case "REFILL": // new case
    case "refill":
      playerInfo.refillHealth();
      break;

    case "UPGRADE": // new case
    case "upgrade":
      playerInfo.upgradeAttack();
      break;

    case "LEAVE":
    case "leave":
      window.alert("Leaving the store");

      // do nothing, so function will end
      break;

    default:
      window.alert("You did not pick a valid option.  Try again.");

      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

// start the game on page load
startGame();

