import { BackendContext } from "../core/types";
export type BackendIntentMap = Record<string, any>;
export type BackendIntent<S, P> = (context: BackendContext<S>, payload: P) => void | Promise<void>;
export type BackendIntents<S, M extends BackendIntentMap> = {
    [K in keyof M]: BackendIntent<S, M[K]>;
};
export type BackendEffect<S, P> = (context: BackendContext<S>, payload: P) => void | Promise<void>;
export type BackendRuntime<S, M extends BackendIntentMap> = {
    state(): Readonly<S>;
    reset(): void;
    emit<K extends keyof M>(intent: K, payload: M[K]): Promise<void>;
    registerIntents(intents: BackendIntents<S, M>): void;
    effect<K extends keyof M>(intent: K, effect: BackendEffect<S, M[K]>): () => void;
    onError(handler: (error: unknown, intent: keyof M) => void): () => void;
    onBefore(fn: <K extends keyof M>(intent: K, payload: M[K]) => void): () => void;
    onAfter(fn: <K extends keyof M>(intent: K, payload: M[K]) => void): () => void;
    destroy(): void;
};
export declare function createBackendRuntime<S extends object, M extends BackendIntentMap>(initial: S): BackendRuntime<S, M>;
