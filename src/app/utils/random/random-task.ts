import * as moment from "moment"
import { TaskModel } from "src/app/core/types/task/task.dto"

function randomNumber (max: number) {
  return Math.floor(Math.random() * max)
}
export const generateRandomTask = (): TaskModel => {
  return {
    key: randomNumber(10000000).toString().padStart(8, '0'),
    name:  `Task ${randomNumber(1000).toString().padStart(8, '0')}`,
    progress: randomNumber(100),
    title: `Title ${randomNumber(1000).toString().padStart(8, '0')}`,
    description: `Description ${ randomNumber(1000).toString().padStart(8, '0')}`,
    createdAt: moment().subtract(randomNumber(48),'hour').toDate().toISOString(),
    updatedAt: moment().subtract(randomNumber(36),'hour').toDate().toISOString(),
    dueDate: moment().add(randomNumber(48),'hour').format(),
  }
}