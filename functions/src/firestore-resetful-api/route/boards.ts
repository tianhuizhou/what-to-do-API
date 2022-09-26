import { Request, Response } from 'express'
// eslint-disable-next-line new-cap
const board_router = require('express').Router()
const BoardService = require('../service/board_service')

/* GET */
// Get all board
board_router.route('/').get(async (req: Request, res: Response) => {
  const board_list = await BoardService.getBoardList()
  res.status(200).json({ 'data': board_list })
})

board_router.route('/:id').get(async (req: Request, res: Response) => {
  const board_id: number = parseInt(req.params.id)
  const board = await BoardService.getBoard(board_id)
  res.status(200).json({ 'data': board })
})

/* POST */
// Create board
board_router.route('/').post(async (req: Request, res: Response) => {
  const board = await BoardService.createBoard(req.body)
  res.status(201).json({ 'data': board })
})

/* PUT */
// Update board
board_router.route('/:id').put(async (req: Request, res: Response) => {
  const board_id: number = parseInt(req.params.id)
  const board = await BoardService.updateBoard(board_id, req.body)
  res.status(201).json({ 'data': board })
})

/* DELETE */
// Delete board
board_router.route('/:id').delete(async (req: Request, res: Response) => {
  const board_id: number = parseInt(req.params.id)
  await BoardService.deleteBoard(board_id)
  res.status(204).json({ 'msg': 'Delete successfully' })
})

module.exports = board_router
