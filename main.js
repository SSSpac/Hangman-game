const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");

lettersArray.forEach(letter => {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = 'letter-box';
    lettersContainer.appendChild(span);
});

const words =  {
    movies: ["Avatar", "Toy story", "The god father", "Inception", "Men in Black", "Parasite"],
    sports: ["Swimming", "Tennis", "Surfing", "Boxing", "Hockey", "Gymnastics"]
};
let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

document.querySelector(".game-info .category span").innerHTML = randomPropName;
let lettersGuessContainer = document.querySelector(".letters-guess");
let lettersAndSpace = Array.from(randomValueValue);
console.log(lettersAndSpace);
lettersAndSpace.forEach(letter => {
    let emptySpan = document.createElement("span");
    if (letter === '') {
        emptySpan.className = 'with-space';
        emptySpan.innerHTML = ' '; 
    } else {
        emptySpan.innerHTML = '_'; 
    }
    lettersGuessContainer.appendChild(emptySpan);
});
let guessSpans = document.querySelectorAll(".letters-guess span");
document.addEventListener("click", (e) => {
    if (e.target.className === 'letter-box') {
        e.target.classList.add("clicked");

        let theClickedLetter = e.target.innerHTML.toLowerCase();

    let theChosenWord = randomValueValue.toLowerCase();

        theChosenWord.split('').forEach((wordLetter, Wordindex) => {
            if (theClickedLetter === wordLetter) {
                guessSpans.forEach((span, spanIndex) => {
                    if (Wordindex === spanIndex) {
                        span.innerHTML = theClickedLetter;
                    }
                });
            }
        });
    }
});
