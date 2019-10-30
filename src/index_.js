const app = require('express')() // подключаем express 
const path = require('path');
const server = require('http').createServer(app) // переменная, отвечающая за создание сервера
const io = module.exports.io = require('socket.io')(server) // подключение Soket.io

const port = process.env.port || 3231

// const SocketManager = require('./SocketManager')

//io.on('connection', SocketManager)
let connectedUsers = { }

const createUser = ({name = ""} = {})=>({name})

server.listen(port, ()=>{
  console.log('listening on :' + port)
});
/*
app.get('/', function(req, res){

  res.sendFile(__dirname + 'bin/index.html');  
});
*/

// app.use('/', express.static(path.join(__dirname, 'bin')));

let numUsers = 0;

io.on('connect', (socket) => {
  let addedUser = false;

  socket.on('VERIFY USER', (nickname, callback)=>{
		if(isUser(connectedUsers, nickname)){
			callback({ isUser:true, user:null })
		}else{
			callback({ isUser:false, user:createUser({name:nickname})})
		}
	})

  socket.on('new message', (data) => {
    socket.broadcast.emit('new message', {
      username: socket.username,
      time: new Date(Date.now()),
      message: data
    })
  })
  socket.on('add user', (username) => {

    connectedUsers = addUser(connectedUsers, username)
    console.log('user ' + username + ' connected')
    if (addedUser) return;

    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    })
  })
  socket.broadcast.emit('user joined', {
    username: socket.username,
    numUsers: numUsers
  })

  socket.on('disconnect', ()=>{
    connectedUsers = removeUser(connectedUsers, socket.username)
    console.log("Disconnect", connectedUsers);
    if (addedUser){
      --numUsers;
      

      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      })
    }
  })

})

/*
* Adds user to list passed in.
* @param userList {Object} Object with key value pairs of users
* @param user {User} the user to added to the list.
* @return userList {Object} Object with key value pairs of Users
*/
function addUser(userList, user){
	let newList = Object.assign({}, userList)
	newList[user.name] = user
	return newList
}

/*
* Removes user from the list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {string} name of user to be removed
* @return userList {Object} Object with key value pairs of Users
*/
function removeUser(userList, username){
	let newList = Object.assign({}, userList)
	delete newList[username]
	return newList
}

/*
* Checks if the user is in list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {String}
* @return userList {Object} Object with key value pairs of Users
*/
function isUser(userList, username){
  	return username in userList
}
///////////////////////////////////////////////
/*



users = [];
connections = [];

io.sockets.on('connection', function(socket){
    console.log('a user connected');
    connections.push(socket);
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log('user disconnected');
    })
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
 });

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      io.emit('chat message: ', msg);
    });
 });

*/
