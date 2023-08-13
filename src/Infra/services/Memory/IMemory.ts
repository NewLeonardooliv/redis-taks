export interface IMemory {
    add(item: string): Promise<any>;
    clear(): Promise<void>;
    list(): Promise<void>;
}