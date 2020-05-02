import React, {Component} from 'react'

function displayCard(suit, value) {
	if(suit !== "joker") {
		return (
			<div className="CardInterior">
				{value}
				<img src={`images/suiticons/${suit}.png`} alt={suit}/>
			</div>
		);
	}
	const text = value===1?"Big Joker":"Little Joker";
	return (
		<div className="CardInterior Joker">
			{text}
		</div>
	);
}

function cardStr(card){
	return `${card.value} of ${card.suit}`
}

class Card extends Component{
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return false;
	}

	render(){
		return (
			<div className="Card" onClick={()=>console.log(cardStr(this.props))}>
				{displayCard(this.props.suit, this.props.value)}
			</div>
		);
	}
}


export default Card;