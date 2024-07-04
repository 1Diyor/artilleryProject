import {IProperty} from "../model/property";

export const getProperties = (layerName: string): Promise<IProperty[]> => {
    const value = layerName.replace('Layer', '');

    return Promise.resolve([
        {
            name: `Min(${layerName})`,
            value: value,
        },
        {
            name: `Max(${layerName})`,
            value: value,
        },
        {
            name: `Avg(${layerName})`,
            value: value,
        }
    ]);
}