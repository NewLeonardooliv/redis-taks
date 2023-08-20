export interface IMemory {
    add(item: string): Promise<any>;
    clear(): Promise<void>;
    list(): Promise<any>;
    remove(id: string): Promise<void>;
    get(key: string): Promise<any>;
}