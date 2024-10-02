export class User {
  constructor(
    public id: string,
    public name: string | null,
    public email: string,
    public passwordHashed: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
