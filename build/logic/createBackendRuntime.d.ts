import { createIntentBus } from "intentx-core-z";
export type BackendContext<S> = {
    state: Readonly<S>;
    set(patch: Partial<S>): void;
    emit(intent: string, payload?: any): Promise<void>;
    signal: AbortSignal;
};
export type BackendIntent<S, P = any> = (context: BackendContext<S>, payload: P) => void | Promise<void>;
export type BackendIntents<S> = Record<string, BackendIntent<S, any>>;
export type BackendRuntime<S> = {
    state(): Readonly<S>;
    reset(): void;
    emit(intent: string, payload?: any): Promise<void>;
    registerIntents(intents: BackendIntents<S>): void;
    onIntent: ReturnType<typeof createIntentBus<S>>["on"];
    effect: ReturnType<typeof createIntentBus<S>>["effect"];
    onError(handler: (error: unknown, intent: string) => void): () => void;
    onBefore(fn: (intent: string, payload: any) => void): () => void;
    onAfter(fn: (intent: string, payload: any) => void): () => void;
    destroy(): void;
};
export declare function createBackendRuntime<S extends object>(initial: S): BackendRuntime<S>;
