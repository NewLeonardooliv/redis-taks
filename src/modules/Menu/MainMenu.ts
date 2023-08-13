import { UseCase } from "../../Core/Interfaces/IUseCase";
import * as readline from 'readline';
import { AddItem } from "../List/AddItem";
import { ListItens } from "../List/ListItens";
import { ClearItens } from "../List/ClearItens";


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export class mainMenu implements UseCase {
    constructor(
        private readonly addItem: AddItem,
        private readonly listItens: ListItens,
        private readonly clearItens: ClearItens,
    ) { }

    async execute() {
        console.log('------ Bem-vindo! ------');
        console.log('\n--- Menu Principal ---');
        console.log('1. Adicionar item à lista');
        console.log('2. Listar itens da lista');
        console.log('3. Apagar a lista');
        console.log('4. Sair');

        rl.question('Escolha uma opção: ', async (choice) => {
            switch (choice) {
                case '1':
                    rl.question('Digite o item a ser adicionado à lista: ', async (item) => {
                        await this.addItem.execute(item);
                        console.log(`Item "${item}" adicionado à lista.`);
                        this.execute();
                    });
                    break;
                case '2':
                    const values = await this.listItens.execute();
                    console.log('Itens da lista:', values);
                    this.execute();
                    break;
                case '3':
                    this.clearItens.execute();
                    console.log('Lista apagada.');
                    this.execute();
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