import { fork, allSettled } from 'effector';
import { addDataset,fetchDatasetFx,$dataset} from "../../entities/dataset/index";
import {IDataset} from "../../shared/model/dataset"
import { getDataset } from '../../shared/api/dataset';

jest.mock('../../shared/api/dataset', () => ({
    getDataset: jest.fn(),

}));

const mockedDataset: IDataset = {
    columns: ['Region', 'Country'],
    rows: [
        ['Europe', 'England'],
        ['Asia', 'Singapore'],
        ['South America', 'Brazil']
    ]
};

const mockedDataset2: IDataset  = ({
    columns: ['Name', 'Value'],
    rows: [
        ['Sales', `1000`],
        ['Quantity', `1000`],
        ['Profit', `1000`]
    ]
});

describe('getDataset', () => {
    afterEach( () => {
            jest.resetAllMocks()
        })
    test('Mock getDataset function and check value truth', async () => {
        (getDataset as jest.Mock).mockImplementation((dbName: string) => {
            if (dbName === 'Database1') {
                return Promise.resolve(mockedDataset);
            }else{
                return Promise.resolve(mockedDataset2);
            }
                
        });
    
        const result  = await getDataset("Database1");
        // console.log("TEST =>  ")
        // console.log("Value: " + JSON.stringify(result, null, 2));
        // const dataset = scope.getState($dataset);
        expect(result).toEqual(mockedDataset);
    });    
    test('Use mocked fuction by effector and check value truth', async () => {
        (getDataset as jest.Mock).mockImplementation((dbName: string) => {
            if (dbName === 'Database1') {
                return Promise.resolve(mockedDataset);
            }else{
                return Promise.resolve(mockedDataset2);
            }
        });
        const scope = fork();

        const result  = await allSettled(fetchDatasetFx, {
            scope,
            params: 'Database1'
        });
        const result2  = await allSettled(fetchDatasetFx, {
            scope,
            params: 'Database'
        });
        // const dataset = scope.getState($dataset);
        // console.log("TEST 2 =>  ")
        // console.log("Status: " + result.status);
        // console.log("Status2: " + result2.status);
        // console.log("Value: " + JSON.stringify(result.value, null, 2));
        // console.log("Value2: " + JSON.stringify(result2.value, null, 2));
        // console.log("$dataset store => " + JSON.stringify(dataset,null,2));
        expect(result.status).toBe('done');
        expect(result2.status).toBe('done');
        expect(result.value).toEqual(mockedDataset);
        expect(result2.value).toEqual(mockedDataset2);
    });
    test('Add dataset to store using addDatase event', async () => {
        (getDataset as jest.Mock).mockImplementation((dbName: string) => {
            if (dbName === 'Database1') {
                return Promise.resolve(mockedDataset);
            } else {
                return Promise.resolve(mockedDataset2);
            }
        });

        const scope = fork();

        await allSettled(addDataset, {
            scope,
            params: 'NewDataset'
        });
        // console.log("TEST 3 =>  ")
        const dataset = scope.getState($dataset);
        // console.log("$dataset store => " + JSON.stringify(dataset,null,2));
        expect(dataset).toEqual(mockedDataset2);
    });
    
});