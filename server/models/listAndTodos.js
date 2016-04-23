module.exports = (sequelize, DataTypes) => {

  // Defining lists model
  var List = sequelize.define('list',{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title:{
      type: DataTypes.STRING
    }
  });

  // Defining todos model
  var Todo = sequelize.define('todo',{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content:{
      type: DataTypes.STRING
    },
    location:{
      type: DataTypes.JSON
    }
  });

  // Binding tables
  List.hasMany(Todo);

  // Feed first data if creating brand new database: uncomment bellow to FEED
  // ----
  // require('./data/listsAndTodos')(List, Todo);
  // ----

    return {
      List,
      Todo
    };

};
