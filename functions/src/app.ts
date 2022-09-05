// import * as functions from "firebase-functions";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')

const admin = require('firebase-admin')
admin.initializeApp()

// const auth_middleware = require('./middleware/auth_firebase')

const app = express()

// middleware
app.use(cors())
app.use(express.json())
// app.use(auth_middleware)
// import routes

const usersRouter = require('./firestore-resetful-api/route/user')
// const tasksRouter = require('./route/tasks');

// Setup to routes
app.use('/users', usersRouter)
// app.use('/tasks', tasksRouter);

// export to Firebase Functions

// RESTful API
export const api = functions.https.onRequest(app)

// Firestore function events
exports.ProjectCollection = require('./firestore-lifecycle/project_collection')
exports.UserCollection = require('./firestore-lifecycle/user_collection')
