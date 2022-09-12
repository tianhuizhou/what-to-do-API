import { DatabaseConnection } from '../../config/database_connection'

const prisma = DatabaseConnection.getInstance().get_prisma

class BoardRepository {
  static async create(board: { name: string; theme: string; project_id: number }) {
    return await prisma.board.create({
      data: {
        name: board.name,
        theme: board.theme,
        project: {
          connect: {
            id: board.project_id,
          },
        },
      },
    })
  }
  static async update(board_id: number, args: Partial<{ name: string; theme: string; project_id: number }>) {
    return await prisma.board.update({
      data: {
        ...args,
      },
      where: {
        id: board_id,
      },
    })
  }
  static async delete(board_id: number) {
    await prisma.board.delete({
      where: {
        id: board_id,
      },
    })
  }
}

module.exports = BoardRepository
