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

> Move template/server/config folder to the root of the src/server folder

> Provide port number in config.js, provide MongoDB URI string in db.js as well as jwt secret 

> npm install

> Must have a configs folder: Which contains db.js and config.js

> node index.js to start server

- Frontend
> Navigate to client folder

> Move template/client/configs folder to src/client folder

> Run npm install

> Run npm run start to start development server


- Production
> Run npm run build to generate dist production folder

> A small production express server is needed to serve the dist folder

> Move template/prod folder to src/client folder

> Navigate to the folder and run npm install express

> Run node client.js to start production server

