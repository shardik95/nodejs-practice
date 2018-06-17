module.exports= function (app) {

    app.get('/api/user',findAllUsers);
    app.post('/api/user',createUser);
    app.get('/api/profile',profile);
    app.post('/api/logout',logout);
    app.post('/api/login',login);

    var userModel = require('../models/user/user.model.server');

    function findAllUsers(req,res){
        userModel.findAll()
            .then(function (users) {
                return res.send(users);
            })
    }

    function createUser(req,res){
        var user=req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser']  = user;
                 res.send(user)
            })
    }

    function login(req,res){
        var user = req.body;
        userModel.findUserByCredentials(user)
            .then(function (user) {
                req.session['currentUser']  = user;
                res.send(user)
            })

    }

    function profile(req,res) {
        res.send(req.session['currentUser']);
    }

    function logout(req,res){
        req.session.destroy();
        res.send(200);
    }

}