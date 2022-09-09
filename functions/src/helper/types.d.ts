/* Global Interface */
declare interface ProjectModel {
  id?: number
  name: string
  visibility?: string
  description?: string
  favorite?: boolean
  boards?: BoardModel[]
}

declare interface BoardModel {
  id?: number
  name: string
  theme?: string
  tasks: TaskModel[]
}

declare interface TaskModel {
  id?: number
  name: string
  priority?: string
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

declare interface ErrorException {
  msg?: string
  status?: number
}
