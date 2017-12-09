
var word = "almond";

// Display of the unsolved word
var wordDisplay = "";

// Incorrect guesses
var wrongs = 0;

// Guessed letters
var guessed = [];

// Has the game started ? 
var start = false;

// Total player wins
var wins = 0;

// Player fails
var fails = 0;

// Updates the display based on guessed letters

const hangman = {

    // Checks both single letters and the string entered in the input box

    checkLetter: (char) => {

        let lower = char.toLowerCase();
        let check = 0;
        $("#" + lower).css("color","red");
        if(guessed.indexOf(lower) == -1)
          guessed.push(lower);
        if(word.indexOf(lower) != -1)
          wrongs++; 
        hangman.updateDisplay();
    },

    //

    keyup: (e) =>{
        if(!start){
          start = true;
          hangman.updateDisplay();
        } else if(/[a-zA-Z]/.test(e.key) && e.key.length === 1) {
          console.log(e.key + " is a letter");
          if(guessed.indexOf(e.key) == -1)
            hangman.checkLetter(e.key.toLowerCase());
        }
    },

    // Select a new word after the game has ended

    newGame: () => {
      console.log("this is where the game would start");
      for(let i=0;i<guessed.length;i++){
        console.log(i);
        $("#" + guessed[i]).css("color","black");
      }
      guessed = [];
      wrongs = 0;
      word = "parakeet";
      hangman.updateDisplay();
    },

    updateDisplay: () =>{
  
        let splitDisplay = word.split("");

        // Replaces letters not in guessed with "_"

        for(let i=0;i<splitDisplay.length;i++) {
          if(guessed.indexOf(splitDisplay[i]) == -1 && splitDisplay[i] != " ")
            splitDisplay[i] = "_";
        }

        wordDisplay = splitDisplay.join("");

        // Updates the word display

        document.getElementById("display").textContent = wordDisplay;
        document.getElementById("wrongs").textContent = wrongs;
        document.getElementById("wins").textContent = wins;
        document.getElementById("fails").textContent = fails;

        // Checks to see if the puzzle is complete
        if(wordDisplay.indexOf("_")==-1 || wrongs > 10)
        {
          if(wrongs > 10)
          {
            fails++;
          }
          else
          {
            wins++;
          }
          hangman.newGame();
        }
    }

}

document.onkeyup = hangman.keyup;

// Checks letters when the letter buttons are clicked on
$(".letter").click((e)=>{
  if(guessed.indexOf(e.target.id) == -1)
  hangman.checkLetter(e.target.id);
});