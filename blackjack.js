
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

const blackjackDeck = getDeck();

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
class CardPlayer {
    name;
    hand;

    constructor(name) {
        this.name = name;
        this.hand = [];
    }

    drawCard() {
        const randomCardIndex = Math.floor(Math.random() * 52);
        const randomCard = blackjackDeck[randomCardIndex];
        this.hand.push(randomCard);
    }

}; //TODO

// // CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('dealer'); // TODO
const player = new CardPlayer('player'); // TODO

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {
  // CREATE FUNCTION HERE
    let total = 0;
    let isSoft = false;

    for (let handIndex = 0; handIndex < hand.length; handIndex++) {
        let currentHand = hand[handIndex];
        let aceChecker = total + 11;
        // check wheather to add ace as 11 or 1
        if (currentHand.displayVal === 'Ace' && aceChecker > 21) {
            total += 1;
        } else if (currentHand.displayVal === 'Ace') {
            total += 11;
            isSoft = true;
            
        } else {
            total += currentHand.val;
        }
    }
    
    const returnObject = {
        total: total,
        isSoft: isSoft
    }

    return returnObject;
}

/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => {
  // CREATE FUNCTION HERE
    let shouldDraw = false;

    const handTotal = calcPoints(dealerHand);
    if (handTotal.total <= 16) {
        shouldDraw = true;
    } else if (handTotal.total === 17 && handTotal.isSoft) {
        shouldDraw = true;
    }
    return shouldDraw;
}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  // CREATE FUNCTION HERE
    let winner = 'Tie';
    if (playerScore <= 21 && dealerScore > 21) {
        winner = 'player';
    } else if (playerScore > 21 && dealerScore <= 21) {
        winner = 'dealer'
    }
    
    return `Player Score: ${playerScore}, Dealer Score: ${dealerScore}, Winner: ${winner}`
}

/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count 
 * @param {string} dealerCard 
 */
const getMessage = (count, dealerCard) => {
    return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */
const showHand = (player) => {
    const displayHand = player.hand.map((card) => card.displayVal);
    console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
}

/**
 * Runs Blackjack Game
 */
const startGame = function() {
    player.drawCard();
    dealer.drawCard();
    player.drawCard();
    dealer.drawCard();

    let playerScore = calcPoints(player.hand).total;
    showHand(player);
    getMessage(playerScore, dealer.hand[0])
    while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
        player.drawCard();
        playerScore = calcPoints(player.hand).total;
        showHand(player);
    }
    if (playerScore > 21) {
        return 'You went over 21 - you lose!';
    }
    console.log(`Player stands at ${playerScore}`);

    let dealerScore = calcPoints(dealer.hand).total;
    while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
        dealer.drawCard();
        dealerScore = calcPoints(dealer.hand).total;
        showHand(dealer);
    }
    if (dealerScore > 21) {
        return 'Dealer went over 21 - you win!';
    }
    console.log(`Dealer stands at ${dealerScore}`);

    return determineWinner(playerScore, dealerScore);
}
console.log(startGame());
// console.log(blackjackDeck)
