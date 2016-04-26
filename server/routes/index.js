var express     = require('express'),
    models      = require('../models/index'),
    router      = express.Router();

// READ / GET Lists
router.get('/lists', function(req, res){
  models.List.findAll()
    .then(function(lists){
      res.json(lists);
    })
});

// READ / GET Todos
router.get('/lists/:id/todos', function(req, res){
  models.Todo.findAll({
      where : {listId: req.params.id}
    })
    .then(function(todos){
      res.json(todos);
    })
});

// CREATE / POST Lists
router.post('/lists', function(req, res){
  if(req.body.title){
    models.List.create(req.body, function(err, newlyCreated){
      if(err){
        console.log(err);
      } else {
        console.log(newlyCreated);
      }
    });
  }
});

// Export router towards main index.js
module.exports = router;
