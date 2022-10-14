/* Global Interface */
declare interface ProjectModel {
  id: number
  name: string
  visibility?: string
  description?: string
  favorite?: boolean
  boards?: BoardModel[]
  session_uid?: string
}

declare interface BoardModel {
  id: number
  name: string
  theme?: string
  project_id: number
  tasks?: TaskModel[]
}

declare interface TaskModel {
  id: number
  name: string
  priority?: string
  description?: string
  board_id: number
}

declare interface UserModel {
  uid: string
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
