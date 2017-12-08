
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
var updateDisplay = () =>{
  
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
    newGame();
  }
}

var newGame = () =>{
  console.log("this is where the game would start");
  for(let i=0;i<guessed.length;i++){
    console.log(i);
    $(guessed[i]).css("color","black");
  }
  guessed = [];
  wrongs = 0;
  word = "parakeet";
  updateDisplay();
}

// Runs the first display update on load
// updateDisplay();

 // Checks both single letters and the string entered in the input box
var checkSplitLetters = (str) => {
  
  if(!start) {
    
    start = true;
    
  } else {
    
    let split = str.toLowerCase().split("");
    let check = 0;
    for(let i=0;i<split.length;i++) {
      $(split[i]).css("color","red");
      if(guessed.indexOf(split[i]) == -1)
        guessed.push(split[i]);
      if(word.indexOf(split[i]) != -1)
        check++;
    }
    if(check == 0)
      wrongs++;
    
  }
  updateDisplay();
}

var convertInput = () =>{
  
  // Converts the input box into a string 
  let input = document.getElementById("input").value;
  if(input=="")
    return;
  console.log("input: " + input);
  checkSplitLetters(input);
  document.getElementById("input").value = "";
  
}

// Handles clicking the submit button
document.getElementById("submit").onclick = ()=>{
  convertInput(); 
}

document.onkeyup = (e) =>{
    if(/[a-zA-Z]/.test(e.key) && e.key.length === 1)
    {
      console.log(e.key + " is a letter");
      if(guessed.indexOf(e.key) == -1 )
      checkSplitLetters(e.key.toLowerCase());
    }
}
// Checks letters when the letter buttons are clicked on
$(".letter").click((e)=>{
  if(guessed.indexOf(e.target.id) == -1)
  checkSplitLetters(e.target.id);
});