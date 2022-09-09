/**
 * Project Schema for Database
 *
 **/
class Project implements ProjectModel {
  readonly id?: number
  name: string
  visibility?: string
  description?: string
  favorite?: boolean
  boards?: BoardModel[]

  constructor(args: Partial<ProjectModel>) {
    this.id = args.id
    this.name = args.name || 'Random Project'
    this.visibility = args.visibility || 'public'
    this.description = args.description || ''
    this.favorite = args.favorite || false
    this.boards = args.boards
  }

  get sql_dto() {
    return {
      'name': this.name,
      'visibility': this.visibility,
      'description': this.description,
      'favorite': this.favorite,
    }
  }
}

export default Project
