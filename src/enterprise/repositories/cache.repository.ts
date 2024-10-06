export interface ICache {
    set<T>(key: string, value: T): void;
    get<T>(key: string): T | null;
  }
  
  export interface IguestUrlRegister {
    shortId: string
    completeUrl: string
    clicks: number
    createdAt: Date
    updatedAt: Date
  }
  