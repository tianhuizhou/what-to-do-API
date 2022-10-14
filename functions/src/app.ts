// Initiate Remote database connection
import 'express-async-errors'
import { DatabaseConnection } from './config/database_connection'
DatabaseConnection.getInstance()

const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')

const app = express()

const admin = require('firebase-admin')
admin.initializeApp()

// const cors_options = { allowedHeaders: ['Content-Type', 'Authorization'] }
app.use(cors())

app.use(express.json())

// Middleware
const auth_middleware = require('./middleware/auth_firebase')
if (process.env.FUNCTIONS_EMULATOR !== 'true') app.use(auth_middleware)

// Routes
const users_router = require('./resetful-api/route/users')
const projects_router = require('./resetful-api/route/projects')
const board_router = require('./resetful-api/route/boards')
const task_router = require('./resetful-api/route/tasks')
const tag_router = require('./resetful-api/route/tags')

app.use('/users', users_router)
app.use('/projects', projects_router)
app.use('/boards', board_router)
app.use('/tasks', task_router)
app.use('/tags', tag_router)

// Error handler middleware
const error_handler = require('./middleware/error_handler')
app.use(error_handler)

// export to Firebase Functions

// RESTful API
export const api = functions.https.onRequest(app)

// Firestore function events
exports.OAuthService = require('./firestore-lifecycle/oauth_service')
