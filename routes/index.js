var express = require('express');
var router = express.Router();

let todoItems = [
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
router.post('/add', (req, res, next) => {
    todoItems.push(
      {
        value: 'test4',
        checked: false,
        id: 4
      }
    );
    res.send(todoItems);
});

// edit todoitem
router.put('/edit/:todoid', (req, res, next) => { 
  todoItems = todoItems.map(item => {
    if (item.id === +req.params.todoid) {
      return {
        ...req.body,
        id: +req.params.todoid
      }
    } else {
      return item;
    }
  });
  res.send('array was updated');
});

// delete todoitem
router.delete('/delete/:todoid', (req, res, next) => {
  todoItems = todoItems.map(item => {
    if (item.id === +req.params.todoid) {
      return items = '';
    } else {
      return item;
    }
  })
  res.send(todoItems);
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