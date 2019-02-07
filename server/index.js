'use strict';

const Sequelize = require('sequelize');
const UserModel = require('./models/user');
let db = require('./configs/db');
let config = require('./configs/config');
const express = require('express')
const app = express()


const sequelize = new Sequelize(db.database, db.username, db.password, db);

const User = UserModel(sequelize, Sequelize);

User.findAll().then(users => {
  console.log(users);
})


// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`))


// let connection = mysql.createConnection(config);
 
// // insert statment
// let sql = `INSERT INTO User
//             VALUES('7', 'password', 'admin', 'smith', 'admin@gmail.com', 'admin')`;
             
//              // execute the insert statment
//              connection.query(sql);
              
//               connection.end();
