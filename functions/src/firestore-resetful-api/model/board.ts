/*
 * Board Schema for Database
 *
 * */
class Board implements BoardModel {
  readonly id?: number
  name: string
  theme?: string
  project_id: number
  tasks?: TaskModel[]

  constructor(args: Partial<BoardModel>) {
    this.id = args.id
    this.name = args.name || 'Untitled Board'
    this.theme = args.theme || ''
    this.tasks = args.tasks
    this.project_id = args.project_id || 0
  }

  get sql_dto() {
    return {
      'name': this.name,
      'theme': this.theme,
    }
  }
}

module.exports = Board
