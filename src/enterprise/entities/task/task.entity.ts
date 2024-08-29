export class Task {
  id: string
  title: string
  finhesed: boolean
  userId: string

  constructor({
    id,
    title,
    finhesed,
    userId
  }: {
    id: string
    title: string
    finhesed: boolean
    userId: string
  }) {
    this.id = id
    this.title = title
    this.finhesed = finhesed
    this.userId = userId
  }
}
