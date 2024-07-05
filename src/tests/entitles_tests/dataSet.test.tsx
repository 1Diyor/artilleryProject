import { fork, allSettled } from 'effector';
import { addDataset,fetchDatasetFx,$dataset} from "../../entities/dataset/index";
import {IDataset} from "../../shared/model/dataset"
import { getDataset } from '@shared/api/dataset';

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
    it('should return the correct dataset for Database1', async () => {
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
        console.log("Status: " + result.status);
        console.log("Value: " + JSON.stringify(result.value, null, 2));
        console.log("$dataset" + scope.getState($dataset))
        // const dataset = scope.getState($dataset);
        expect(result.status).toBe('done');
        expect(result.value).toEqual(mockedDataset);
    });
    it('should return the correct dataset for anyDatabse', async () => {
        (getDataset as jest.Mock).mockImplementation((dbName: string) => {
            if (dbName === 'Database1') {
                return Promise.resolve(mockedDataset);
            }
            return Promise.resolve(mockedDataset2);
        });
        const scope = fork();

        const result  = await allSettled(fetchDatasetFx, {
            scope,
            params: 'Database'
        });
        console.log("Status: " + result.status);
        console.log("Value: " + JSON.stringify(result.value, null, 2));
        console.log("$dataset" + scope.getState($dataset))
        // const dataset = scope.getState($dataset);
        expect(result.status).toBe('done');
        expect(result.value).toEqual(mockedDataset2);
    });
    it('Add dataset to store using addDatase event', async () => {
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

        const dataset = scope.getState($dataset);
        console.log(JSON.stringify(dataset,null,2));
        expect(dataset).toEqual(mockedDataset2);
    });
    
});