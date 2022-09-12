import { Request, Response } from 'express'
// eslint-disable-next-line new-cap
const task_router = require('express').Router()
const TaskService = require('../service/task_service')

/* GET */
// Get task details by id
task_router.route('/:id').get(async (req: Request, res: Response) => {
  const task_id = parseInt(req.params.id)
  const task = await TaskService.getTask(task_id)
  res.status(200).json({ 'data': task })
})

/* POST */
// Create task with board_id
task_router.route('/').post(async (req: Request, res: Response) => {
  const task = await TaskService.createTask(req.body)
  res.status(201).json({ 'data': task })
})

/* PUT */
// Update task
task_router.route('/:id').put(async (req: Request, res: Response) => {
  const task_id: number = parseInt(req.params.id)
  const task = await TaskService.updateTask(task_id, req.body)
  res.status(201).json({ 'data': task })
})

/* DELETE */
// Delete task
task_router.route('/:id').delete(async (req: Request, res: Response) => {
  const task_id: number = parseInt(req.params.id)
  await TaskService.deleteTask(task_id)
  res.status(204).json({ 'msg': 'Delete successfully' })
})

module.exports = task_router
