const LevelGame = require('./script/LevelGame');
const Player = require('./script/Player')

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const apiRouter = require('./api')
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api', apiRouter);

const port = 5000;
app.set('port', port);
http.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", (req, res)=>{
	res.sendFile(path.join(__dirname+'/client/build/index.html'))
})


let curGame;
let players = new Map();
io.on('connection', (socket) => {
	console.log(`Client with id ${socket.id} connected`);
	players.set(socket.id, new Player(socket.id));

	io.sockets.emit("update players", Array.from(players.values()));

	socket.on('update name', newName => {
		players.get(socket.id).updateName(newName);
		console.log("name updated to", newName);
		io.sockets.emit("update players", Array.from(players.values()));
	});
	socket.on("disconnect", () => {
		players.delete(socket.id);
		io.sockets.emit("update players", Array.from(players.values()));
	});

	socket.on('draw', () => {
		if (!curGame) return;
		const [newCard, id] = curGame.drawCard();
		socket.emit("draw new card", newCard);
		io.sockets.connected[id].emit("draw turn");
	})

	socket.on("new game", () => {
		if (players.size === 4) {
			io.sockets.emit("start game");
			curGame = new LevelGame(2, Array.from(players.values()));
			io.sockets.connected[curGame.start()].emit("draw turn");
		} else {
			socket.emit("not enough players");
		}
	})

})


