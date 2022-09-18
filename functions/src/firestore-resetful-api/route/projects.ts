import { Request, Response } from 'express'
// eslint-disable-next-line new-cap
const project_router = require('express').Router()
const ProjectService = require('../service/project_service')

/* GET */
// Get all project
project_router.route('/').get(async (req: Request, res: Response) => {
  const project_list = await ProjectService.getProjectList()
  res.status(200).json({ 'data': project_list })
})

project_router.route('/:id').get(async (req: Request, res: Response) => {
  const project_id: number = parseInt(req.params.id)
  const project = await ProjectService.getProject(project_id)
  res.status(200).json({ 'data': project })
})

/* POST */
// Create new project
project_router.route('/').post(async (req: Request, res: Response) => {
  const project = await ProjectService.createProject(req.body)
  res.status(201).json({ 'data': project })
})

/* PUT */
// Update new project
project_router.route('/:id').put(async (req: Request, res: Response) => {
  const project_id: number = parseInt(req.params.id)
  const project = await ProjectService.updateProject(project_id, req.body)
  res.status(201).json({ 'data': project })
})

/* DELETE */
// Delete project
project_router.route('/:id').delete(async (req: Request, res: Response) => {
  const project_id: number = parseInt(req.params.id)
  await ProjectService.deleteProject(project_id)
  res.status(204).json({ 'msg': 'Delete successfully' })
})

module.exports = project_router
