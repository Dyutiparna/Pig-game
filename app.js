/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls two dices as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach the final points on GLOBAL score wins the game. Otherwise the first player to reach 20 points wins

*/

var scores,roundScore,activePlayer,gamePlaying;

initializeGame();

//document.querySelector('#current-' + activePlayer).textContent=dice;
//document.querySelector('#current-' + activePlayer).innerHTML='<em>' + dice + '</em>';
//var x= document.querySelector('#score-0').textContent;
//console.log(x);

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){

    //generate random numbers;
    var dice1=Math.floor(Math.random()*6) + 1;
    var dice2=Math.floor(Math.random()*6) + 1;
    //display the result when dice is not 1
    document.querySelector('#dice1').style.display= 'block';
    document.querySelector('#dice2').style.display= 'block';
    document.querySelector('#dice1').src='dice-' + dice1 + '.png';
    document.querySelector('#dice2').src='dice-' + dice2 + '.png';

    //show current score
    /*if(prevDice==6 && dice==6)
    {
        scores[activePlayer]=0;
        document.querySelector('#score-' + activePlayer).textContent= '0';
        nextPlayer();
    }*/
    if(dice1!==1 && dice2!==1){
        roundScore+=dice1+dice2;
        document.querySelector('#current-' + activePlayer).textContent=roundScore;
    }
    else{
        nextPlayer();
    }
    }

});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){

    //update GLOBAL score as per CURRENT score
    scores[activePlayer]+=roundScore;

    //update UI
    document.querySelector('#score-' + activePlayer).textContent=scores[activePlayer];
    var finalScore=document.querySelector('.final-score').value;
    if(finalScore==null)
        finalScore=20;
    if(scores[activePlayer]>=finalScore){
        document.querySelector('#name-' + activePlayer).textContent= 'winner!';
        document.querySelector('#dice1').style.display= 'none';
        document.querySelector('#dice2').style.display= 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        gamePlaying=false;
    }
    else
    nextPlayer();
    }

});

function nextPlayer(){
    activePlayer===0 ? activePlayer=1 : activePlayer=0;
        roundScore=0;
        document.getElementById('current-0').textContent=0;
        document.getElementById('current-1').textContent=0;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('#dice1').style.display= 'none';
        document.querySelector('#dice2').style.display='none';
}
document.querySelector('.btn-new').addEventListener('click',function(){
    initializeGame();
});

function initializeGame(){
    scores=[0,0];
    roundScore=0;
    activePlayer=0;
    gamePlaying=true;

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.querySelector('#name-0').textContent= 'Player 1';
document.querySelector('#name-1').textContent= 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
document.querySelector('#dice1').style.display='none';
document.querySelector('#dice2').style.display='none';
document.querySelector('.final-score').value= null;

}
