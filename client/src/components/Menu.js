import React from 'react'
import PlayerList from "./PlayerList";

export default function Menu(props) {
	const enableButton = !props.gameStarted||props.myTurn;
	console.log(enableButton);
	return (
		<div id="Menu">
			<h1>Menu</h1>
			<form onSubmit={props.submitNameChange}>
				<input
					type="text"
					value={props.nameText}
					onChange={props.nameChange}
				/>
				<button type="submit">Update Name</button>
			</form>
			<button
				id="actionButton"
				onClick={props.actionButton}
				disabled={!enableButton}
			>
				{props.gameStarted ? "Draw a Card" : "New Game"}
			</button>
			<PlayerList players={props.players}/>
		</div>
	);
}