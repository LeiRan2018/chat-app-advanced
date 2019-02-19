var app = require('express')();
var http = require('http').Server(app);
var logger = require('morgan');
var io = require('socket.io')(http);
var cors = require('cors');
var methodOverride = require('method-override');
var api = require('./routes/api.route');
var bodyParser = require('body-parser');
var shortid = require('shortid');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());
app.use('/api', api);

const user = require('./models/user');

const user_chatRoom = require('./models/user-chat');

const chatRoom = require('./models/chatroom');

const message = require('./models/message');

user.sync();
user_chatRoom.sync();
message.sync();

//create a broadcast room if there is no room in chatRoom
chatRoom.sync()
    .then(() => chatRoom.findOne().then(value => {
        if (value) {
            console.log("roomID: " + value.chatRoomID)
        }
        else {
            chatRoom.create({
                chatRoomID: shortid.generate()
            })
        }
    }))
//socket io to detect message sent from frontend and send back to frontend
io.on('connection', function (socket) {

    socket.on('disconnect', function () {
        console.log('disconnected');
    });

    socket.on('message', (msg) => {
        console.log('message: ' + msg['meg'] + " userid: " + msg['userid']);
        io.emit('message', msg);
    })
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});