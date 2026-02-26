import type { Timeline } from "./timeline";
type RuntimeLike = {
    scope: {
        name: string;
    } | string;
    emit(intent: string, payload?: any): Promise<void>;
    getSnapshot?: () => any;
    state?: () => any;
};
export type Devtools = {
    timeline: Timeline;
    wrap(): void;
};
export declare function attachDevtools(target: RuntimeLike, scopeName?: string): Devtools;
export {};
