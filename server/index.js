var app = require('express')();
var http = require('http').Server(app);
var fs = require('fs');
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

io.on('connection', function (socket) {
    // var userid = shortid.generate();
    // console.log('uesrid: ' + userid + ' conected');

    socket.on('disconnect', function () {
        console.log('disconnected');
    });

    socket.on('message', (msg) => {
        // fs.appendFile('data.txt', msg + '\n', (err) => {
        //     if (err) throw err;
        //     console.log(msg + 'was appended to data.txt')
        // })
        console.log('message: ' + msg['meg'] + " userid: " + msg['userid']);
        io.emit('message', msg);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});