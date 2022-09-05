/* Global Interface */
declare interface ProjectModel {
  id?: string
  name: string
  visibility: string
  description?: string
  favorite?: boolean
  boards: BoardModel[]
  users: UserModel[]
}

declare interface BoardModel {
  id?: string
  name: string
  theme?: string
  tasks: TaskModel[]
}

declare interface TaskModel {
  id?: string
  name: string
  priority: string
  description?: string
}

declare interface UserModel {
  uid?: string
  email: string
  name: string
}

declare interface FirestoreCollectionEvent {
  onCreate?: () => Promise<WriteResult>
  onUpdate?: () => Promise<WriteResult>
  onWrite?: () => void
  onDelete?: () => void
}
