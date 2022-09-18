import { Request, Response } from 'express'
// eslint-disable-next-line new-cap
const user_router = require('express').Router()
const UserService = require('../service/user_service')

/* GET */
// Get all users
user_router.route('/').get(async (req: Request, res: Response) => {
  res.status(200).json({ 'data': await UserService.find_all() })
})
user_router.route('/:id').get(async (req: Request, res: Response) => {
  const user_id: string = req.params.id
  res.status(200).json({ 'data': await UserService.find_by_id(user_id) })
})

// /* PUT */
// Update user
user_router.route('/:id').put(async (req: Request, res: Response) => {
  const user_id: string = req.params.id
  const body: Partial<UserModel> = req.body
  res.status(201).json({ 'data': await UserService.update(user_id, body) })
})

// /* DELETE */
// // Delete project
// user_router.route('/').delete(async (req: any, res: any) => {
//   res.status(200).json({ 'msg': 'yea' })
// })
//
module.exports = user_router
