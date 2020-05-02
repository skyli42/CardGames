module.exports = class Player{
	constructor(id){
		this.displayName = id;
		this.id = id;
	}
	updateName(newName){
		this.displayName = newName;
	}

}