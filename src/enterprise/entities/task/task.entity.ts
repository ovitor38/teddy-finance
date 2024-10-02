export class Task {
  id: string
  title: string
  finished: boolean
  userId: string

  constructor({
    id,
    title,
    finished,
    userId
  }: {
    id: string
    title: string
    finished: boolean
    userId: string
  }) {
    this.id = id
    this.title = title
    this.finished = finished
    this.userId = userId
  }
}
