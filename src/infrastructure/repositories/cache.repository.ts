import NodeCache from 'node-cache';
import { ICache } from '../../enterprise/repositories/cache.repository';

export class NodeCacheService implements ICache {
  private cache: NodeCache;

  constructor() {
    // Time to live (TTL) em segundos - 600 segundos = 10 minutos
    this.cache = new NodeCache({ stdTTL: 600 });
  }

  set<T>(key: string, value: T, ttl: number = 600): void {
    this.cache.set(key, value, ttl);
  }

  get<T>(key: string): T | null {
    const cachedData = this.cache.get<T>(key);
    return cachedData || null;
  }
}
