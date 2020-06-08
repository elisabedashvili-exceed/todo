const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
let { User } = require('../models/users');

router.post('/addUser', (req, res, next) => { 
    if (Object.keys(req.body).length > 0) {
    let userList = new User(req.body);
    
    bcrypt.hash(userList.password, saltRounds, (err, hash) => {
      let hashUser = new User({...req.body, password: hash})
      hashUser.save()
      .then(doc => {
        res.send(doc);
      })
      .catch(err => {
        res.send(err);
      });
      //Log user
      console.log(hashUser);
      });
    } else {
      res.send("please fill in the body");
    } 
  });
  
router.post('/login', (req, res) => {
  User.findOne({username: req.body.username})
  .then((user) => {
    if (!user) {
     res.send('No Users Found');
    } else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          res.send('Successfully Logged In');
        } else {
          res.send('Incorrect password');
        }
      });
    }
  })
  .catch(err => {
    res.send(err);
  })
});

module.exports = router;