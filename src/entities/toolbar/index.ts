import { createEvent, createStore } from "effector";
import { ToolbarAction } from "./types";

export const reshape = createEvent<void>();
export const annotate = createEvent<void>();
export const saveAll = createEvent<any>();
export const applyAction = createEvent<ToolbarAction>();

export const $toolbarReshape = createStore<boolean>(false)
    .on(reshape, (state, payload) => !state);
export const $toolbarAnnotate = createStore<boolean>(false)
    .on(annotate, (state, payload) => !state);

export const $toolbarAction = createStore<ToolbarAction>(null)
    .on(applyAction, (state, payload) => payload);



