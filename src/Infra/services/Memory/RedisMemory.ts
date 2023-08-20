import { Redis } from "ioredis";
import { IMemory } from "./IMemory";

export class RedisMemory implements IMemory {
	private redis: Redis;
	constructor() {
		this.redis = new Redis();
	}

	async add(item: string): Promise<void> {
		const id = await this.incrAndGetId();
		const key = `tarefa:${id}`;
		this.redis.set(key, item);
	}

	async clear(): Promise<void> {
		await this.redis.del('minhaLista');
	}


	async remove(id: string): Promise<void> {
		this.redis.del(id);
	}

	async incrAndGetId(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.redis.get('tarefa:id', (err, id) => {
				const nextId = parseInt(id || '0', 10) + 1;
				this.redis.set('tarefa:id', nextId.toString(), (err) => {
					if (err) {
						reject(err);
					} else {
						resolve(nextId);
					}
				});
			});
		});
	}

	async list(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.redis.keys('tarefa:*', (err, keys) => {
				if (err) {
					reject(err);
				} else {
					resolve(keys);
				}
			});
		});
	}

	async get(key: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.redis.get(key, (err, descricao) => {
				if (err) {
					reject(err);
				} else {
					resolve(descricao);
				}
			});
		});
	}
}