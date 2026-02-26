import type { Scope } from "intentx-core-z";
import { IntentBus } from "../core/intentBus";
import type { LogicFactory } from "./types";
type LogicMap = Record<string, LogicFactory<any, any, any>>;
type AppResponse<M extends LogicMap> = {
    scope: Scope;
    bus: IntentBus<any>;
    logics: {
        [K in keyof M]: ReturnType<M[K]["create"]>;
    };
};
export declare function createApp<M extends LogicMap>(config: {
    name?: string;
    logics: M;
}): AppResponse<M>;
export {};
