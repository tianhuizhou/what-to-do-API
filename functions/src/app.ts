// import * as functions from "firebase-functions";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')

const admin = require('firebase-admin')
admin.initializeApp()

const auth_middleware = require('./middleware/auth_firebase')

const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(auth_middleware)

// import routes
// const usersRouter = require('./route/users');
// const tasksRouter = require('./route/tasks');

// Setup to routes
// app.use('/users', usersRouter);
// app.use('/tasks', tasksRouter);

// export to Firebase Functions

// RESTful API
// export const api = functions.https.onRequest(app)

// Firestore function events
export const recordUpdatedTime = functions.firestore
  .document('/projects/{documentId}')
  .onUpdate((snap: any, context: any) => {
    console.log(snap)
    return Promise.resolve()
  })

export const helloWorld = functions.https.onRequest((request: any, response: any) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})
