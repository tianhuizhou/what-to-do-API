import { DatabaseConnection } from '../../config/database_connection'

const prisma = DatabaseConnection.getInstance().get_prisma

class TaskRepository {
  static async findById(task_id: number) {
    return await prisma.task.findUnique({
      where: {
        id: task_id,
      },
    })
  }

  static async create(task: { name: string; priority?: string; description: string; board_id: number }) {
    return await prisma.task.create({
      data: {
        name: task.name,
        priority: task.priority,
        description: task.description,
        board: {
          connect: {
            id: task.board_id,
          },
        },
      },
    })
  }

  static async update(
    task_id: number,
    args: Partial<{ name: string; priority?: string; description: string; board_id: number }>,
  ) {
    return await prisma.task.update({
      data: {
        ...args,
      },
      where: {
        id: task_id,
      },
    })
  }

  static async delete(task_id: number) {
    await prisma.task.delete({
      where: {
        id: task_id,
      },
    })
  }
}

module.exports = TaskRepository
