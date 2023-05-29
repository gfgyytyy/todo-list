export interface TaskModel {
  key: string
  name: string
  progress: number
  title: string
  description: string
  createdAt: string
  updatedAt: string
  dueDate?: string
}