import { Request, Response } from 'express'
// eslint-disable-next-line new-cap
const project_router = require('express').Router()
const ProjectService = require('../service/project_service')
/* GET */
// Get all project
// project_router.route('/').get((req: any, res: any) => {
//   res.status(200).json({ 'msg': 'yea' })
// })
//
// /* POST */
// // Upsert new project
// project_router.route('/').post((req: any, res: any) => {
//   res.status(200).json({ 'msg': 'yea' })
// })
//
// /* DELETE */
// // Delete project
// project_router.route('/').delete((req: any, res: any) => {
//   res.status(200).json({ 'msg': 'yea' })
// })
//
// module.exports = project_router
