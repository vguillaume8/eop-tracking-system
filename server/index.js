'use strict';

const api = require('./api/api')();
const config = require('./configs/config');
let db = require('./configs/db');

api.create(config, db);
api.start();

//const Sequelize = require('sequelize');
// const UserModel = require('./models/user');


// const express = require('express')
// const app = express()


// const sequelize = new Sequelize(db.database, db.username, db.password, db);

// const User = UserModel(sequelize, Sequelize);

// User.findAll().then(users => {
//   console.log(users);
// })


