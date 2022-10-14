import { DatabaseConnection } from '../../config/database_connection'

const prisma = DatabaseConnection.getInstance().get_prisma

class TagOnTaskRepository {
  static async create(tag_id: number, task_id: number) {
    return await prisma.tagsOnTasks.create({
      data: {
        task: {
          connect: { id: task_id },
        },
        tag: {
          connect: { id: tag_id },
        },
      },
    })
  }

  static async delete(tag_id: number, task_id: number) {
    return await prisma.tagsOnTasks.delete({
      where: {
        tag_id_task_id: { tag_id: tag_id, task_id: task_id },
      },
    })
  }

  static async deleteByTag(tag_id: number) {
    return await prisma.tagsOnTasks.deleteMany({
      where: {
        tag_id: tag_id,
      },
    })
  }

  static async deleteByTask(task_id: number) {
    return await prisma.tagsOnTasks.deleteMany({
      where: {
        task_id: task_id,
      },
    })
  }
}

module.exports = TagOnTaskRepository
