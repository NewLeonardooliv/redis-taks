import { Redis } from "ioredis";
import { IMemory } from "./IMemory";

export class RedisMemory implements IMemory {
    private redis: Redis;
    constructor() {
        this.redis = new Redis();
    }

    async add(item: string): Promise<void> {
        await this.redis.lpush('minhaLista', item);
    }

    async clear(): Promise<void> {
        await this.redis.del('minhaLista');
    }

    async list(): Promise<any> {
        const values = await this.redis.lrange('minhaLista', 0, -1);

        return values
    }
}