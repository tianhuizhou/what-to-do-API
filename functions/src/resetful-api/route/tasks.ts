import { Request, Response } from 'express'
// eslint-disable-next-line new-cap
const task_router = require('express').Router()
const TaskService = require('../service/task_service')

/* GET */
// Get all tasks
task_router.route('/').get(async (req: Request, res: Response) => {
  const task_list = await TaskService.getTaskList()
  res.status(200).json({ 'data': task_list })
})

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

// move task between board
task_router.route('/move/:id').put(async (req: Request, res: Response) => {
  const task_id: number = parseInt(req.params.id)
  await TaskService.moveTask(task_id, req.body)
  res.status(201).json({ 'msg': 'Moved successfully' })
})

// Task assignment/unassignment
task_router.route('/assign/:id').put(async (req: Request, res: Response) => {
  const task_id: number = parseInt(req.params.id)
  await TaskService.assignTaskToUser(task_id, req.body)
  res.status(201).json({ 'msg': 'Assign user successfully' })
})

task_router.route('/unassign/:id').put(async (req: Request, res: Response) => {
  const task_id: number = parseInt(req.params.id)
  await TaskService.unassignTaskFromUser(task_id, req.body)
  res.status(201).json({ 'msg': 'Unassign user successfully' })
})

/* DELETE */
// Delete task
task_router.route('/:id').delete(async (req: Request, res: Response) => {
  const task_id: number = parseInt(req.params.id)
  await TaskService.deleteTask(task_id)
  res.status(204).json({ 'msg': 'Delete successfully' })
})

module.exports = task_router
