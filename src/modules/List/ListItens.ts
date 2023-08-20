import { UseCase } from "../../Core/Interfaces/IUseCase";
import { IMemory } from "../../Infra/services/Memory/IMemory";

export class ListItens implements UseCase {
	constructor(private memory: IMemory) { }

	async execute() {
		const values = await this.memory.list();
		const items: { id: number, descricao: string }[] = [];

		for (const key of values) {
			const descricao = await this.memory.get(key);
			const id = key.split(':')[1];

			if (id !== 'id') {
				items.push({ id: parseInt(id), descricao });
				console.log(`${id} - ${descricao}`);
			}
		}

		return values;
	}
}