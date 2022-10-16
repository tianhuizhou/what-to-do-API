/*
 * Task service: define all the services for endpoints
 */
import { BadRequestRestException, NotFoundRestException } from '../../helper/error_exceptions'
const TaskRepository = require('../repository/task_repository')
const BoardService = require('./board_service')
const ProjectService = require('./project_service')
const pick = require('lodash/pick')

class TaskService {
  static async getTaskList() {
    return await TaskRepository.findAll()
  }

  static async getTask(id: number) {
    const task = await TaskRepository.findById(id)
    if (!task) throw new NotFoundRestException('Task')
    return task
  }

  static async createTask(dto: {
    name: string
    priority?: string
    description: string
    board_id: number
    estimated_time: number
    due_date: string
  }) {
    const payload = pick(dto, ['name', 'priority', 'description', 'board_id', 'estimated_time', 'due_date'])
    const task = await TaskRepository.create(payload)
    if (!task) throw new BadRequestRestException('Task')

    // Add the task's id into task_order of the board
    const task_order: number[] = task.board.task_order
    task_order.push(task.id)
    await BoardService.updateBoard(task.board_id, { 'task_order': task_order })
    return task
  }

  static async updateTask(
    id: number,
    dto: Partial<{
      name: string
      priority: string
      description: string
      estimated_time: number
      due_date: string
      is_completed: boolean
      tags: [{ id: number }]
    }>,
  ) {
    const payload = pick(dto, ['name', 'priority', 'description', 'estimated_time', 'due_date', 'is_completed'])
    if (dto.tags) payload.tags = { set: dto.tags }
    const task = await TaskRepository.update(id, payload)
    if (!task) throw new BadRequestRestException('Task')
    await ProjectService.upsertFirebaseProject(task.board.project_id)
    return task
  }

  static async deleteTask(id: number) {
    const task = await TaskService.getTask(id)
    await TaskRepository.delete(id)

    // Delete the task's id from the task_order in the border
    const task_order: number[] = task.board.task_order
    const delete_item_idx = task_order.findIndex((item) => item == id)
    task_order.splice(delete_item_idx, 1)
    await BoardService.updateBoard(task.board_id, { 'task_order': task_order })
  }

  static async moveTask(id: number, dto: { old_board_id: number; new_board_id: number; new_board_position: number }) {
    const task = await TaskRepository.update(id, { board_id: dto.new_board_id })
    if (!task) throw new BadRequestRestException('Task')
    const payload = { 'from': dto.old_board_id, 'to': dto.new_board_id, 'task_id': id, 'pos': dto.new_board_position }
    await BoardService.moveTaskBetweenBoards(payload)
  }

  static async assignTaskToUser(id: number, dto: { user: number }) {
    const task = await TaskRepository.assignTask(id, dto.user)
    if (!task) throw new BadRequestRestException('Task')
    await ProjectService.upsertFirebaseProject(task.board.project_id)
    /* TODO: Also trigger Email notification for */
    return task
  }

  static async unassignTaskFromUser(id: number, dto: { user: number }) {
    const task = await TaskRepository.unassignTask(id, dto.user)
    if (!task) throw new BadRequestRestException('Task')
    await ProjectService.upsertFirebaseProject(task.board.project_id)
    return task
  }
}

module.exports = TaskService
