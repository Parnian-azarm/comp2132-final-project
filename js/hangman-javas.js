const popup = document.getElementById("popup");
const closePopup = document.getElementById("close");
const about = document.getElementById("about")
const keybooard = document.getElementById('keyboard')
const pic = document.getElementById('hangmanPic')
const gues = document.getElementById('guess')
const word = document.getElementById('wordSpotlight')
const hint = document.getElementById('hint')
const mistake = document.getElementById('mistakes')
const wrong = document.getElementById('maxWrong')

const teams = {
	"parnian": "My Name",
  "javascript": "Trickiest Programing Language",
  "melody": "You Listen To It",
  "jeffrey": "Our Teacher's Name",
  "computer": "You're Probably Using It Now",
  "home": "Where You Always Go Back",
  "downtown": "Best Place To Hang Out With Friends",
  "coffe": "Morning Drink",
  "book": "You Can Read It",
  "socks": "Men's Christmas Gift"
}


let answer = '';
let value = ''
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
let opacityValue = 0;

const keys = Object.keys(teams);


about.addEventListener("click", function() {
  $("#popup").css({opacity:'0'});
  $("#popup").stop().animate({opacity:'1'},1000);
  popup.style.display = 'block'
})

closePopup.addEventListener("click", function() {
  $("#popup").css({opacity:'1'});
  $("#popup").stop().animate({opacity:'0'},1000);
  popup.style.display = 'none'
})

// This didn't work so I used jquery 
// about.addEventListener("click", function fadein() {
//     opacityValue = opacityValue + .05;
//     if(opacityValue <= 1){
//         popup.style.opacity = opacityValue;
//         requestAnimationFrame (fadein);
//         popup.style.display = "block"
//     }
//     else{
//         popup.style.opacity = 1;
//     }    
// })
 

// closePopup.addEventListener("click", function() {
//   popup.style.opacity = 0;
//   about.addEventListener("click", fadein())
// });

function randomWord() {
  answer = keys[Math.floor(Math.random() * keys.length)];
  value = teams[answer]
  // I put comsole.log so if you wanted to see the word
  console.log(value)
  console.log(answer);
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  keybooard.innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  pic.src = './images/joaslin-hangman' + mistakes + '.png';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    word.innerHTML = 'The answer: ' + answer;
    gues.innerHTML = 'Thanks For Saving Me From Being Hanged!!!';
    pic.src = './images/joaslin-win.png';
    generateButtons()
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    word.innerHTML = 'The actual answer is: ' + answer;
    gues.innerHTML = 'Hanged To Death!!!';
    generateButtons()
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
  word.innerHTML = wordStatus;
  hint.innerHTML = `Word Hint: ` + value
}

function updateMistakes() {
  mistake.innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  pic.src = './images/joaslin-hangman.png';
  gues.innerHTML = `Guess The Word: `
  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
  fadein()
}

wrong.innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
