/*

Ji-Gu-Pa
First set works like normal scissors paper stone. Winner will attack first.
Second set works a bit like the korean version, but with 2 hands.

*/

var userHands = 2;
var computerHands = 2;
var userName = "";
var jgpSet = 1;
var attacker = "";

var jgpMachine = function () {
  // Generate a decimal from 0 through 3, inclusive of 0 and exclusive of 3.
  var randomDecimal = Math.random() * 3;
  // Remove the decimal with floor operation.
  // This will be an integer from 0 to 2 inclusive.
  var randomInteger = Math.floor(randomDecimal);
  //Add 1 to get valid number of 1 through 3 inclusive.
  var numberOutcome = randomInteger + 1;
  if (numberOutcome == 1) {
    var jgpOutcome = "ji";
  } else if (numberOutcome == 2) {
    jgpOutcome = "gu";
  } else if (numberOutcome == 3) {
    jgpOutcome = "pa";
  }
  return jgpOutcome;
};

var generateEmoji = function (spsSelection) {
  var emojiOutcome = "";
  if (spsSelection == "ji") {
    emojiOutcome = "✌";
  } else if (spsSelection == "gu") {
    emojiOutcome = "✊";
  } else if (spsSelection == "pa") {
    emojiOutcome = "✋";
  }
  return emojiOutcome;
};

