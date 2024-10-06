import NodeCache from 'node-cache';
import { ICache } from '../../enterprise/repositories/cache.repository';

export class NodeCacheService implements ICache {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({ stdTTL: 600 });
  }

  set<T>(key: string, value: T): void {
    this.cache.set(key, value, 600);
  }

  get<T>(key: string): T | null {
    const cachedData = this.cache.get<T>(key);
    return cachedData || null;
  }
}
