import type { Scope } from "intentx-core-z";
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
export type ComputedDef<S> = Record<string, (context: {
    state: Readonly<S>;
}) => any>;
export type InferComputed<C> = {
    [K in keyof C]: C[K] extends (...args: any[]) => infer R ? R : never;
};
export type LogicApi<S extends object, C, A> = {
    runtime: any;
    state: Readonly<S & InferComputed<C>>;
    computed: Readonly<InferComputed<C>>;
    actions: A;
    emit: (intent: string, payload?: any) => Promise<void>;
};
