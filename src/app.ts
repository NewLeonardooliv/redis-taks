import { RedisMemory } from "./Infra/services/Memory/RedisMemory";
import { AddItem } from "./modules/List/AddItem";
import { ClearItens } from "./modules/List/ClearItens";
import { ListItens } from "./modules/List/ListItens";
import { RemoveItem } from "./modules/List/RemoveItem";
import { MainMenu } from "./modules/Menu/MainMenu";

const redis = new RedisMemory();
const menu = new MainMenu(
    new AddItem(redis),
    new ListItens(redis),
    new ClearItens(redis),
    new RemoveItem(redis),
);

menu.execute();