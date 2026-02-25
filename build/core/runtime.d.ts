import { Scope } from "intentx-core-z";
import { IntentBus } from "./intentBus";
import { EffectDef } from "./effect";
export type ComputedDef<S> = Record<string, (context: {
    state: Readonly<S>;
}) => any>;
export type InferComputed<C> = {
    [K in keyof C]: C[K] extends (...args: any[]) => infer R ? R : never;
};
export declare class LogicRuntime<S extends object, C extends ComputedDef<S>, A extends Record<string, any>> {
    readonly scope: Scope;
    private stateAtoms;
    private computedAtoms;
    private subs;
    private bus;
    private snapshotCache;
    private dirty;
    private isComputing;
    private isBatching;
    private destroyed;
    private computedKeys;
    private computedDisposers;
    private intentDisposers;
    private errorHandlers;
    private leadingLocks;
    private throttleMap;
    actions: A;
    constructor(initial: S, scope?: Scope, sharedBus?: IntentBus<any>);
    destroy: () => void;
    private createStateAtoms;
    private buildSnapshot;
    private markDirty;
    private createReactiveState;
    getSnapshot: () => Readonly<S & InferComputed<C>>;
    subscribe: (fn: () => void) => () => void;
    get state(): Readonly<S & InferComputed<C>>;
    get computed(): Readonly<InferComputed<C>>;
    batch: (fn: () => void) => void;
    onError: (handler: (error: unknown, context: {
        type: string;
        payload: any;
    }) => void) => () => boolean;
    getComputedKey: <K extends keyof InferComputed<C>>(key: K) => InferComputed<C>[K];
    getComputed: (snapshot: Readonly<S & InferComputed<C>>) => Readonly<InferComputed<C>>;
    private setStateInternal;
    onIntent: <P = any>(type: string, handler: (context: {
        payload: P;
        state: () => Readonly<S & InferComputed<C>>;
        scope: Scope;
        signal: AbortSignal;
        setState(fn: (draft: S) => void): void;
        emit<T = any>(type: string, payload?: T): Promise<void>;
    }) => any) => () => void;
    once: <P = any>(type: string, handler: Parameters<typeof this.onIntent>[1]) => void;
    takeLeading: <P = any>(type: string, handler: Parameters<typeof this.onIntent>[1]) => void;
    throttle: <P = any>(type: string, ms: number, handler: Parameters<typeof this.onIntent>[1]) => void;
    useEffect: <P = any>(type: string, eff: EffectDef<S, P>) => void;
    emit: <P = any>(type: string, payload?: P) => Promise<void>;
    attachComputed: <K extends keyof C & string>(key: K, compute: C[K]) => void;
}
