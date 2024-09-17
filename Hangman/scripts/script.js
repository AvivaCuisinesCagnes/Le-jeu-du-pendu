const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");

// Initializing game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

// Function to reset the game
const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

// Function to get a random word and hint
const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

// Function to handle game over
const gameOver = (isVictory) => {
    const modalText = isVictory ? `Vous avez trouvé :` : 'Le mot était:';
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Bravo !' : 'Perdu !';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}

// Function to initialize game logic with letter guesses
const initGame = (button, clickedLetter) => {
    if (currentWord.toLowerCase().includes(clickedLetter.toLowerCase())) {
        // Update correct letters
        [...currentWord].forEach((letter, index) => {
            if (letter.toLowerCase() === clickedLetter.toLowerCase()) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            } else if (letter === ' ') {
                // Keep spaces intact
                wordDisplay.querySelectorAll("li")[index].innerText = ' ';
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // Update wrong guess count and hangman image
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true; // Disable the clicked button
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Check for game over conditions
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    
    // Check if the player has won
    const displayedWord = [...currentWord].map((letter, index) => {
        return correctLetters.includes(letter) || letter === ' ' ? letter : '_';
    }).join('');
    
    if (displayedWord === currentWord) return gameOver(true);
}

// Create keyboard buttons and add event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

// Start the game with a random word
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
