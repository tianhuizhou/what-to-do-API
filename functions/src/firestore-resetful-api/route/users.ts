import { Request, Response } from 'express'
// eslint-disable-next-line new-cap
const user_router = require('express').Router()
const UserService = require('../service/user_service')

/* GET */
// Get all users
user_router.route('/').get(async (req: Request, res: Response) => {
  res.status(200).json({ 'data': await UserService.getUserList() })
})
user_router.route('/:id').get(async (req: Request, res: Response) => {
  const user_id: string = req.params.id
  res.status(200).json({ 'data': await UserService.getUserByUID(user_id) })
})

// /* PUT */
// Update user
user_router.route('/:id').put(async (req: Request, res: Response) => {
  const user_id: string = req.params.id
  res.status(201).json({ 'data': await UserService.updateUser(user_id, req.body) })
})

// /* DELETE */
// // Delete project
// user_router.route('/').delete(async (req: any, res: any) => {
//   res.status(200).json({ 'msg': 'yea' })
// })
//
module.exports = user_router
