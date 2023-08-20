import { UseCase } from "../../Core/Interfaces/IUseCase";
import { IMemory } from "../../Infra/services/Memory/IMemory";

export class RemoveItem implements UseCase {
    constructor(private memory: IMemory) { }

    async execute(id: string): Promise<void> {
        const key = `tarefa:${id}`;
        await this.memory.remove(key);
    }
}