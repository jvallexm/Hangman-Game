var word = "fff";

// Display of the unsolved word
var wordDisplay = "";
// Incorrect guesses
var wrongs = 0;
// Guessed letters
var guessed = [];

var winDisplay = "game in progress";

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
  document.getElementById("win-display").textContent = winDisplay;
  // Checks to see if the puzzle is complete
  if(wordDisplay.indexOf("_")==-1 || wrongs > 7)
  {
    if(wrongs > 7)
      winDisplay = "You Lose :(";
    else
      winDisplay = "You Win!";
    document.getElementById("win-display").textContent = winDisplay;
    document.getElementById("input-div").style.display = "none";
    document.getElementById("game-over").style.display = "inline";
  }
}

// Runs the first display update on load
updateDisplay();

 // Checks both single letters and the string entered in the input box
var checkSplitLetters = (str) => {
  
  if(str.length > 1 && str!=word) {
    
    wrongs++;
    
  } else {
    
    let split = str.toLowerCase().split("");
    let check = 0;
    for(let i=0;i<split.length;i++) {
      document.getElementById(split[i]).disabled = true;
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

// Checks letters when the letter buttons are clicked on
$(".letter").click((e)=>{
    checkSplitLetters(e.target.id);
});