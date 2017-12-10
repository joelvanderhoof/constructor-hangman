const Letter = require("./Letter");

function Word (gameWord) {
    this.guessesLeft = 10;
    this.wordGuessed = false;
    this.letters = gameWord.split("").map((item) => {
        return new Letter(item);
    });
    this.checkGuess = (userGuess) => {
        let letterGuessed = false;
        this.letters.forEach((item) => {
            if (userGuess.toLowerCase() === item.char.toLowerCase()) {
                item.guessed = true;
                letterGuessed = true;
            } 
        });
        if (!letterGuessed) this.guessesLeft--;
    };
    this.showCharacters = () => {
        let currentCharacters = '';
        this.letters.forEach((item) => {
            if(item.guessed) {
                currentCharacters += ` ${item.char}`;
            } else {
                currentCharacters += ` ${item.placeholder}`;
            }
        });
        console.log(currentCharacters);
    };
    this.checkForWin = () => {
        this.wordGuessed = true;
        this.letters.forEach((item) => {
            if (!item.guessed) {
                this.wordGuessed = false;
                return this.wordGuessed;
            } 
        });        
        return this.wordGuessed;        
    };
};

module.exports = Word;