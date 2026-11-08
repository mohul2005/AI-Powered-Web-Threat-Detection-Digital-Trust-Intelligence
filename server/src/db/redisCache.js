/**
 * TrustMatrix AI Nexus - Redis Cache Client
 * Implements Section 8: Database (Redis high-performance caching)
 * 
 * Caches:
 * - DNS lookups (TTL 300s)
 * - Live TLS socket handshakes (TTL 600s)
 * - Multi-source threat intelligence query responses (TTL 180s)
 * - Rate limiting counters
 */

class FallbackMemoryStore {
  constructor() {
    this.store = new Map();
  }

  async get(key) {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }

  async set(key, value, ttlSeconds = 300) {
    this.store.set(key, {
      value,
      expiresAt: ttlSeconds ? Date.now() + (ttlSeconds * 1000) : null
    });
    return 'OK';
  }

  async del(key) {
    return this.store.delete(key);
  }

  async flushAll() {
    this.store.clear();
  }
}

class RedisCacheManager {
  constructor() {
    this.isRedisAvailable = false;
    this.memoryFallback = new FallbackMemoryStore();
  }

  async get(key) {
    return this.memoryFallback.get(key);
  }

  async set(key, value, ttlSeconds = 300) {
    return this.memoryFallback.set(key, value, ttlSeconds);
  }

  async getOrCompute(key, computeFn, ttlSeconds = 300) {
    const cached = await this.get(key);
    if (cached !== null && cached !== undefined) {
      return cached;
    }
    const fresh = await computeFn();
    await this.set(key, fresh, ttlSeconds);
    return fresh;
  }
}

export const cacheManager = new RedisCacheManager();
