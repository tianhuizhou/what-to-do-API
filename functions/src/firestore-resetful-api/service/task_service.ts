/*
 * Task service: define all the services for endpoints
 */
import { BadRequestRestException, NotFoundRestException } from '../../helper/error_exceptions'
const TaskRepository = require('../repository/task_repository')

class TaskService {
  static async getTask(id: number) {
    const task = await TaskRepository.findById(id)
    if (!task) throw new NotFoundRestException('Task')
    return task
  }

  static async updateTask(
    id: number,
    dto: Partial<{ name: string; priority?: string; description: string; board_id: number }>,
  ) {
    const task = await TaskRepository.update(id, dto)
    if (!task) throw new BadRequestRestException('Task')
    return task
  }

  static async createTask(dto: { name: string; priority?: string; description: string; board_id: number }) {
    const task = await TaskRepository.create(dto)
    if (!task) throw new BadRequestRestException('Task')
    return task
  }

  static async deleteTask(id: number) {
    await TaskRepository.delete(id)
  }
}

module.exports = TaskService
