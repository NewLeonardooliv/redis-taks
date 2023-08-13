
export interface UseCase<T = any> {
    execute: (request: T) => Promise<T>
}