export class Url {
    constructor(
      public id: string,
      public completeUrl: string,
      public shortId: string | null,
      public clicks: number,
      public userId: string,
      public createdAt: Date,
      public updatedAt: Date,
      public deletedAt?: Date | null
    ) {}
  }
  