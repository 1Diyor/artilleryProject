import { fork, allSettled } from 'effector';
import { IDataset } from '@shared/model/dataset';
import { getDataset } from '../../shared/api/dataset';
import { addDataset, fetchDatasetFx, $dataset } from '../../entities/dataset';

// Мок API
jest.mock('../../shared/api/dataset', () => ({
  getDataset: jest.fn()
}));

describe('Dataset uchun tekshirish', () => {
  const mockGetDataset = getDataset as jest.MockedFunction<typeof getDataset>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetchDatasetFx datasetni update qilish kerak', async () => {
    const mockDataset: IDataset = {
      columns: ['Column1', 'Column2'],
      rows: [
        ['Row1Column1', 'Row1Column2'],
        ['Row2Column1', 'Row2Column2']
      ]
    };
    mockGetDataset.mockResolvedValueOnce(mockDataset);

    const scope = fork();

    // Effectni storeda izolatsiya qilish
    await allSettled(fetchDatasetFx, { scope, params: 'TestDB' });

    
    expect(scope.getState($dataset)).toEqual(mockDataset);
  });

  test('addDataset should trigger fetchDatasetFx', async () => {
    const mockDataset: IDataset = {
      columns: ['Column1', 'Column2'],
      rows: [
        ['Row1Column1', 'Row1Column2'],
        ['Row2Column1', 'Row2Column2']
      ]
    };
    mockGetDataset.mockResolvedValueOnce(mockDataset);

    const scope = fork();

    // izolatsiyalangan kontekstda vajarish
    await allSettled(addDataset, { scope, params: 'TestDB' });

    //  state izolatsiya bolgan scopeda ozgarga yo ozgarmaganini tekshirish
    expect(scope.getState($dataset)).toEqual(mockDataset);
  });
});
