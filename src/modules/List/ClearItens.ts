import { UseCase } from "../../Core/Interfaces/IUseCase";
import { IMemory } from "../../Infra/services/Memory/IMemory";

export class ClearItens implements UseCase {
    constructor(private memory: IMemory) { }

    async execute(): Promise<void> {
        await this.memory.clear();
    }
}