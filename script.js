window.onload = function() {
    init();
}

const play = document.getElementById('play');
const playerChoose = document.getElementById('player-choose').children;
const houseChoose = document.getElementById('house-choose').children;
const result = document.getElementById('result');
const winOrLose = document.getElementById('win-lose');
const playerScore = document.getElementById('player-score');
const houseScore = document.getElementById('house-score');
let P = 0;
let H = 0;

const randHand = () => {
    return Math.floor(Math.random() * 3)
}

let houseHand = houseChoose[randHand()];

class Hand {
    constructor(name) {
        this.name = name
    }

    choose() {
        play.classList.add('inactive');
        result.classList.remove('inactive');

        for(let i = 0; i < 3; i++) {
            if(playerChoose[i].classList.contains(this.name)) {
                playerChoose[i].classList.remove('inactive');
            }
        }

        const housePlayRock = houseHand.classList.contains('rock');
        const housePlayPaper = houseHand.classList.contains('paper');
        const housePlayScissors = houseHand.classList.contains('scissors');

        if((this.name === 'rock' && housePlayScissors) || (this.name === 'paper' && housePlayRock) || (this.name === 'scissors' && housePlayPaper)) {
            winOrLose.innerHTML = 'YOU WIN';
            P+=1;
            playerScore.innerHTML = P;
        } else if ((this.name === 'rock' && housePlayPaper) || (this.name === 'paper' && housePlayScissors) || (this.name === 'scissors' && housePlayRock)) {
            winOrLose.innerHTML = 'YOU LOSE';
            H+=1;
            houseScore.innerHTML = H;
        } else {
            winOrLose.innerHTML = 'IT\'S A TIE'
        }
    }
}

// initial function
const rock = new Hand('rock');
const paper = new Hand('paper');
const scissors = new Hand('scissors')

function init() {
    document.getElementById('rules').addEventListener('click', () => rules('open'));
    document.getElementById('close').addEventListener('click', () => rules('close'));
    document.getElementById('rock').addEventListener('click', () => rock.choose());
    document.getElementById('paper').addEventListener('click', () => paper.choose());
    document.getElementById('scissors').addEventListener('click', () => scissors.choose());
    document.getElementById('play-again').addEventListener('click', newGame)
    houseHand.classList.remove('inactive')
}

//*Rules
// variables for design the rules
const readRules = document.querySelectorAll('.openRules');
const background = document.querySelectorAll('.blackBg');

// open or close the rule
const closeOrOpen = (elements, closeOrOpen) => {
    if(closeOrOpen === 'open') {
        elements.forEach(element => {
            element.classList.remove('inactive');
        })
    } else if(closeOrOpen ==='close') {
        elements.forEach(element => {
            element.classList.add('inactive');
        })
    }
}

// setting style for rules
const rules = (door) => {
    closeOrOpen(readRules, door);
    closeOrOpen(background, door);

    if(door === 'open') {
        readRules.forEach(ele => ele.setAttribute('style', 'transform: translate(-50%,-50%)'))
    } else {
        readRules.forEach(ele => ele.setAttribute('style', 'transform: translate(-50%,-25%)'))
    }
}
//*

// play again button
const newGame = () => {
    result.classList.add('inactive');
    play.classList.remove('inactive');

    for(let i = 0; i < 3; i++) {
        if(!playerChoose[i].classList.contains('inactive')) {
            playerChoose[i].classList.add('inactive');
        }

        if(!houseChoose[i].classList.contains('inactive')) {
            houseChoose[i].classList.add('inactive');
        }
    }

    houseHand = houseChoose[randHand()];
    houseHand.classList.remove('inactive')
}

