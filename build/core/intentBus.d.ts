import type { IntentMiddleware } from "./middleware";
import type { EffectDef, EffectMode } from "./effect";
import type { IntentContext } from "./types";
export type IntentHandler<S, P = any> = (context: IntentContext<S, P>) => void | Promise<void>;
export declare class IntentBus<S> {
    private handlers;
    private effects;
    private middlewares;
    private effectModes;
    use: (mw: IntentMiddleware<S>) => void;
    setEffectMode: (type: string, mode: EffectMode) => void;
    effect: <P = any>(type: string, eff: EffectDef<S, P>) => void;
    on: <P = any>(type: string, handler: IntentHandler<S, P>) => (() => void);
    emit: (type: string, context: IntentContext<S>) => Promise<void>;
    clear: () => void;
}
export declare const createIntentBus: <S = any>() => IntentBus<S>;
