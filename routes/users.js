const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const uri = "mongodb+srv://vaxo_nba:Swz8qfii9kkK9I1d@firstcluster-5d6tv.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
const bcrypt = require('bcrypt');
const saltRounds = 10;

let userSchema = new mongoose.Schema({
    username: String,
    password: String
  });

let User = mongoose.model("User", userSchema);

process.on('unhandledRejection', err => {
    console.log(err);
});

router.post('/addUser', (req, res, next) => { 
    if (Object.keys(req.body).length > 0) {
    let userList = new User(req.body);
    
    bcrypt.hash(userList.password, saltRounds, (err, hash) => {
      let hashUser = new User({...req.body, password: hash})
      hashUser.save()
      .then(doc => {
        if (!doc) {
          res.status(404).end(); 
          return;
        }
        res.status(200).send(doc);
        return;
      })
      .catch(err => next(err));
      console.log(hashUser);
      });
    } else {
      res.send("please fill in the body");
    } 
  });
  
router.post('/addUser/login', (req, res, next) => {
  res.send((bcrypt.compareSync(req.body.password, "123")))
});

module.exports = router;