var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var uri = "mongodb+srv://vaxo_nba:Swz8qfii9kkK9I1d@firstcluster-5d6tv.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})

let todoItemsSchema = new mongoose.Schema({
  value: String,
  checked: Boolean,
  id: Number
});

let Item = mongoose.model("Item", todoItemsSchema);


router.get('/boroda', (req, res, next) => {

  res.send('asdasd');
  // Item.find(function (err, items) {
  //   if (err) return console.error(err);
  //   res.send(items);
  // })
  //   .then(doc => {
  //     if (!doc) {return res.status(404).end(); }
  //     return res.status(200).json(doc);
  //   })
  //   .catch(err => next(err));
});

router.get('/', (req, res, next) => {
  Item.find(function (err, items) {
    if (err) return console.error(err);
    res.send(items);
  })
  .then(doc => {
    if (!doc) {return res.status(404).end(); }
    return res.status(200).json(doc);
  })
  .catch(err => next(err));
});

router.post('/add', (req, res, next) => {
  let toDoList = new Item(req.body);
  toDoList.save()
    .then(item => {
      res.send("item saved to database" + toDoList);
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

router.put('/edit/:todoid', (req, res, next) => {
  Item.update({ id: req.params.todoid }, req.body)
  .then(doc => {
    if (!doc) {return res.status(404).end(); }
    return res.status(200).json(doc);
  })
  .catch(err => next(err));
});

router.delete('/delete/:todoid', (req, res, next) => {
  Item.deleteOne({ id: req.params.todoid }, function (err) {
    if (err) return handleError(err);
  })
  .then(doc => {
    if (!doc) {return res.status(404).end(); }
    return res.status(200).json(doc);
  })
  .catch(err => next(err));
});

module.exports = router;
