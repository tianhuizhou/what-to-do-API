import { Request, Response } from 'express'
// eslint-disable-next-line new-cap
const tag_router = require('express').Router()
const TagService = require('../service/tag_service')

/* GET */
// Get all tags
tag_router.route('/').get(async (req: Request, res: Response) => {
  const name_query = req.query?.name ?? ''
  const tag_list = await TagService.getTagList(String(name_query))
  res.status(200).json({ 'data': tag_list })
})

// Get tag by id
tag_router.route('/:id').get(async (req: Request, res: Response) => {
  const tag_id = parseInt(req.params.id)
  const tag = await TagService.getTag(tag_id)
  res.status(200).json({ 'data': tag })
})

/* POST */
tag_router.route('/').post(async (req: Request, res: Response) => {
  const tag = await TagService.createTag(req.body)
  res.status(201).json({ 'data': tag })
})

/* PUT */
// Update tag information
tag_router.route('/:id').put(async (req: Request, res: Response) => {
  const tag_id = parseInt(req.params.id)
  const tag = await TagService.updateTag(tag_id, req.body)
  res.status(201).json({ 'data': tag })
})

/* DELETE */
// Delete tag
tag_router.route('/:id').delete(async (req: Request, res: Response) => {
  const tag_id = parseInt(req.params.id)
  await TagService.deleteTag(tag_id)
  res.status(204).json({ 'msg': 'Delete successfully' })
})

module.exports = tag_router
