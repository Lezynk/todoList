var express     = require('express'),
    models      = require('../models/index'),
    router      = express.Router();

// GET Lists
router.get('/lists', function(req, res){
  models.List.findAll()
    .then(function(lists){
      res.json(lists);
    })
});

// GET Todos
router.get('/lists/:id/todos', function(req, res){
  models.Todo.findAll({
      where : {listId: req.params.id}
    })
    .then(function(todos){
      res.json(todos);
    })
});

// Export router towards main index.js
module.exports = router;
