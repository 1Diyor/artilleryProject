import {createEffect, createEvent, createStore, sample} from "effector";
import {IProperty} from "@shared/model/property";
import {getProperties} from "@shared/api/property";

export const addProperties = createEvent<string>();
export const selectProperty = createEvent<IProperty>();



export const fetchPropertiesFx = createEffect<string, IProperty[], Error>((layerName: string) => {
    return getProperties(layerName);
});

export const $properties = createStore<IProperty[]>([])
    .on(fetchPropertiesFx.doneData, (state, payload) => [...state, ...payload]);

export const $selectedProperties = createStore<IProperty[]>([])
    .on(selectProperty, (state, payload) => {
        const foundProperty = state.find(prop => prop.name === payload.name);

        if (foundProperty) {
            return state.filter(prop => foundProperty.name !== prop.name);
        }

        return [...state, payload];
    });

sample({
    clock: addProperties,
    target: fetchPropertiesFx
});