var main = function (input) {
  // 1. if no username and a blank input
  if (userName == "" && input == "") {
    return `Oops! What's your name again?`;
    // 2. if no username and an acceptable input for username
  } else if (userName == "" && input != "") {
    userName = input;
    return `Welcome to the JI-GU-PA game, ${userName}!<br>This is a Singaporean variation of scissors, paper, stone.<br><br>To start:<br> Enter 'ji', 'gu', or 'pa'.`;
    // 3. if there's alr a username stored
  } else if (userName != "") {
    //at the first set of JGP
    if (jgpSet == 1) {
      // 3.1 unacceptable inputs
      if (!(input == "ji" || input == "gu" || input == "pa")) {
        return `Uh-oh. Try again.<br>Please enter 'ji', 'gu', or 'pa'.`;
      }
      // 3.2 acceptable inputs, run the game
      else {
        var computerSelection = jgpMachine();
        // var computerSelection = "gu";
        var winOrLoseOutcome = "";
        var userEmoji = generateEmoji(input);
        var computerEmoji = generateEmoji(computerSelection);
        var selectionsByUserAndComputer = `${userName}: ${input} ${userEmoji}<br>Computer: ${computerSelection} ${computerEmoji}<br><br>`;
        if (input == computerSelection) {
          winOrLoseOutcome = `It's a draw. Try again!<br><br>Enter 'ji', 'gu', or 'pa'.`;
        } else if (
          (input == "ji" && computerSelection == "pa") ||
          (input == "pa" && computerSelection == "gu") ||
          (input == "gu" && computerSelection == "ji")
        ) {
          winOrLoseOutcome = `You will be the first to attack!<br><br>Enter <b>two</b> of 'ji', 'gu', or 'pa'. <br>E.g. 'ji pa', or 'gu gu'`;
          jgpSet = 2;
          attacker = "user";
        } else {
          winOrLoseOutcome = `Computer will be the first to attack.<br><br>Enter <b>two</b> of 'ji', 'gu', or 'pa'. <br>E.g. 'ji pa', or 'gu gu'`;
          jgpSet = 2;
          attacker = "computer";
        }

        return selectionsByUserAndComputer + winOrLoseOutcome;
      }
    }
  }
  //at the second set of JGP
  if (jgpSet == 2) {
    // assuming we can handle user with 2 and 1 hand, altogether
    var userInput = input.split(" ");
    var userSelectionOne = userInput[0];
    var userSelectionTwo = userInput[1];
    var userEmojiOne = generateEmoji(userSelectionOne);
    var userEmojiTwo = generateEmoji(userSelectionTwo);

    var selectionsByUser = `${userName}: ${userSelectionOne}${userEmojiOne} ${userSelectionTwo}${userEmojiTwo}<br>`;
    if (userHands == 1) {
      userSelectionTwo = "userNull";
      selectionsByUser = `${userName}: ${userSelectionOne}${userEmojiOne}<br>`;
    }
    var computerSelectionOne = jgpMachine();
    var computerSelectionTwo = jgpMachine();
    // var computerSelectionOne = "gu";
    // var computerSelectionTwo = "gu";
    var computerEmojiOne = generateEmoji(computerSelectionOne);
    var computerEmojiTwo = generateEmoji(computerSelectionTwo);
    var selectionByComputer = `Computer: ${computerSelectionOne}${computerEmojiOne} ${computerSelectionTwo}${computerEmojiTwo}<br><br>`;
    if (computerHands == 1) {
      computerSelectionTwo = "compNull";
      selectionByComputer = `Computer: ${computerSelectionOne}${computerEmojiOne}<br><br>`;
    }

    var attackOutcome = "";
    var whatUserShouldDo = "";

    var noMatches =
      userSelectionOne != computerSelectionOne &&
      userSelectionOne != computerSelectionTwo &&
      userSelectionTwo != computerSelectionOne &&
      userSelectionTwo != computerSelectionTwo;

    var userOneDoubleKill =
      userSelectionOne == computerSelectionOne &&
      userSelectionOne == computerSelectionTwo;
    var userTwoDoubleKill =
      userSelectionTwo == computerSelectionOne &&
      userSelectionTwo == computerSelectionTwo;

    var userDoubleKill = userOneDoubleKill || userTwoDoubleKill;

    var compOneDoubleKill =
      computerSelectionOne == userSelectionOne &&
      computerSelectionOne == userSelectionTwo;
    var compTwoDoubleKill =
      computerSelectionTwo == userSelectionOne &&
      computerSelectionTwo == userSelectionTwo;

    var compDoubleKill = compOneDoubleKill || compTwoDoubleKill;

    var singleMatch =
      userSelectionOne == computerSelectionOne &&
      userSelectionTwo == computerSelectionTwo;
    var crossMatch =
      userSelectionOne == computerSelectionTwo &&
      userSelectionTwo == computerSelectionOne;

    //0 hands died
    if (noMatches) {
      if (attacker == "user") {
        attackOutcome = `Computer defended your attack!<br>Computer is preparing to attack...<br><br>`;
        attacker = "computer";
      } else if (attacker == "computer") {
        attackOutcome = `You defended computer's attack!<br>You are preparing to attack...<br><br>`;
        attacker = "user";
      }
      if (userHands == 2) {
        whatUserShouldDo = `Enter <b>two</b> of 'ji', 'gu', or 'pa'. <br>E.g. 'ji pa', or 'gu gu'`;
      } else if (userHands == 1) {
        whatUserShouldDo = `Enter 'ji', 'gu', or 'pa'`;
      }
    }
    // 2 hands died
    else if (userDoubleKill && attacker == "user") {
      attackOutcome = `<b>You won! 🎉🎉</b><br><br>`;
      whatUserShouldDo = `To play again, enter 'ji', 'gu', or 'pa'.`;
      jgpSet = 1;
      computerHands = 2;
      userHands = 2;
    } else if (compDoubleKill && attacker == "computer") {
      attackOutcome = `<b>You lost! 😭😭</b><br><br>`;
      whatUserShouldDo = `To play again, enter 'ji', 'gu', or 'pa'.`;
      jgpSet = 1;
      computerHands = 2;
      userHands = 2;
    } else if (singleMatch || crossMatch) {
      if (attacker == "user") {
        attackOutcome = `<b>You won! 🎉🎉</b><br><br>`;
      } else if (attacker == "computer") {
        attackOutcome = `<b>You lost! 😭😭</b><br><br>`;
      }
      whatUserShouldDo = `To play again, enter 'ji', 'gu', or 'pa'.`;
      jgpSet = 1;
      computerHands = 2;
      userHands = 2;
    }
    // 1 hand died
    else {
      if (attacker == "user") {
        if (computerHands == 2) {
          attackOutcome = `Computer lost 1 of his 2 playing hands.<br>Computer is preparing to attack...<br><br>`;
          computerHands = computerHands - 1;
          attacker = "computer";
          if (userHands == 2) {
            whatUserShouldDo = `Enter <b>two</b> of 'ji', 'gu', or 'pa'. <br>E.g. 'ji pa', or 'gu gu'.`;
          } else if (userHands == 1) {
            whatUserShouldDo = `Enter 'ji', 'gu', or 'pa'`;
          }
        } else if (computerHands == 1) {
          attackOutcome = `<b>You won! 🎉🎉</b><br><br>`;
          whatUserShouldDo = `To play again, enter 'ji', 'gu', or 'pa'.`;
          jgpSet = 1;
          computerHands = 2;
          userHands = 2;
        }
      } else if (attacker == "computer") {
        if (userHands == 2) {
          attackOutcome = `You lost 1 of your 2 playing hands.<br>You are preparing to attack...<br><br>`;
          userHands = userHands - 1;
          attacker = "user";
          whatUserShouldDo = `Enter 'ji', 'gu', or 'pa'`;
        } else if (userHands == 1) {
          attackOutcome = `<b>You lost! 😭😭</b><br><br>`;
          whatUserShouldDo = `To play again, enter 'ji', 'gu', or 'pa'.`;
          jgpSet = 1;
          computerHands = 2;
          userHands = 2;
        }
      }
    }
    return (
      selectionsByUser + selectionByComputer + attackOutcome + whatUserShouldDo
    );
  }
};
