var tableModel_obj = require('../models/TableModel')
var tableModel = new tableModel_obj();
var utils = require('../utils/utils')

// Create a table for new date
exports.createTable = async (req, res) => {

    if (typeof req.body.user === 'undefined'){
        var err = {
            message: "Invalid credentials provided, please provide users to create table."
        }
        return res.send(utils.formatErrorResponce(err));
    }

    req.body.user.forEach(element => {
        if(typeof element.id === "undefined" || typeof element.name === "undefined"){
            var err = {
                message: "Invalid credentials provided, please provide users to create table."
            }
            return res.send(utils.formatErrorResponce(err));
        }  
    });

    let table = await tableModel.createTable(req.body);
    return res.send(utils.formatErrorResponce(table.error, table.result));  
};

exports.createGame = async (req, res) => {

    if (typeof req.body.users === 'undefined' || typeof req.body.id === 'undefined' 
    || typeof req.body.name === 'undefined' || typeof req.body.day === 'undefined' ){
        var err = {
            message: "Invalid credentials provided, please provide users, id, day and name to add game."
        }
        return res.send(utils.formatErrorResponce(err));
    }

    req.body.users.forEach(element => {
        if(typeof element.id === "undefined" || typeof element.name === "undefined" || typeof element.points === "undefined"){
            var err = {
                message: "Invalid credentials provided, please provide valid users data to create game."
            }
            return res.send(utils.formatErrorResponce(err));
        }  
    });

    let table = await tableModel.createGame(req.body);
    return res.send(utils.formatErrorResponce(table.error, table.result));  
};

exports.updateGame = async (req, res) => {

    if (typeof req.body.users === 'undefined' || typeof req.body.id === 'undefined' 
    || typeof req.body.name === 'undefined' || typeof req.body.day === 'undefined' ){
        var err = {
            message: "Invalid credentials provided, please provide users, id, day, _id and name to add game."
        }
        return res.send(utils.formatErrorResponce(err));
    }

    req.body.users.forEach(element => {
        if(typeof element.id === "undefined" || typeof element.name === "undefined" || typeof element.points === "undefined"){
            var err = {
                message: "Invalid credentials provided, please provide valid users data to create game."
            }
            return res.send(utils.formatErrorResponce(err));
        }  
    });

    let table = await tableModel.updateGame(req.body);
    return res.send(utils.formatErrorResponce(table.error, table.result));  
};

exports.getTables = async (req, res) => {
    var tables = await tableModel.getTables();
    if (tables.error) {
        return res.send(utils.formatErrorResponce(tables.error, null));
    }
    return res.send(utils.formatErrorResponce(null, tables.result));
};


exports.updateUser = async (req, res) => {

    if (typeof req.body.user === 'undefined' || typeof req.body.day === 'undefined'){
        var err = {
            message: "Invalid credentials provided, please provide users and day to update table."
        }
        return res.send(utils.formatErrorResponce(err));
    }

    req.body.user.forEach(element => {
        if(typeof element.id === "undefined" || typeof element.name === "undefined"){
            var err = {
                message: "Invalid credentials provided, please provide users to create table."
            }
            return res.send(utils.formatErrorResponce(err));
        }  
    });

    let table = await tableModel.updateUser(req.body);
    return res.send(utils.formatErrorResponce(table.error, table.result));  
};

