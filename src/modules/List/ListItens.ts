import { UseCase } from "../../Core/Interfaces/IUseCase";
import { IMemory } from "../../Infra/services/Memory/IMemory";

export class ListItens implements UseCase {
    constructor(private memory: IMemory) { }

    async execute() {
        const values = await this.memory.list();

        return values
    }
}