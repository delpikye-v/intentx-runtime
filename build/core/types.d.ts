import { Scope } from "intentx-core-z";
export type IntentContext<S, P = unknown> = {
    payload: P;
    state(): Readonly<S>;
    scope: Scope;
    signal: AbortSignal;
    setState(fn: (draft: S) => void): void;
    emit<T = unknown>(type: string, payload?: T): Promise<void>;
};
export type EffectContext<S, P = unknown> = {
    payload: P;
    state(): Readonly<S>;
    scope: Scope;
    signal: AbortSignal;
    emit<T = unknown>(type: string, payload?: T): Promise<void>;
};
export type BackendContext<S> = {
    state(): Readonly<S>;
    set(patch: Partial<S>): void;
    signal: AbortSignal;
    emit<K extends string>(type: K, payload?: unknown): Promise<void>;
};
