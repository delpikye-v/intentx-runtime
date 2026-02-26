import { LogicRuntime } from "../core/runtime";
import type { EffectDef } from "../core/effect";
import type { ComputedDef, InferComputed } from "../core";
import type { LogicFactory } from "./types";
export declare function createLogic<S extends object, C extends ComputedDef<S>, ActionsDef extends Record<string, (context: {
    emit: LogicRuntime<S, C, any>["emit"];
    getState: () => Readonly<S & InferComputed<C>>;
}) => (...args: any[]) => any>>(config: {
    name?: string;
    state: S;
    computed?: C;
    intents?: (bus: {
        on: LogicRuntime<S, C, any>["onIntent"];
        effect: (type: string, eff: EffectDef<S, any>) => void;
    }) => void;
    actions: ActionsDef;
}): LogicFactory<S, C, {
    [K in keyof ActionsDef]: ReturnType<ActionsDef[K]>;
}>;
