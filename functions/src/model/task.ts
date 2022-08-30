import { v4 as uuid_v4 } from 'uuid'
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
    this.id = args.id || uuid_v4()
    this.name = args.name || ''
    this.priority = args.priority || ''
    this.description = args.description || ''
  }
}

module.exports = Task
