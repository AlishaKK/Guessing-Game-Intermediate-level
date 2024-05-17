#!/usr/bin/env node
import inquirer from "inquirer";

const randomNumber = Math.floor(Math.random() * 6 + 1);
const maxAttempts = 5;

async function playGame() {
  for (let attempts = 1; attempts <= maxAttempts; attempts++) {
    const answer = await inquirer.prompt([
      {
        name: "userGuessNumber",
        type: "number",
        message: "Please guess a number between (1-6) :",
        validate: function (value) {
          if (value < 1 || value > 6) {
            return "please enter a number between(1-6)";
          } else if (isNaN(value)) {
            return "Please enter a valid number ";
          } else {
            return true;
          }
        }
      },
    ]);

    if (answer.userGuessNumber === randomNumber) {
      console.log("Correct! you won the game ");
      break;
    } else {
      console.log(`Try again! You have ${maxAttempts - attempts} attempts left`);
    }
  }

  const continueAnswer = await inquirer.prompt([
    {
      name: "continue",
      type: "confirm",
      message: "Do you want to play again?",
    },
  ]);

  if (continueAnswer.continue) {
    await playGame();
  } else {
    console.log("Thanks for playing!");
  }
}

playGame();