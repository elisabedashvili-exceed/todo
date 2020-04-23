var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// send array of todoitems
router.post('/', (req, res, next) => {
  res.send([]);
});

// create todoitem
router.post('/', (req, res, next) => {
  res.send([]);
});

// edit todoitem
router.post('/', (req, res, next) => {
  res.send([]);
});

// delete todoitem
router.post('/', (req, res, next) => {
  res.send([]);
});

module.exports = router;



/* create 4 routes
1. one route will send array of todoitems
2. one route will create todoitem
3. one route will edit todoitem by id
4. route will delete todoitem by id
also
create a mock data array of todoItems on the server side
and work with him */