// Käyttöliittymäelementit
const maskedWordElement = document.getElementById('maskedWord');
const guessesElement = document.getElementById('guesses');
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');

// Sanalista
const words = ['kissa', 'koira', 'hevonen', 'norsu', 'apina'];

// Alusta uusi peli
let randomizedWord, maskedWord, guessesCount;

function newGame() {
    // Arvataan satunnainen sana
    const randomIndex = Math.floor(Math.random() * words.length);
    randomizedWord = words[randomIndex];

    // Alusta arvatut kirjaimet
    maskedWord = randomizedWord.replace(/./g, '*');
    maskedWordElement.textContent = maskedWord;

    // Alusta arvausten määrä
    guessesCount = 0;
    guessesElement.textContent = guessesCount;
}

// Tarkista vastaus ja päivitä peli
function checkGuess() {
    const guess = guessInput.value.trim().toLowerCase();
    guessInput.value = '';

    if (guess.length === 1) {
        replaceFoundChars(guess);
    } else if (guess.length === randomizedWord.length && guess === randomizedWord) {
        win();
    } else {
        alert('Väärä arvaus!');
    }
}

// Korvaa löydetyt kirjaimet
function replaceFoundChars(guess) {
    const wordChars = randomizedWord.split('');
    const maskedChars = maskedWord.split('');

    wordChars.forEach((char, index) => {
        if (char === guess) {
            maskedChars[index] = guess;
        }
    });

    maskedWord = maskedChars.join('');
    maskedWordElement.textContent = maskedWord;

    if (!maskedWord.includes('*')) {
        win();
    }
}

// Peli voitettu
function win() {
    alert(`Onneksi olkoon, voitit pelin! Arvauksia tarvittiin: ${guessesCount}`);
    newGame();
}

// Alusta uusi peli kun sivu ladataan
window.onload = () => {
    newGame();

    guessButton.addEventListener('click', (event) => {
        event.preventDefault();
        checkGuess();
        guessesCount++;
        guessesElement.textContent = guessesCount;
    });
};
