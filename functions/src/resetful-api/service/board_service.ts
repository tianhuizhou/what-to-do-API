/*
 * Board service: define all the services for endpoints
 */
import { BadRequestRestException, NotFoundRestException } from '../../helper/error_exceptions'
const pick = require('lodash/pick')
const BoardRepository = require('../repository/board_repository')
const ProjectService = require('./project_service')

class BoardService {
  static async getBoardList() {
    return await BoardRepository.findAll()
  }

  static async getBoard(id: number) {
    const board = await BoardRepository.findById(id)
    if (!board) throw new NotFoundRestException('Board')
    return board
  }

  static async createBoard(dto: { name: string; theme: string; project_id: number }) {
    const payload = pick(dto, ['name', 'theme', 'project_id'])
    const board = await BoardRepository.create(payload)
    if (!board) throw new BadRequestRestException('Board')

    // Add the board's id into board_order in the project
    const board_order: number[] = board.project.board_order
    board_order.push(board.id)
    await ProjectService.updateProject(board.project_id, { 'board_order': board_order })
    return board
  }

  static async updateBoard(id: number, dto: Partial<{ name: string; theme: string; task_order: number[] }>) {
    const payload = pick(dto, ['name', 'theme', 'task_order'])
    const board = await BoardRepository.update(id, payload)
    if (!board) throw new BadRequestRestException('Board')
    await ProjectService.upsertFirebaseProject(board.project_id).catch()
    return board
  }

  static async deleteBoard(id: number) {
    const board = await BoardService.getBoard(id)
    await BoardRepository.delete(id)

    // Delete the board's id from the board_order in the project
    const board_order: number[] = board.project.board_order
    const delete_item_idx = board_order.findIndex((item) => item == id)
    board_order.splice(delete_item_idx, 1)
    await ProjectService.updateProject(board.project_id, { 'board_order': board_order })
  }

  static async moveTaskBetweenBoards(dto: { 'from': number; 'to': number; 'task_id': number; 'pos': number }) {
    /* Specific for moving a task from Board A to Board B
     * If you are looking for moving around tasks within a single board, using updateBoard endpoint
     */
    // 1. Disconnect the Task from Board A and update task_order of Board A
    const from_board = await BoardService.getBoard(dto.from)
    const from_board_task_order: number[] = from_board.task_order
    const delete_item_idx = from_board_task_order.findIndex((item) => item == dto.task_id)
    if (delete_item_idx >= 0) from_board_task_order.splice(delete_item_idx, 1)
    const from_board_payload = { task_order: from_board_task_order }

    await BoardRepository.update(from_board.id, from_board_payload)

    // 2. Connect the Task to Board B and update task_order of Board B
    const to_board = await BoardService.getBoard(dto.to)
    const to_board_task_order: number[] = to_board.task_order
    to_board_task_order.splice(dto.pos, 0, dto.task_id)
    const to_board_payload = { task_order: to_board_task_order }

    await BoardRepository.update(to_board.id, to_board_payload)

    // to_board.project_id Should be the same as from_board.project_id
    await ProjectService.upsertFirebaseProject(to_board.project_id)
  }
}

module.exports = BoardService
