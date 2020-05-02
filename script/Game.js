// Generic Card Game class
const {newDeck} = require("./Card");

module.exports = class Game {
	constructor(decks, jokers = false, players) {
		this.cards = []
		this.players = players;
		for (let i = 1; i <= decks; i++) this.cards.push(...newDeck(i, jokers));
	}

	shuffle() {
		//Fisher-Yates Shuffle in place
		let currentIndex = this.cards.length, temporaryValue, randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = this.cards[currentIndex];
			this.cards[currentIndex] = this.cards[randomIndex];
			this.cards[randomIndex] = temporaryValue;
		}
	}
}

