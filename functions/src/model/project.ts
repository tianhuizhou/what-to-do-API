import { v4 as uuid_v4 } from 'uuid'
/**
 * Project Schema for Database
 *
 **/
class Project implements ProjectModel {
  readonly id: string
  name: string
  visibility: string
  description: string
  boards: BoardModel[]
  users: UserModel[]

  constructor(args: ProjectModel) {
    this.id = args.id || uuid_v4()
    this.name = args.name || ''
    this.visibility = args.visibility || 'public'
    this.description = args.description || ''
    this.boards = args.boards || []
    this.users = args.users || []
  }
}

module.exports = Project
