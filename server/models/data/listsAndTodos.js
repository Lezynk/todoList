module.exports = (list, todo) => {

  // Create (force) defined table and add test data
  list.sync({force: true})
    .then(function(){
      var initData = [
        {title:'Vie'},
        {title:'Taff'},
        {title:'Vacances'}
      ];

      list.bulkCreate(initData)
      .then(function() {
        return list.findAll();
      }).then(function(lists) {
        console.log(lists)
      })
  });

  // Create (force) defined table and add test data
  todo.sync({force: true})
    .then(function(){
      var initData = [
        {content:"Ranger l'appartement", listId: 1},
        {content:"Cadeau Bébé !!!", location:{lat:2,lng:1}, listId: 1},
        {content:"OLLAA", location:{lat:3,lng:4}, listId: 3},
        {content:"Cheerz", location:{lat:2,lng:2}, listId: 3},
        {content:"Noon, c'est non", location:{lat:4,lng:9}, listId: 3}
      ];

      todo.bulkCreate(initData)
      .then(function() {
        return todo.findAll();
      }).then(function(todos) {
        console.log(todos)
      })
  });

};
