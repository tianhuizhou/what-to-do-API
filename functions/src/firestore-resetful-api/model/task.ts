/*
 * Task Schema for Database
 *
 * */
class Task implements TaskModel {
  readonly id?: number
  name: string
  priority: string
  description?: string

  constructor(args: Partial<TaskModel>) {
    this.id = args.id
    this.name = args.name || ''
    this.priority = args.priority || ''
    this.description = args.description
  }
}

module.exports = Task
