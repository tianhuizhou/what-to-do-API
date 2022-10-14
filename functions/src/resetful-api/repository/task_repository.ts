import { DatabaseConnection } from '../../config/database_connection'

const prisma = DatabaseConnection.getInstance().get_prisma

class TaskRepository {
  static async findAll() {
    return await prisma.task.findMany({})
  }

  static async findById(task_id: number) {
    return await prisma.task.findUnique({
      where: {
        id: task_id,
      },
      include: {
        board: true,
        tags: {
          select: { tag: true },
        },
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            photo_b64: true,
          },
        },
      },
    })
  }

  static async create(task: {
    name: string
    priority?: string
    description: string
    board_id: number
    estimated_time: string
    due_date: string
  }) {
    return await prisma.task.create({
      data: {
        name: task.name,
        priority: task.priority,
        description: task.description,
        estimated_time: task.estimated_time,
        due_date: task.due_date,
        board: {
          connect: { id: task.board_id },
        },
      },
      include: {
        board: true,
      },
    })
  }

  static async update(
    task_id: number,
    args: Partial<{ name: string; priority: string; description: string; board_id: number }>,
  ) {
    return await prisma.task.update({
      data: {
        ...args,
      },
      where: {
        id: task_id,
      },
      include: {
        board: true,
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

  static async assignTask(id: number, user_id: number) {
    return await prisma.task.update({
      data: {
        users: {
          connect: [{ 'id': user_id }],
        },
      },
      where: { id: id },
      include: { board: true },
    })
  }

  static async unassignTask(id: number, user_id: number) {
    return await prisma.task.update({
      data: {
        users: {
          disconnect: { 'id': user_id },
        },
      },
      where: { id: id },
      include: { board: true },
    })
  }
}

module.exports = TaskRepository
