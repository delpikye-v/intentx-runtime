import type { Scope } from "intentx-state-z";
import { LogicRuntime } from "../core";
import type { ComputedDef, LogicApi } from "../core";
import { IntentBus } from "../core/intentBus";
export type LogicActions = Record<string, (...args: any[]) => any>;
export type LogicFactory<S extends object, C extends ComputedDef<S>, A extends LogicActions> = {
    name?: string;
    create(scope?: Scope, sharedBus?: IntentBus<any>): LogicRuntime<S, C, A>;
    createShareBus(scope: Scope, sharedBus: IntentBus<any>): LogicRuntime<S, C, A>;
    createIsolated(scope?: Scope): LogicRuntime<S, C, A>;
};
export type ExtractLogicTypes<T> = T extends LogicFactory<infer S, infer C, infer A> ? LogicApi<S, C, A> : never;
