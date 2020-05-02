import React from 'react'

export default function PlayerList(props) {
	return (
		<div id="PlayersList">
			<h4>Players</h4>
			<ul>
				{props.players.map(player => (
					<li key={player.id}>{player.displayName}</li>
				))}
			</ul>
		</div>
	);
}