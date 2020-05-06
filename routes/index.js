const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const uri = "mongodb+srv://vaxo_nba:Swz8qfii9kkK9I1d@firstcluster-5d6tv.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})

let todoItemsSchema = new mongoose.Schema({
  value: String,
  checked: Boolean
});

let Item = mongoose.model("Item", todoItemsSchema);

process.on('unhandledRejection', err => {
  console.log(err);
});

router.get('/test', (req, res) => {
  const p2 = new Promise((resolve, reject) => {
    resolve(1);
  });
  p2.then(result1 => {
    console.log('------result1:', result1);
    return result1+1;
  }).then(result2 => {
    console.log('------result2:', result2);
    const result3 = result2 + 1;
    return;
  }).then(result => {
    console.log('------result:', result);
  }) ;
})

router.get('/', (req, res, next) => {
  Item.find((err, items) => {
    if (err) {
      return console.error(err);
    } 
    next();
  })
  .then(doc => {
    if (!doc) {
      res.status(404).end(); 
      return;
    }
    res.status(200).send(doc);
    return;
  })
  .catch(err => next(err))
});

router.post('/add', (req, res, next) => { 
  if (Object.keys(req.body).length > 0) {
  let toDoList = new Item(req.body);
  toDoList.save()
    .then(doc => {
      if (!doc) {
        res.status(404).end(); 
        return;
      }
      res.status(200).send(doc);
      return;
    })
    .catch(err => next(err));
  } else {
    res.send("please fill in the body");
  } 
});

router.put('/edit/:todoid', (req, res, next) => { 
  Item.updateOne({ _id: req.params.todoid }, req.body)
  .then(doc => {
    if (!doc) {
      res.status(404).end(); 
      return;
    }
    res.status(200).send(doc);
    return;
  })
  .catch(err => next(err));
});

router.put('/selectAll', (req, res, next) => { 
 Item.updateMany({checked: false}, {checked: true})
  .then(doc => {
    if (!doc) {
      res.status(404).end(); 
      return;
    }
    res.status(200).send(doc);
    return;
  })
  .catch(err => next(err));
});

router.put('/unSelectAll', (req, res, next) => { 
  Item.updateMany({checked: true}, {checked: false})
  .then(doc => {
    if (!doc) {
      res.status(404).end(); 
      return;
    }
    res.status(200).send(doc);
    return;
  })
  .catch(err => next(err));
});

router.delete('/delete/:todoid', (req, res, next) => {
  Item.deleteOne({ _id: req.params.todoid }, (err) => {
    if (err) {return handleError(err);}
  })
  .then(doc => {
    if (!doc) {
      res.status(404).end(); 
      return;
    }
    res.status(200).send(doc);
    return;
  })
  .catch(err => next(err));
});

router.delete('/deleteSelected', (req, res, next) => {
  Item.deleteMany({checked: true}, (err) => {
    if (err) return handleError(err);
  })
  .then(doc => {
    if (!doc) {
      res.status(404).end(); 
      return;
    }
    res.status(200).send(doc);
    return;
  })
  .catch(err => next(err));
});

module.exports = router;