/*
 * Task Schema for Database
 *
 * */
class Task implements TaskModel {
  readonly id: string
  name: string
  priority: string
  description: string

  constructor(args: TaskModel) {
    this.id = args.id || ''
    this.name = args.name || ''
    this.priority = args.priority || ''
    this.description = args.description || ''
  }
}

module.exports = Task
