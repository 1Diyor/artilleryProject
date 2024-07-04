import { createEffect, createEvent, createStore, sample } from 'effector';
import { IProperty } from '@shared/model/property';
import { getProperties } from '../../shared/api/property';
import {addProperties,selectProperty,fetchPropertiesFx,resetLayers,$properties,$selectedProperties} from '../../entities/property/index'; 

// Мок API
jest.mock('../../shared/api/property', () => ({
  getProperties: jest.fn()
}));
const setInitialProperties = createEvent<IProperty[]>();
$properties.on(setInitialProperties, (_, payload) => payload);

describe('Effector Store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetLayers();
  });

  test('fetchPropertiesFx 1 ta property qoshishi kerak', async () => {
    const mockProperties: IProperty[] = [
      { name: 'Property 1', value: 'Value 1' },
      { name: 'Property 2', value: 'Value 2' }
    ];
    (getProperties as jest.Mock).mockResolvedValueOnce(mockProperties);

    addProperties('Layer 1');
    await fetchPropertiesFx('Layer 1');

    const state = $properties.getState();
    expect(state).toHaveLength(2);
    expect(state).toEqual(mockProperties);
  });

  test('selectProperty orqali selectni togle qilish', () => {
    const initialProperties: IProperty[] = [
      { name: 'Property 1', value: 'Value 1' },
      { name: 'Property 2', value: 'Value 2' }
    ];

    // SetInitalProperties storega initalpropertiesni qiymatini ornatvomman
    setInitialProperties(initialProperties);

    selectProperty({ name: 'Property 1', value: 'Value 1' });
    let selectedState = $selectedProperties.getState();
    expect(selectedState).toHaveLength(1);
    expect(selectedState[0]).toEqual({ name: 'Property 1', value: 'Value 1' });

    selectProperty({ name: 'Property 1', value: 'Value 1' });
    selectedState = $selectedProperties.getState();
    expect(selectedState).toHaveLength(0);
  });

  test('addProperties fetchPropertiesFx  trigger qilvoti ', async () => {
    const mockProperties: IProperty[] = [
      { name: 'Property 1', value: 'Value 1' },
      { name: 'Property 2', value: 'Value 2' }
    ];
    (getProperties as jest.Mock).mockResolvedValueOnce(mockProperties);

    addProperties('Layer 1');
    await fetchPropertiesFx('Layer 1');

    const state = $properties.getState();
    expect(state).toHaveLength(2);
    expect(state).toEqual(mockProperties);
  });

  test('resetLayers state ni tozalash kerak', () => {
    const initialProperties: IProperty[] = [
      { name: 'Property 1', value: 'Value 1' },
      { name: 'Property 2', value: 'Value 2' }
    ];

    setInitialProperties(initialProperties);
    $selectedProperties.on(selectProperty, () => [{ name: 'Property 1', value: 'Value 1' }]);

    // stateni tozalab chiqib ketyabman
    resetLayers();

    // state ni tozalab chiqib ketgandan song rostan ham bosh ekanligini tekshirish
    expect($properties.getState()).toHaveLength(0);
    expect($selectedProperties.getState()).toHaveLength(0);
  });
});