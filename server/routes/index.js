var express     = require('express'),
    models      = require('../models/index'),
    router      = express.Router();

// READ / GET Lists
router.get('/lists', function(req, res){
  models.List.findAll({
      order: [
        ['updatedAt', 'DESC']
      ]
    })
    .then(function(lists){
      res.json(lists);
    })
});

// READ / GET Todos
router.get('/lists/:id/todos', function(req, res){
  models.Todo.findAll({
      where : {listId: req.params.id},
      order: [
        ['updatedAt', 'DESC']
      ]
    })
    .then(function(todos){
      res.json(todos);
    })
});

// CREATE / POST List
router.post('/lists', function(req, res){
  if(req.body.title){
    models.List.create(req.body, function(err, newlyCreated){
      if(err){
        console.log(err);
      } else {
        console.log(newlyCreated);
      }
    }).then(function(list){
      res.json(list);
    });
  }
});

// CREATE / POST Todo
router.post('/lists/:id/todos', function(req, res){
  if(req.body.content){
    console.log(req.body);
    models.Todo.create(req.body, function(err, newlyCreated){
      if(err){
        console.log(err);
      } else {
        console.log(newlyCreated);
      }
    }).then(function(todo){
      res.json(todo);
    });
  }
});

// UPDATE / PUT List
router.put('/lists/:id', function(req, res) {
  models.List.find({
    where: {id: req.params.id}
  })
    .then(function(list) {
      if(list){
        list.updateAttributes({
          title: req.body.title
        }).then(function(list){
          res.json(list);
        });
      }
    });
});

// UPDATE / PUT Todo
router.put('/lists/:listId/todos/:id', function(req, res) {
  models.Todo.find({
    where: {
      id: req.params.id
    }
  })
    .then(function(todo) {
      if(todo){
        todo.updateAttributes({
          content: req.body.content,
          location: JSON.parse(req.body.location)
        }).then(function(list){
          res.json(list);
        });
      }
    });
});

// DELETE List
router.delete('/lists/:id', function(req, res) {
  models.List.destroy({
    where: {id: req.params.id}
  }).then(function(todo) {
    res.json(todo);
  });
});

// DELETE Todo
router.delete('/lists/:listId/todos/:id', function(req, res) {
  models.Todo.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(todo) {
    res.json(todo);
  });
});

// Export router towards main index.js
module.exports = router;
