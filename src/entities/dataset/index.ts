import {createEffect, createEvent, createStore, sample} from "effector";
import {IDataset} from "../../shared/model/dataset";
import {getDataset} from "../../shared/api/dataset";

export const addDataset = createEvent<string>();

export const fetchDatasetFx = createEffect<string, IDataset, Error>((dbName: string) => {
    return getDataset(dbName);
});

export const $dataset = createStore<IDataset>(null)
    .on(fetchDatasetFx.doneData, (state, payload) => payload);

sample({
    clock: addDataset,
    target: fetchDatasetFx
});