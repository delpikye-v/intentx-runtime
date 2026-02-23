import { Scope } from "intentx-core-z";
import { LogicFactory } from "./createLogic";
import { IntentBus } from "../core/intentBus";
type LogicMap = Record<string, LogicFactory<any, any, any>>;
type AppReturn<M extends LogicMap> = {
    scope: Scope;
    bus: IntentBus<any>;
    logics: {
        [K in keyof M]: ReturnType<M[K]["create"]>;
    };
};
export declare function createApp<const M extends LogicMap>(config: {
    name?: string;
    logics: M;
}): AppReturn<M>;
export {};
