let mysql  = require('mysql');
let db = require('./configs/db');


const express = require('express')
const app = express()
const port = 10020

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


let connection = mysql.createConnection(config);
 
// insert statment
let sql = `INSERT INTO User
            VALUES('7', 'password', 'admin', 'smith', 'admin@gmail.com', 'admin')`;
             
             // execute the insert statment
             connection.query(sql);
              
              connection.end();
