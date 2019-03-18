const express = require('express');
const axios = require('axios');
const cmd = require('node-cmd');

const app = express();
let router = express.Router();


const port = 3001;

axios.get('http://localhost:3000/api/v1/health').then(data =>{
    if(data.data.status != 'UP'){
        console.log('UP');
    }
})


cmd.get(
    `cd ..
     cd server
      node index.js
     `,
    function(err, data, stderr){
        console.log('the current working dir is : ',data)
    }
);




app.listen(port, () => console.log(`Listening on port ${port}...`));