export class Url {
    constructor(
      public id: string,
      public completeUrl: string,
      public clicks: number | null,
      public userId: string,
      public createdAt: Date,
      public updatedAt: Date,
      public deletedAt?: Date | null
    ) {}
  }
  