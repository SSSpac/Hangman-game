let gameStats = {
  gamesPlayed: 0,
  wins: 0,
  losses: 0
};

const letters = "abcdefghijklmnopqrstuvwxyz";


const words = {
  movies: ["Avatar", "Toy story", "The god father", "Inception", "Men in Black", "Parasite"],
  sports: ["Swimming", "Tennis", "Surfing", "Boxing", "Hockey", "Gymnastics"]
};


let currentWord = "";
let wrongAttempts = 0;
let lettersContainer;
let guessSpans;
let theDraw;

function initializeGame() {

  lettersContainer = document.querySelector(".letters");
  theDraw = document.querySelector(".hangman-draw");
  
  lettersContainer.innerHTML = '';
  document.querySelector(".letters-guess").innerHTML = '';
  
  for (let i = 1; i <= 8; i++) {
    theDraw.classList.remove(`wrong-${i}`);
  }
  
  lettersContainer.classList.remove("finished");
  
  wrongAttempts = 0;
  
  Array.from(letters).forEach(letter => {
    let span = document.createElement("span");
    span.appendChild(document.createTextNode(letter));
    span.className = 'letter-box';
    lettersContainer.appendChild(span);
  });
  
  setupNewWord();
  
  updateStatsDisplay();
}

function setupNewWord() {

  let allKeys = Object.keys(words);
  let randomPropNumber = Math.floor(Math.random() * allKeys.length);
  let randomPropName = allKeys[randomPropNumber];
  let randomPropValue = words[randomPropName];
  let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
  
  currentWord = randomPropValue[randomValueNumber];
  
  document.querySelector(".game-info .category span").innerHTML = randomPropName;
  
  let lettersGuessContainer = document.querySelector(".letters-guess");
  lettersGuessContainer.innerHTML = '';
  
  Array.from(currentWord).forEach(letter => {
    let emptySpan = document.createElement("span");
    if (letter === ' ') {
      emptySpan.className = 'with-space';
    }
    lettersGuessContainer.appendChild(emptySpan);
  });
  
  guessSpans = document.querySelectorAll(".letters-guess span");
}

function updateStatsDisplay() {
  document.querySelector(".game-stats").innerHTML = `
    Games Played: ${gameStats.gamesPlayed} | 
    Wins: ${gameStats.wins} | 
    Losses: ${gameStats.losses}
  `;
}

function checkWin() {
  let revealed = true;
  guessSpans.forEach(span => {
    if (span.innerHTML === '' && !span.classList.contains('with-space')) {
      revealed = false;
    }
  });
  return revealed;
}

function endGame(won = false) {
  gameStats.gamesPlayed++;
  if (won) {
    gameStats.wins++;
    document.getElementById("success").play().catch(() => {});
  } else {
    gameStats.losses++;
    document.getElementById("fail").play().catch(() => {});
  }
  
  let div = document.createElement("div");
  let message = won ? 
    `Congratolations! You won!` :
    `Game Over :( The word was: ${currentWord}`;
  
  div.innerHTML = `
    ${message}<br>
    <button class="replay-button">Play Again Maybe ?</button>
  `;
  div.className = 'popup';
  document.body.appendChild(div);
  
  div.querySelector('.replay-button').addEventListener('click', () => {
    document.body.removeChild(div);
    initializeGame();
  });
  
  updateStatsDisplay();
}

function handleLetterClick(e) {
  if (e.target.className === 'letter-box') {
    e.target.classList.add("clicked");
    
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    let theChosenWord = currentWord.toLowerCase();
    let letterFound = false;
    
    Array.from(theChosenWord).forEach((wordLetter, wordIndex) => {
      if (theClickedLetter === wordLetter) {
        letterFound = true;
        guessSpans[wordIndex].innerHTML = theClickedLetter;
      }
    });
    
    if (!letterFound) {
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      
      if (wrongAttempts === 8) {
        lettersContainer.classList.add("finished");
        endGame(false);
      }
    } else if (checkWin()) {
      lettersContainer.classList.add("finished");
      endGame(true);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener("click", handleLetterClick);
  
  initializeGame();
});

function initializeThemeToggle() {
  const toggleBtn = document.querySelector('.theme-toggle');
  const body = document.body;
  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleBtn.textContent = 'Light Theme';
  }
  
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
      toggleBtn.textContent = 'Light Theme';
      localStorage.setItem('theme', 'dark');
    } else {
      toggleBtn.textContent = 'Dark Theme';
      localStorage.setItem('theme', 'light');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener("click", handleLetterClick);
  initializeGame();
  initializeThemeToggle(); 
});