export type EffectStrategy = "default" | "takeLatest" | "debounce";
export type EffectHandler<S = any> = (context: S) => void | Promise<void>;
export type EffectDef<S = any> = {
    _kind: "effect";
    id: symbol;
    handler: EffectHandler<S>;
    strategy: EffectStrategy;
    wait: number;
};
export declare function effect<S = any>(fn: EffectHandler<S>): EffectDef<S> & {
    takeLatest(): EffectDef<S>;
    debounce(ms: number): EffectDef<S>;
};
