import { EffectContext } from "./types";
export type EffectStrategy = "default" | "takeLatest" | "debounce";
export type EffectMode = "sequential" | "parallel" | "race" | "allSettled";
export type EffectHandler<S, P = unknown> = (context: EffectContext<S, P>) => void | Promise<void>;
export type EffectDef<S, P = any> = {
    _kind: "effect";
    id: symbol;
    handler: EffectHandler<S, P>;
    blocking?: boolean;
    strategy: EffectStrategy;
    wait?: number;
};
type EffectBuilder<S, P> = EffectDef<S, P> & {
    takeLatest(): EffectBuilder<S, P>;
    debounce(ms: number): EffectBuilder<S, P>;
    blocking(): EffectBuilder<S, P>;
};
export declare function effect<S, P = any>(fn: EffectHandler<S, P>): EffectBuilder<S, P>;
export {};
