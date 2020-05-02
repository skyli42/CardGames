import React from 'react'
import Card from "./Card";

function Hand(props) {
	return (
		<div id="hand">
			<ul id="handList">
				{props.cards.map(card=> (
					<li
						className="handItem"
						key={`${card.value}${card.suit}${card.deck}`}
					>
						<Card
							suit={card.suit}
							value={card.value}
						/>
					</li>
					// <li
					// 	// className="handItem"
					// 	key={`${card.value}${card.suit}${card.deck}`}
					// >
					// 	{`${card.value}${card.suit}${card.deck}`}
					// </li>
				))}
			</ul>
		</div>
	);
}

export default Hand;