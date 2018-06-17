var express = require('express')
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/webdev-practice');
var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});



var session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

app.get('/api/session/set/:name/:value',
    setSession);
app.get('/api/session/get/:name',
    getSession);

function setSession(req, res) {
    var name = req.params['name'];
    var value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}

function getSession(req, res) {
    var name = req.params['name'];
    var value = req.session[name];
    res.send(value);
}

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/message/:theMessage', function (req, res) {
    var message=req.params['theMessage']
    res.send(message)
})

var userService = require('./services/user.service.server');
userService(app);

var sectionService=require('./services/section.service.server');
sectionService(app);

app.listen(4000)