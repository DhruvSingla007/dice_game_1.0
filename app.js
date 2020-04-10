/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


// Get the target score from the user
var targetScore = prompt('Enter the target score : ')


// Initialising the variables
var scores,roundScore, activePlayer , gameState;

// Resetting the game
reset = function() {

    // Change the gaeState to true
    gameState = true;

    // player names
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";

    // Hiding the Dice
    document.querySelector('.dice').style.display = 'none';
    
    // setting all values to zero
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    // Remove the Winner class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // Initializing player 0 as active player
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}

// change player function
changePlayer = function(){

    // Hide the dice
    document.querySelector('.dice').style.display = 'none';

    // Change roundScore to 0
    roundScore = 0;

    // Display both round scores 0
    document.querySelector(`#current-0`).textContent = roundScore;
    document.querySelector(`#current-1`).textContent = roundScore;

    // Change the active player
    activePlayer = activePlayer == 0 ? 1 : 0;
    
    // Display the active player
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

}





// Reset the game
reset();

// ROLL-BUTTON function

document.querySelector('.btn-roll').addEventListener('click', function(){

    if(gameState){

        // Generate a random number
        let dice = Math.floor(Math.random() * 6) + 1;

        // Display the result
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // Check if the number if it is 1 or not
        if(dice != 1){

            // Add Score
            roundScore += dice;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;

        } else {

            // change player function
            changePlayer();

        }    
    }

})

// HOLD BUTTON function

document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gameState){

        // Add roundScore to Global Score
        scores[activePlayer] += roundScore;

        // Display the updated scores
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if the player won or not
        if(scores[activePlayer] >= targetScore){

            // Change gameState to false
            gameState = false;

            // Remane thhe active player to WINNER
            document.querySelector('#name-' + activePlayer).textContent = "WINNER";

            // Hide the Dice
            document.querySelector('.dice').style.display = 'none';

            // Remove the active player and Display the winner
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');


        } else {
        
            // change player function
            changePlayer();

        }
    }
})

// NEW BUTTON function

document.querySelector('.btn-new').addEventListener('click',function(){

    // Reset the game
    reset();
})