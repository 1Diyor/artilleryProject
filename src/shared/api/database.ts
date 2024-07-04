import {IDatabase} from "../model/database";

let dbIndex = 1;

export const getDatabase = (): Promise<IDatabase> => {
    return Promise.resolve({name: `Database${dbIndex++}`});
}