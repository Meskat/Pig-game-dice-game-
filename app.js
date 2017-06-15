/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that,
it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
'use strict';
document.addEventListener("DOMContentLoaded", function () {

    var roundScore = 0,
        activePlayer,
        diceValue,
        lastDiceValue,
        boardPanels = document.getElementsByClassName("pig-game-board__panel"),
        newGame = document.getElementById('new-game'),
        dice =  document.getElementsByClassName('pig-game-board__dice'),
        holdBtn = document.getElementsByClassName('pig-game-board__hold-btn'),
        rollBtn = document.getElementsByClassName('pig-game-board__roll-btn'),
        playerOneGlobal = document.getElementById('score-0'),
        playerTwoGlobal = document.getElementById('score-1'),
        playerOneCurrent = document.getElementById('current-0'),
        playerTwoCurrent = document.getElementById('current-1'),
        scoresArray = [playerOneCurrent, playerTwoCurrent,
                       playerOneGlobal, playerTwoGlobal],
        diceValues = Math.floor(Math.random() * 6) + 1;

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function onGameInit() {

        [].forEach.call(scoresArray, function (el) {
            console.log("el", el);
            if (typeof el !== 'undefined') {
                console.log("el", el);
                el.textContent = '0';
            }
        });
         activePlayer = randomIntFromInterval(0, 1);
         boardPanels[activePlayer].classList.add('pig-game-board__panel--active');
    }

    function onRollDice() {
        diceValue = randomIntFromInterval(1, 6);
        dice[0].setAttribute('src', 'dice-' + diceValue + '.png');

        scoresArray[activePlayer].textContent = Number(scoresArray[activePlayer].textContent) + diceValue ;
        if (diceValue === 1) {
            scoresArray[activePlayer].textContent = 0;
            nextPlayer();
        }
        console.log('dive value' ,diceValue);
    }

    function onHoldDice() {
        scoresArray[activePlayer +2].textContent = Number(scoresArray[activePlayer +2].textContent)
                                                   + Number(scoresArray[activePlayer].textContent);
        scoresArray[activePlayer].textContent = 0;
        if ( Number(scoresArray[activePlayer + 2 ].textContent) >= 100) {
            alert("YOU WON")
        }
        nextPlayer();
    }
    function nextPlayer() {
        boardPanels[activePlayer].classList.remove('pig-game-board__panel--active');
        activePlayer === 1 ? activePlayer = 0 : activePlayer = 1 ;
        boardPanels[activePlayer].classList.add('pig-game-board__panel--active');
    }


    onGameInit();
    rollBtn[0].addEventListener('click', onRollDice);
    holdBtn[0].addEventListener('click', onHoldDice);
    newGame.addEventListener('click', onGameInit);
});
