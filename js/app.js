const fullDeck = document.querySelector('.deck');
const cardList = document.getElementsByClassName('card');
const restartButton = document.querySelector('.restart');
const lifeCount = document.querySelectorAll('.fa-star');
const openList = [];
var canClick = true;

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

function cardShuffle() {
  var cardArray = [];
  for (let i=0;i<16;++i) {
    cardList[i].className="card";
    cardArray[i] = cardList[i];
  }
  shuffle(cardArray);
  for (let i=0;i<16;++i) {
    fullDeck.appendChild(cardArray[i]);
  }
}

function startGame() {
  cardShuffle();
  for (let i=0;i<3;++i) {
    lifeCount[i].className="fa fa-star";
  }
  livesUpdate();
  openList.length=0;
}


function matchHandler() {
  for (let i=0;i<2;++i) {
    openList[i].className='card match';
  }
  openList.length=0;
}

function noMatch() {
  setTimeout(function () {
    canClick = true;
    if (openList.length === 2) {
      for (let i=0;i<2;++i) {
        openList[i].className='card';
      }
      openList.length=0;
    }
  },750);
}

function matchCheck() {
  if (openList[0].firstElementChild.className == openList[1].firstElementChild.className) {
    matchHandler();
  }
  else {
    canClick = false;
    noMatch();
  }
}

function livesUpdate() {
  document.querySelector('.moves').textContent=document.querySelectorAll('.fa-star').length;
}

function trackOpen(card) {
  openList.push(card);
  if (openList.length === 2) {
    matchCheck();
  }
}

function flipCard(evt) {
  if (evt.target.className === 'card' && canClick === true) {
    evt.target.className='card open show';
    trackOpen(evt.target);
  }
}

startGame();

fullDeck.addEventListener('click',flipCard);
restartButton.addEventListener('click',startGame);
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
