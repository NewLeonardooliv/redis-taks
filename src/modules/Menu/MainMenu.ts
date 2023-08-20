import { UseCase } from "../../Core/Interfaces/IUseCase";
import * as readline from 'readline';
import { AddItem } from "../List/AddItem";
import { ListItens } from "../List/ListItens";
import { ClearItens } from "../List/ClearItens";
import { RemoveItem } from "../List/RemoveItem";


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export class MainMenu implements UseCase {
    constructor(
        private readonly addItem: AddItem,
        private readonly listItens: ListItens,
        private readonly clearItens: ClearItens,
        private readonly removeItem: RemoveItem,
    ) { }

    async execute() {
        console.clear();
        console.log('------ Bem-vindo! ------');
        console.log('\n--- Menu Principal ---');
        console.log('1. Adicionar tarefa');
        console.log('2. Listar tarefas');
        console.log('3. Apagar tarefa');
        console.log('4. Sair');

        rl.question('Escolha uma opção: ', async (choice) => {
            switch (choice) {
                case '1':
                    console.clear();
                    rl.question('Digite o item a ser adicionado à lista: ', async (item) => {
                        await this.addItem.execute(item);
                        console.log(`Item "${item}" adicionado à lista.`);
                        this.execute();
                    });
                    break;
                case '2':
                    console.clear();
                    await this.listItens.execute();
                    console.log(`\nDigite qualquer tecla para voltar: \n`);
                    rl.question('', async (item) => {
                        this.execute();
                    });
                    break;
                case '3':
                    console.clear();
                    await this.listItens.execute();
                    rl.question('Digite o ID do item a ser removido da lista: ', async (item) => {
                        await this.removeItem.execute(item);
                        this.execute();
                    });

                    break;
                case '4':
                    rl.close();
                    break;
                default:
                    console.log('Opção inválida. Tente novamente.');
                    this.execute();
                    break;
            }
        });
    }
}