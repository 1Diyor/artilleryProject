import {Event, Store} from "effector";
import {ACTIONS, ENTITIES} from "./constants";

export type Action = keyof typeof ACTIONS;
export type Entity = keyof typeof ENTITIES;

export type ActionPayload<T extends Action> = typeof ACTIONS[T] extends Event<infer P> ? P : never;
export type EntityPayload<T extends Entity> = typeof ENTITIES[T] extends Store<infer M> ? M : never;