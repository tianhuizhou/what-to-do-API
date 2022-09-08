/**
 * Project Schema for Database
 *
 **/
class Project implements ProjectModel {
  readonly id?: number
  name: string
  visibility: string
  description?: string
  boards: BoardModel[]
  users: UserModel[]

  constructor(args: ProjectModel) {
    this.id = args.id
    this.name = args.name || ''
    this.visibility = args.visibility || 'public'
    this.description = args.description
    this.boards = args.boards || []
    this.users = args.users || []
  }
}

export { Project }
