import { fork, allSettled } from 'effector';
import { IDatabase } from '@shared/model/database';
import { getDatabase } from '../../shared/api/database';
import {addDatabase,selectDatabase,addDatabaseFx,$databases,$selectedDatabase} from '../../entities/database/index';

// Мок API
jest.mock('../../shared/api/database', () => ({
  getDatabase: jest.fn()
}));

describe('Effector Store with fork', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  
  test('addDatabaseFx effectini tekshirish', async () => {
    const mockDatabase: IDatabase = { name: 'Test Database' };  // mock yaratilyabdi
    (getDatabase as jest.Mock).mockResolvedValueOnce(mockDatabase); // getdatabase api ni jest Funksiyasi orqali mock qiymat bilan berib yuboriluabdi
 
    const scope = fork();  // izolatsiya qilingan kontekst elon qilyabmz
 
    await allSettled(addDatabaseFx, { scope }); // addDatabaseFx effectini yaratilgan kontekstga chaqirib shu yerda bajaryabdi

    const state = scope.getState($databases); 
    expect(state).toHaveLength(1);   // storeda qiymat ozgarganini tekshirish
    expect(state[0]).toEqual(mockDatabase);// stateni 0 elementi mockdatabase elementiga teng bolsa state togri ozgargan hisblanadi
  });

  test('selectDatabase should set selected database', async () => {
    const mockDatabase: IDatabase = { name: 'Selected Database' };

    const scope = fork();

    await allSettled(selectDatabase, { scope, params: mockDatabase });

    const selectedState = scope.getState($selectedDatabase);
    expect(selectedState).toEqual(mockDatabase);
  });

  test('addDatabase should trigger addDatabaseFx', async () => {
    const mockDatabase: IDatabase = { name: 'Triggered Database' };
    (getDatabase as jest.Mock).mockResolvedValueOnce(mockDatabase);

    const scope = fork();

    await allSettled(addDatabase, { scope });

    const state = scope.getState($databases);
    expect(state).toHaveLength(1);
    expect(state[0]).toEqual(mockDatabase);
  });
});
