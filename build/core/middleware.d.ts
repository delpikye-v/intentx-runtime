import { EffectDef, EffectMode } from "./effect";
import { IntentContext } from "./types";
export type IntentExecutionFrame<S> = {
    context: IntentContext<S>;
    effects: EffectDef<S, any>[];
    effectMode: EffectMode;
};
export type IntentMiddleware<S> = (next: (frame: IntentExecutionFrame<S>) => Promise<void>) => (frame: IntentExecutionFrame<S>) => Promise<void>;
export declare function applyMiddleware<S>(middlewares: IntentMiddleware<S>[], final: (frame: IntentExecutionFrame<S>) => Promise<void>): (frame: IntentExecutionFrame<S>) => Promise<void>;
