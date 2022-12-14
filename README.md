# what-to-do-API
An Express.js Serverless Backend API that integrate with Firebase, Prisma, Planetscale(MySQL).

Frontend(Project management system): <a> https://github.com/tianhuizhou/what-to-do </a>

<hr />

## Upcoming changes:
The current implementation end up with a poor efficiency, the major two problems are:

1. <strong>Cold start</strong>: Since the backend architecture is built on top of GCP cloud functions, there is a cold-start.
2. <strong>The average time of REST endpoints are too long</strong>: Some endpoints could be simplified by splitting their tasks and scheduling background workers to execute partial code asynchronously. So server can respond requests earlier to reduce the blocking time for users.

<strong>What I will do</strong>:

* I will start a new repository to refactor the project with new architecture(ex. WebSocket) to improve performance.
* Containerize the application by using Docker for a better DevOps experience.
* Migrating from GCP to AWS (Just my preference).

<hr />
### Tech stack:
* <strong> Node.js (Express.js) </strong>


* <strong> Firebase (Firestore, Functions, Hosting, OAuth) </strong>


* <strong> Firebase (Firestore, Functions) </strong>


* <strong> Plantscale (MySQL) </strong>


* <strong> Prisma </strong>


* <strong> Typescript </strong>


### Project Goals:

1. Implement RESTFul backend API to support data access for the project Task management system
    * Using Express.js to handle HTTP requests by following RESTFul API design
    * Using Typescript to handle Type-safety in development, and improve code readability and maintainability
    

2. Support Authentication and handle security for database and endpoints
    * Using OAuth for authentication and integrate with Firebase


3. Support Realtime features and data auto-sync between databases
    * Using Planetscale to provide MySQL Database as the Primary Database
    * Using Firestore database(NoSQL Realtime DB) as a Session Database to provide Realtime feature for Clients.
    * Sync data with the session database whenever data is written into the primary Database(MySQL) 


4. Database connection stabilization
    * Using Prisma as data proxy to handle Database connection for a better persistence
    * Using Prisma schema to setup ORM in development for a better code readability
    * Using Prisma to handle database migrations


5. Cloud hosting(Serverless)
    * Using Firebase Functions to implement Serverless
    * Using Planetscale to provide Cloud database

    
### Project setup
````
npm install
````

#### Environment variables
````
 DATABASE_URL= whatever_your_Planetscale_connection_is
````

See: <a> https://planetscale.com/docs </a>

<strong>Please make sure that you are already logged in Firebase Cli on your local machine</strong> <br/>

See: <a> https://firebase.google.com/docs </a>


#### Compiles for development
````
npm run serve
````

#### Deploy
````
npm run deploy
````
