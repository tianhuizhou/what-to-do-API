// Initiate Remote database connection
import { DatabaseConnection } from './config/database_connection'
DatabaseConnection.getInstance()

const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')

const app = express()

const admin = require('firebase-admin')
admin.initializeApp()

app.use(cors())
app.use(express.json())

// middleware
const auth_middleware = require('./middleware/auth_firebase')
if (process.env.NODE_ENV !== 'development') app.use(auth_middleware)

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
