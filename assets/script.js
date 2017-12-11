

const game = {

  // Words the user has completed
  completedWords: [],

  // Total times player failed to guess the word
  fails:         0,

  // letters that have been guessed by the player
  guessed:      [],

  // Has the game started
  start:        false,

  // current word being guessed by the player
  word:         "",

  // Display of the word to the player
  wordDisplay:  "",

  // Times the player has successfully the word
  wins:         0,

  // incorrect guesses by the player
  wrongs:       0
};


const words = {

  // Gets a new word from the list
  getNewWord: (completed) => {

     let incomplete = [];

     // Adds incompleted words to the incomplete array
     for(let i=0;i<words.list.length;i++) {
        if(completed.indexOf(words.list[i].name) === -1)
          incomplete.push(words.list[i].name);
     }

     // If you guess all the words you win? Escape??
     if(incomplete.length === 0) {

        game.completed = [];
        words.getNewWord(words.list);

     } else {

        game.word = incomplete[Math.floor(Math.random() * incomplete.length)];

    }

  },

  list: [{
    name: "existential dread",
    quote: "Everything is meaningless...",
    src: "images/void.jpg"
  },{
    name: "two ghosts",
    quote: "Significantly scaier than one.",
    src: "images/twoghosts.jpg"
  },{
    name: "large bean",
    quote: `When nights are chill and filled with doom, again will rise the cursed legume...`,
    src: `images/largebean.jpg`
  },{
    name: "thriller",
    quote: `...for no mere mortal can resist the evil of the thriller!`,
    src: `images/thriller.jpeg`
  },{
    name: "skeleton",
    src: `images/skeleton.jpg`,
    quote: `Spooky scary skeletons...`
  },{
    name: "cthulhu",
    src: `images/cthulhu.jpg`,
    quote: `In his house at R'lyeh, dead Cthulhu waits dreaming...`
  },{
    name: "dracula",
    src: `images/dracula.jpeg`,
    quote: `Count Dracula, lord of vampires and the sovereign of the damned...`
  },{
    name: "ronald reagan",
    quote: "This man... this monster!",
    src: `images/reagan.jpeg`
  }],

  updateQuote: (word) => {

    for(let i=0;i<words.list.length;i++){
      if(words.list[i].name == word) {
        document.getElementById("solved-title").textContent = word;
        document.getElementById("solved-quote").textContent = words.list[i].quote;
        document.getElementById("image").src = words.list[i].src;
        return;
      }
    }

  }

};

const hangman = {

    // Checks both single letters and the string entered in the input box

    checkLetter: (char) => {

        let lower = char.toLowerCase();
        $("#" + lower).css("color","red");
        if(game.guessed.indexOf(lower) === -1)
          game.guessed.push(lower);
        if(game.word.indexOf(lower) === -1)
          game.wrongs++; 
        hangman.updateDisplay();
    },

    // Checks letters when the letter buttons are clicked on

    click: (e)=> {
      if(game.guessed.indexOf(e.target.id) === -1)
       hangman.checkLetter(e.target.id);
    },

    // Checks when letter keys are pressed

    keyup: (e) =>{

        if(!game.start){

          // Runs if the game hasn't started and the player has pressed any key

          game.start = true;
          hangman.updateDisplay();
          document.getElementById("the-guess").textContent  = "Guesses Remaining: ";


        } else if(  /[a-zA-Z]/.test(e.key) 
                    && e.key.length === 1
                    && game.guessed.indexOf(e.key) === -1) {

          // Runs if the key pressed is a key and that key is a letter
          // and that letter has not already been guessed by the player

            hangman.checkLetter(e.key.toLowerCase());

        }
    },

    // Select a new word after the game has ended

    newGame: () => {

      // Resets all the letter buttons to color: black
      for(let i=0;i<game.guessed.length;i++){
        $("#" + game.guessed[i]).css("color","black");
      }

      game.guessed = [];
      game.wrongs  = 0;
      game.completedWords.push(game.word);
      words.getNewWord(game.completedWords);
      hangman.updateDisplay();
    },


    // Updates the display when letters are guessed or the player has won

    updateDisplay: () =>{
        
        console.log(game.word);

        let splitDisplay = game.word.split("");

        // Replaces letters not in guessed with "_"

        for(let i=0;i<splitDisplay.length;i++) {
          if(game.guessed.indexOf(splitDisplay[i]) === -1 && splitDisplay[i] !== " ")
            splitDisplay[i] = "_";
        }

        game.wordDisplay = splitDisplay.join("");

        // Updates the word display
        
        document.getElementById("display").textContent    = game.wordDisplay;
        document.getElementById("wrongs").textContent     = 10 - game.wrongs;
        $("#white").css("opacity",((10-game.wrongs)/10).toString());
        document.getElementById("wins").textContent       = game.wins;
        document.getElementById("fails").textContent      = game.fails;

        // Checks to see if the puzzle is complete
        if(game.wordDisplay.indexOf("_") === -1 || game.wrongs > 9) {

          if(game.wrongs > 9) {

            game.fails++;
            document.getElementById("solved-title").textContent = "Failure...";
            document.getElementById("solved-quote").textContent = "...try again if you dare!";
            document.getElementById("image").src = null;

          } else {

            game.wins++;
            words.updateQuote(game.word);

          }

          hangman.newGame();
        }
    }

};

words.getNewWord(game.completedWords);

document.onkeyup = hangman.keyup;

$(".letter").click(hangman.click);
