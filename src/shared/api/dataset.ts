import {IDataset} from "../model/dataset";

export const getDataset = (dbName: string): Promise<IDataset> => {
    if (dbName === 'Database1') {
        return Promise.resolve({
            columns: ['Region', 'Country'],
            rows: [['Europe', 'England'], ['Asia', 'Singapore'], ['South America', 'Brazil']]
        });
    }

    const value = dbName.replace('Database', '');

    return Promise.resolve({
        columns: ['Name', 'Value'],
        rows: [['Sales', `${value}000`], ['Quantity', `${value}000`], ['Profit', `${value}000`]]
    });
}