module.exports.sortBySuit = function (card1, card2) {
	if (card1.suit === "joker") {
		if (card2.suit === "joker") {
			return card1.value - card2.value;
		}
		return 1;
	} else if (card2.suit === "joker") {
		return -1;
	}

	const suitVal1 = suits.indexOf(card1.suit), suitVal2 = suits.indexOf(card2.suit);
	if (suitVal1 === suitVal2) {
		const cardVal1 = values.indexOf(card1), cardVal2 = values.indexOf(card2);
		if (cardVal1 === cardVal2) {
			return card1.deck - card2.deck;
		} else return cardVal1 - cardVal2;
	} else return suitVal1 - suitVal2;
}

module.exports.sortByValue = function (card1, card2) {
	const cardVal1 = values.indexOf(card1), cardVal2 = values.indexOf(card2);
	const suitVal1 = suits.indexOf(card1.suit), suitVal2 = suits.indexOf(card2.suit);
	if (cardVal1 === cardVal2) {
		if (suitVal1 === suitVal2) {
			return card1.deck - card2.deck;
		} else return suitVal1 - suitVal2;
	} else return cardVal1 - cardVal2;
}

const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const suits = ["diamonds", "clubs", "hearts", "spades"];

module.exports.newDeck = function (deckNum, jokers = false) {
	let deck = []
	for (const value of values) {
		for (const suit of suits) {
			deck.push(new Card(suit, value, deckNum));
		}
	}
	if (jokers) {
		deck.push(new Card("joker", 1, deckNum));
		deck.push(new Card("joker", 0, deckNum));
	}
	return deck;
}

class Card {
	constructor(suit, value, deck) {
		this.suit = suit;
		this.value = value;
		this.deck = deck;
	}
}

