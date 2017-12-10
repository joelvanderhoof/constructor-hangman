const inquirer = require('inquirer');
const Word = require('./Word');

const wordsArray = ['red', 'yellow', 'blue', 'green', 'orange', 'brown', 'purple'];

const getGameWord = (array) => {
    let randomIndex = Math.floor(Math.random() * array.length);
    let randomWord = array[randomIndex];
    return randomWord;
};

const getPlayerGuess = (word) => {
    word.showCharacters();
    console.log(`\nGuesses left: ${word.guessesLeft}\n`);
    inquirer.prompt({
        name: 'userGuess',
        type: 'input',
        message: 'Guess the letters of the word.',
        validate: (input) => {
            if(input.length > 1 || input.length < 1) {
                console.log('\n\nOnly one character can be entered at a time.\n');
            } 
            return input.length === 1;
        }
    })
    .then((answer) => {
        word.checkGuess(answer.userGuess);
        if (word.checkForWin()) {
            word.showCharacters();            
            console.log('You won!')
            playAgain();
        }
        else if (word.guessesLeft > 0) {
            getPlayerGuess(word);
        } else {
            playAgain();
        };
    });
};

const startGame = () => {
    const randomWord = getGameWord(wordsArray);
    const gameWord = new Word(randomWord);
    getPlayerGuess(gameWord);
};

const playAgain = () => {
    inquirer.prompt({
        name: 'wantsToPlay',
        type: 'input',
        message: 'Play again? [Y, N]'
    })
    .then((answer) => {
        if(answer.wantsToPlay.toLowerCase() === 'y') {
            startGame();
        }
    });
};

startGame();
