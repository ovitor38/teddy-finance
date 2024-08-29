import { Task } from '../task/task.entity'

export class User {
  id: string
  name: string
  email: string
  passwordHashed: string
  tasks: Task[]

  constructor({
    id,
    name,
    email,
    passwordHashed,
    tasks
  }: {
    id: string
    name: string
    email: string
    passwordHashed: string
    tasks: Task[]
  }) {
    this.id = id
    this.name = name
    this.email = email
    this.passwordHashed = passwordHashed
    this.tasks = tasks
  }
}
