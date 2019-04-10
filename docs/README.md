# EOP Tracking System
> Online Tracking System for SUNY New Paltz EOP department
> This system is used for EOP advisors to monitor their student's progression

The core features follow:
- EOP Advisors will be able to track their prospective students.
- Login System
- Node.js backend, Vue.js frontend.
- MongoDB database



## Table of Contents (Optional)

> If you're `README` has a lot of info, section headers might be nice.

- [Installation](#installation)




## Installation



- Backend
> Navigate to server folder

> npm install

> Must have a configs folder: Which contains db.js and config.js

> node index.js to start server

- Frontend
> Navigate to client folder

> Run npm install

> Must have configs folder: Which contains dev.config.js

> Run npm run build to generate dist production folder

> A small production express server is needed to serve the dist folder

> Create a folder called prod inside of the client folder

> Create a file called 'client.js' and paste the following code

<section>
const express = require('express');

path = require('path');

const history = require('connect-history-api-fallback')

server = express();

server.use(history();)


var port = 80;


server.use(express.static(path.join(__dirname, '/')));

server.listen(port);


</section>

> npm node 'client.js'
