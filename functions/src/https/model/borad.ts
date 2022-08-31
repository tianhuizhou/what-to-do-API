/*
 * Board Schema for Database
 *
 * */
class Board implements BoardModel {
  readonly id: string
  name: string
  theme: string
  tasks: TaskModel[]

  constructor(args: BoardModel) {
    this.id = args.id || ''
    this.name = args.name || ''
    this.theme = args.theme || ''
    this.tasks = args.tasks || []
  }
}

module.exports = Board
