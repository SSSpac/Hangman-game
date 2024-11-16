//letters 
const letters = "abcdefghijklmnopqrstuvwxyz";

//Getting the array from letters 

let lettersArray = Array.from(letters)

//selecting the letter container 
let lettersContainer = document.querySelector(".letters");

//generating the letters 
lettersArray.forEach(letter => {

    let span = document.createElement("span");

    let theLetter = document.createTextNode(letter);

    span.appendChild(theLetter);
    span.className = 'letter-box';

    lettersContainer.appendChild(span);

});

// object of words and a category 

const words =  {
    movies: ["Avatar" , "Toy story", "The god father" , "inception" , "Men in Black" , "Parasite"],
    sports: ["Swimming" , "Tennis" , "Surfing" , "Boxing" , "Hockey" , "Gymnastics"]
}

// get random propertyies 

let allKeys = Object.keys(words);

let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

// set the info for the category 

document.querySelector(".game-info .category span").innerHTML = randomPropName;

//select letters gues elements
let lettersGuessContainer = document.querySelector(".letters-guess");

// converting the chosesn word to an array 

let lettersAndSpace = Array.from(randomValueValue);
console.log(lettersAndSpace);

// create the spans depending on the word 
lettersAndSpace.forEach(letter => {
    let emptySpan = document.createElement("span");
    if(letter === '') {
        emptySpan.className = 'with-space';
    }
    
    lettersGuessContainer.appendChild(emptySpan);

});