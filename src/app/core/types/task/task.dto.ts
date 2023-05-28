export interface TaskModel {
  key: string
  name: string
  progress: number
  title: string
  description: string
  compeletd: boolean
  createdAt: Date
  updatedAt: Date
  dueDate?: Date
}