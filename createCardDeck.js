/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
  // a deck to be returned
  const deck = [];
// array of suits to loop thru
  const suitArray = ['hearts', 'spades', 'clubs', 'diamonds'];
// array of card values to loop thru
  const cardValArray = ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  {ten: 'Ten', jack: 'Jack', queen:'Queen', king: 'King'}, 'Ace'];

  for (let suitIndex = 0; suitIndex < suitArray.length; suitIndex++) {
    for (let cardVal = 0; cardVal < cardValArray.length; cardVal++) {
// if statement for storing cards with values not equal to ten
      if (cardVal !== 8){
          let currentCard = {
          val: cardVal + 2,
          displayVal: cardValArray[cardVal],
          suit: suitArray[suitIndex]
        }
        deck.push(currentCard);
// else statement for storing cards with values equal to ten
      } else {
// creating an object with card display names that have values equal to ten
        let objectOfTens = cardValArray[8];
// looping thru the object of cards and creating card objects with values of ten to store in deck
        for (let key in objectOfTens) {
          let currentCard = {
            val: cardVal + 2,
            displayVal: objectOfTens[key],
            suit: suitArray[suitIndex]
          }
          deck.push(currentCard);
        }
      }
    }
  }
  return deck;
}

// CHECKS
const deck = getDeck()
console.log(`Deck length equals 52? ${deck.length === 52}`)

const randomCard = deck[Math.floor(Math.random() * 52)]

const cardHasVal =
  randomCard && randomCard.val && typeof randomCard.val === 'number'
console.log(`Random card has val? ${cardHasVal}`)

const cardHasSuit =
  randomCard && randomCard.suit && typeof randomCard.suit === 'string'
console.log(`Random card has suit? ${cardHasSuit}`)

const cardHasDisplayVal =
  randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string'
console.log(`Random card has display value? ${cardHasDisplayVal}`)
