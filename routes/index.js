var express = require('express');
var router = express.Router();

const todoItems = [
  {
    value: 'test',
    checked: true,
    id: 1,
  },
  {
    value: 'test2',
    checked: true,
    id: 2,
  },
  {
    value: 'test3',
    checked: false,
    id: 3
  },
];

/* GET all todoItems. */
router.get('/', (req, res, next) => {
  res.send(todoItems);
});

// create todoitem
router.post('/', (req, res, next) => {
  res.send([
    ...todoItems,
    {
      value: 'test4',
      checked: false,
      id: 4
    }
  ]);
});

// edit todoitem
router.post('/', (req, res, next, newValue, index) => {
  res.send(todoItems[index].value = newValue);
});

// delete todoitem
router.delete('/', (req, res, next) => {
  res.send(todoItems[index]);
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