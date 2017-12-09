var game = {

  // Words the user has completed
  completedWords: [],

  // Total times player failed to guess the word
  fails:         0,

  // letters that have been guessed by the player
  guessed:      [],

  // Has the game started
  start:        false,

  // current word being guessed by the player
  word:         "almond",

  // Display of the word to the player
  wordDisplay:  "",

  // Times the player has successfully the word
  wins:         0,

  // incorrect guesses by the player
  wrongs:       0
}

var words = {

  // Gets a new word from the list
  getNewWord: (completed) => {

  },

  list: []

}

const hangman = {

    // Checks both single letters and the string entered in the input box

    checkLetter: (char) => {

        let lower = char.toLowerCase();
        $("#" + lower).css("color","red");
        if(game.guessed.indexOf(lower) == -1)
          game.guessed.push(lower);
        if(game.word.indexOf(lower) == -1)
          game.wrongs++; 
        hangman.updateDisplay();
    },

    // Checks letters when the letter buttons are clicked on

    click: (e)=> {
      if(game.guessed.indexOf(e.target.id) == -1)
       hangman.checkLetter(e.target.id);
    },

    // Checks when letter keys are pressed

    keyup: (e) =>{
        if(!game.start){

          game.start = true;
          hangman.updateDisplay();

        } else if(/[a-zA-Z]/.test(e.key) && e.key.length === 1) {

          console.log(e.key + " is a letter");
          if(game.guessed.indexOf(e.key) == -1)
            hangman.checkLetter(e.key.toLowerCase());

        }
    },

    // Select a new word after the game has ended

    newGame: () => {
      console.log("this is where the game would restart");

      // Resets all the letter buttons to color: black
      for(let i=0;i<game.guessed.length;i++){
        console.log(i);
        $("#" + game.guessed[i]).css("color","black");
      }

      game.guessed = [];
      game.wrongs  = 0;
      game.word    = "parakeet";
      hangman.updateDisplay();
    },

    // Updates the display when letters are guessed or the player has won

    updateDisplay: () =>{
  
        let splitDisplay = game.word.split("");

        // Replaces letters not in guessed with "_"

        for(let i=0;i<splitDisplay.length;i++) {
          if(game.guessed.indexOf(splitDisplay[i]) == -1 && splitDisplay[i] != " ")
            splitDisplay[i] = "_";
        }

        game.wordDisplay = splitDisplay.join("");

        // Updates the word display

        document.getElementById("stats").style.display    = "inline";
        document.getElementById("guessing").style.display = "inline";
        document.getElementById("display").textContent    = game.wordDisplay;
        document.getElementById("wrongs").textContent     = 10 - game.wrongs;
        document.getElementById("wins").textContent       = game.wins;
        document.getElementById("fails").textContent      = game.fails;

        // Checks to see if the puzzle is complete
        if(game.wordDisplay.indexOf("_")==-1 || game.wrongs > 9) {

          if(game.wrongs > 9) {

            game.fails++;

          } else {

            game.wins++;

          }
          hangman.newGame();
        }
    }

}

document.onkeyup = hangman.keyup;

$(".letter").click(hangman.click);
