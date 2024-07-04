import {ILayer} from "../model/layer";

let layerIndex = 1;

export const getLayer = (): Promise<ILayer> => {
    return Promise.resolve({name: `Layer${layerIndex++}`});
}