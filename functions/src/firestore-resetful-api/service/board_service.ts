/*
 * Board service: define all the services for endpoints
 */
import { BadRequestRestException } from '../../helper/error_exceptions'
const BoardRepository = require('../repository/board_repository')

class BoardService {
  static async createBoard(dto: { name: string; theme: string; project_id: number }) {
    const board = await BoardRepository.create(dto)
    if (!board) throw new BadRequestRestException('Board')
    return board
  }
  static async updateBoard(id: number, dto: Partial<{ name: string; theme: string; project_id: number }>) {
    const board = await BoardRepository.update(id, dto)
    if (!board) throw new BadRequestRestException('Board')
    return board
  }
  static async deleteBoard(id: number) {
    await BoardRepository.delete(id)
  }
}

module.exports = BoardService
