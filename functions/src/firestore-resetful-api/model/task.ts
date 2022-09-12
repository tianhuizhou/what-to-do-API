/*
 * Task Schema for Database
 *
 * */
class Task implements TaskModel {
  readonly id?: number
  name: string
  priority: string
  description?: string
  board_id: number

  constructor(args: Partial<TaskModel>) {
    this.id = args.id
    this.name = args.name || ''
    this.priority = args.priority || ''
    this.description = args.description
    this.board_id = args.board_id || 0
  }
}

module.exports = Task
