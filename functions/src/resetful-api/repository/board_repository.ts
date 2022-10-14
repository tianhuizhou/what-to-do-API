import { DatabaseConnection } from '../../config/database_connection'

const prisma = DatabaseConnection.getInstance().get_prisma

class BoardRepository {
  static async findAll() {
    return await prisma.board.findMany()
  }

  static async findById(id: number) {
    return await prisma.board.findUnique({
      where: {
        id: id,
      },
      include: {
        project: true,
        tasks: true,
      },
    })
  }

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
      include: {
        project: true,
      },
    })
  }
  static async update(id: number, args: Partial<{ name: string; theme: string; task_order: number[] }>) {
    return await prisma.board.update({
      data: {
        ...args,
      },
      where: {
        id: id,
      },
    })
  }

  static async delete(id: number) {
    await prisma.board.delete({
      where: {
        id: id,
      },
    })
  }
}

module.exports = BoardRepository
