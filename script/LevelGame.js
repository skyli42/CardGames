const Game = require("./Game");

module.exports = class LevelGame extends Game {
	constructor(decks, players) {
		super(decks, true, players);
		this.state = "drawing";
		this.curPlayer = 0;
	}

	start() {
		this.shuffle();
		return this.players[0].id;
	}

	drawCard() {
		if (this.cards.length > 8) {
			this.curPlayer = (this.curPlayer+1)%this.players.length;
			return [this.cards.pop(), this.players[this.curPlayer].id];
		} else return null;
	}
}