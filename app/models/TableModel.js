var db = require('../../db');

var tableModel = function() {};

tableModel.prototype.createTable = async (data, callback) => {
  let err = {};
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;

  let tableData = {
    day: today,
    user: data.user
  };
  try {
    let flag = await db
      .get()
      .collection('rummy_tables')
      .findOne({ day: today });

    if (flag) {
      err.message = 'Table already exist, Use update table instead';
      return { error: err, table: null };
    }

    let result = await db
      .get()
      .collection('rummy_tables')
      .insertOne(tableData);

    return {
      error: null,
      result: { messsage: 'Table Created successfully.', result: result.ops[0] }
    };
  } catch (error) {
    console.log('TABLE CREATE ERROR......:  ', error);
    err.message = 'Unable to create table, Please try again';
    return { error: err, table: null };
  }
};

tableModel.prototype.updateUser = async (data, callback) => {
  try {
    var err = {};
    let result = await db
      .get()
      .collection('rummy_tables')
      .findOneAndUpdate(
        { day: data.day },
        { $set: { user: data.user } },
        { returnNewDocument: true }
      );

    return {
      error: null,
      result: result.value
    };
  } catch (error) {
    console.log('TABLE CREATE ERROR......:  ', error);
    err.message = 'Unable to update users, Please try again';
    return { error: err, table: null };
  }
};

tableModel.prototype.createGame = async (data, callback) => {
  try {
    var err = {};
    let result = await db
      .get()
      .collection('rummy_games')
      .insertOne(data);

    return {
      error: null,
      result: { message: 'game added successfully.', table: result.ops[0] }
    };
  } catch (error) {
    console.log('TABLE CREATE ERROR......:  ', error);
    err.message = 'Unable to create game, Please try again';
    return { error: err, table: null };
  }
};

tableModel.prototype.updateGame = async (data, callback) => {
  try {
    var err = {};
    let result = await db
      .get()
      .collection('rummy_games')
      .findOneAndUpdate(
        { id: data.id, day: data.day },
        { $set: { users: data.users } },
        { returnNewDocument: true, returnOriginal : false }
      );
    if (!result.value) {
      err.message = 'Unable to update game, No game exist with that id';
      return { error: err, table: null };
    }
    return {
      error: null,
      result: result.value
    };
  } catch (error) {
    console.log('TABLE CREATE ERROR......:  ', error);
    err.message = 'Unable to update game, Please try again';
    return { error: err, table: null };
  }
};

tableModel.prototype.getTables = async (data, callback) => {
  let err = {};
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;

  let games;
  let user;

  try {
    user = await db
      .get()
      .collection('rummy_tables')
      .find({ day: today })
      .toArray();
    games = await db
      .get()
      .collection('rummy_games')
      .find({ day: today })
      .toArray();
  } catch (error) {
    console.log('GET TABLES ERROR......:  ', error);
    err.message = 'Unable to show tables, Please try again';
    return {
      error: err,
      result: null
    };
  }

  return {
    error: null,
    result: { games: games, user: user }
  };
};

module.exports = tableModel;
