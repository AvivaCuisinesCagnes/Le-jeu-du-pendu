const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");


let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;


const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const adjustMarginForWordLength = (word) => {
    const baseMargin = 20; 
    const additionalMargin = Math.max((word.length - 8) * 8, 0); 
    wordDisplay.style.marginTop = `${baseMargin + additionalMargin}px`; 
}

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    adjustMarginForWordLength(currentWord);
    resetGame();
}


const gameOver = (isVictory) => {
    const modalText = isVictory ? `Vous avez trouvé :` : 'Le mot était:';
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Bravo !' : 'Perdu !';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}


const initGame = (button, clickedLetter) => {
    if (currentWord.toLowerCase().includes(clickedLetter.toLowerCase())) {
        
        [...currentWord].forEach((letter, index) => {
            if (letter.toLowerCase() === clickedLetter.toLowerCase()) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            } else if (letter === ' ') {
                
                wordDisplay.querySelectorAll("li")[index].innerText = ' ';
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true; 
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    
   
    const displayedWord = [...currentWord].map((letter, index) => {
        return correctLetters.includes(letter) || letter === ' ' ? letter : '_';
    }).join('');
    
    if (displayedWord === currentWord) return gameOver(true);
}


for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
