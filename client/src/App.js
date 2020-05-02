import React, {Component} from 'react';
import './App.css';
import io from 'socket.io-client';
import Hand from './components/Hand'
import GameScreen from "./components/GameScreen";
import Menu from "./components/Menu";


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			players: [],
			cards: [],
			gameStarted: false,
			nameText: "",
			myTurn: false
		}
		this.actionButton = this.actionButton.bind(this);
		this.submitNameChange = this.submitNameChange.bind(this);
		this.nameChange = this.nameChange.bind(this);
	}

	componentDidMount() {
		this.socket = io('localhost:5000');

		this.socket.on("update players", (newPlayers) => {
			this.setState({players: newPlayers});
			console.log("update");
		});
		this.socket.on("draw new card", newCard => {
			this.setState({
				cards: this.state.cards.concat(newCard),
				myTurn: false
			});
		})
		this.socket.on("draw turn", ()=>{
			this.setState({myTurn: true})
			console.log("my turn!")
		});
		this.socket.on("start game", () => {
			this.setState({gameStarted: true});
			console.log("start game")
		})
		this.socket.on("not enough players", () => alert("There aren't enough players to start a game!"));
	}

	actionButton() {
		this.socket.emit(this.state.gameStarted ? "draw" : "new game")
	}

	submitNameChange(event) {
		event.preventDefault();
		this.socket.emit("update name", this.state.nameText);
		this.setState({nameText: ""})
	}

	nameChange(event) {
		this.setState({nameText: event.target.value})
	}

	render() {
		return (
			<div className="App">
				<div id="GameContainer">
					<GameScreen/>
					<Menu
						actionButton={this.actionButton}
						players={this.state.players}
						gameStarted={this.state.gameStarted}
						submitNameChange={this.submitNameChange}
						nameText={this.state.nameText}
						nameChange={this.nameChange}
						myTurn={this.state.myTurn}
					/>
				</div>
				<Hand cards={this.state.cards}/>
			</div>
		);
	}
}

export default App;