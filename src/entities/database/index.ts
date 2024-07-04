import {createEffect, createEvent, createStore, sample} from "effector";
import {IDatabase} from "@shared/model/database";
import {getDatabase} from "@shared/api/database";

export const addDatabase = createEvent<void>();
export const selectDatabase = createEvent<IDatabase>();

export const addDatabaseFx = createEffect<void, IDatabase, Error>(() => {
    return getDatabase();
});

export const $databases = createStore<IDatabase[]>([])
    .on(addDatabaseFx.doneData, (state, payload) => [...state, payload]);

export const $selectedDatabase = createStore<IDatabase>(null)
    .on(selectDatabase, (state, payload) => payload);

sample({
    clock: addDatabase,
    target: addDatabaseFx
});