import { UseCase } from "../../Core/Interfaces/IUseCase";
import { IMemory } from "../../Infra/services/Memory/IMemory";

export class AddItem implements UseCase {
    constructor(private memory: IMemory) { }

    async execute(item: string): Promise<void> {
        await this.memory.add(item);
    }
}