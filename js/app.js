const fullDeck = document.querySelector('.deck');
const cardList = document.getElementsByClassName('card');
const restartButton = document.querySelector('.restart');
const lifeCount = document.querySelectorAll('.fa-star');
const openList = [];
let startStop = setInterval(trackTime,10);
let canClick = true;
let startTime = performance.now();

function trackTime() {
  document.querySelector('.timer').textContent = Number((performance.now() - startTime)/1000).toFixed(2);
}

function startTimer() {
  startStop = setInterval(trackTime,10);
}

function endTimer() {
  clearInterval(startStop);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Creates an array from the cardList. Necessary for shuffle to function.
function cardShuffle() {
  const cardArray = [];
  for (let i=0;i<16;++i) {
    cardList[i].className='card';
    cardArray[i] = cardList[i];
  };
  shuffle(cardArray);
  for (let i=0;i<16;++i) {
    fullDeck.appendChild(cardArray[i]);
  };
  endTimer();
  startTimer();
}

function restartGame() {
  cardShuffle();
  for (let i=0;i<3;++i) {
    lifeCount[i].className='fa fa-star';
  };
  livesUpdate();
  openList.length=0;
  startTime = performance.now();
}

function livesUpdate() {
  const moves = document.querySelector('.moves');
  const life = document.querySelectorAll('.fa-star');
  if (life.length === 1) {
    var moveWord = ' Move';
  } else {
    var moveWord = ' Moves';
  }
  moves.textContent=life.length + moveWord
}

function flipCard(evt) {
  if (evt.target.className === 'card' && canClick === true) {
    evt.target.className='card open show';
    trackOpen(evt.target);
  }
}

function trackOpen(card) {
  openList.push(card);
  if (openList.length === 2) {
    matchCheck();
  }
}

/*Checks flipped cards for a match, then updates the game state based on whether
or not a match was made, including updating moves and checking for win/loss
*/
function matchCheck() {
  if (openList[0].firstElementChild.className == openList[1].firstElementChild.className) {
    matchHandler();
  } else {
    canClick = false;
    noMatch();
  }
  livesUpdate();
  winLossCheck();
}

//Changes cards to matched state, grants additional move
function matchHandler() {
  for (let i=0;i<2;++i) {
    openList[i].className='card match';
  };
  openList.length=0;
  const lives = document.querySelectorAll('.fa-star-o');
  if (lives.length != 0) {
    lives[0].className='fa fa-star';
  }
}


//Reduces remaining moves, flips cards back over after a short delay
function noMatch() {
  setTimeout(function () {
//prevents clicking before cards are flipped back over
    canClick = true;
//prevents undesired behavior when restarting the game before this function resolves
    if (openList.length === 2) {
      for (let i=0;i<2;++i) {
        openList[i].className='card';
      };
      openList.length=0;
    }
  },750);
  const lives = document.querySelectorAll('.fa-star');
  lives[lives.length-1].className='fa fa-star-o';
}

function winLossCheck() {
  const matchedList = document.querySelectorAll('.match');
  const lives = document.querySelectorAll('.fa-star');
  let totalTime = document.querySelector('.timer').textContent;
  if (matchedList.length === 16) {
    winScreen(totalTime);
  } else if (lives.length === 0) {
    loseScreen(totalTime);
  }
}

function winScreen(time) {
  let winMessage = "Congratulations, you win! Your victory took " + time + " \
seconds! Please click the restart button to play again!";
//prevents alert from resolving before final card is flipped
  setTimeout(function() {alert(winMessage)},20);
  endTimer();
}

function loseScreen(time) {
  openList.length=0;
  for (let i=0;i<cardList.length;++i) {
    cardList[i].className='card open show';
  };
  let loseMessage = "Game over! Your game lasted " + time + " seconds. Please \
click restart to try again!"
//prevents alert from resolving before cards are flipped to show
  setTimeout(function() {alert(loseMessage)},20);
  endTimer();
}

//shuffles cards for initial game state
cardShuffle();

fullDeck.addEventListener('click',flipCard);

restartButton.addEventListener('click',restartGame);
