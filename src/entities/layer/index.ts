import { createEvent, createStore, sample, createEffect } from "effector";
import { IViewLayer } from "@shared/model/layer";
import { getLayer } from "../../shared/api/layer";

export const addLayer = createEvent();
export const selectLayer = createEvent<IViewLayer>();
export const resetLayers = createEvent<IViewLayer[]>(); 



export const addLayerFx = createEffect<void, IViewLayer, Error>(async () => {
    const layer = await getLayer();
    const viewLayer: IViewLayer = {...layer, selected: false};

    return viewLayer;
});

export const $layers = createStore<IViewLayer[]>([])
    .on(addLayerFx.doneData, (state, payload) => [...state, payload])
    .on(selectLayer, (state, payload) => {
        return state.map(layer => {
            if (layer.name === payload.name) {
                return {...layer, selected: !layer.selected}
            }

            return layer;
        })
    })
    .on(resetLayers, (_, payload) => payload); 

export const $selectedLayers = $layers.map(layers =>
    layers.filter(layer => layer.selected)
);

sample({
    clock: addLayer, // har safar qachon addlayer event chaqirilganda addLayerFx effect ishlasin
    target: addLayerFx
});
