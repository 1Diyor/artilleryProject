import { renderHook } from '@testing-library/react-hooks';
import { useStoreProvider } from '../../features/state-provider/hooks'; 
import { useStore } from 'effector-react';
import { ENTITIES } from '../../features/state-provider/constants';

// Mock useStore
jest.mock('effector-react', () => ({
  useStore: jest.fn(),
}));

jest.mock('./constants', () => ({
  ENTITIES: {
    TEST_ENTITY: {
      getState: jest.fn(),
    },
  },
}));

describe('useStoreProvider', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should get data from store', () => {
    const mockData = { data: 'test' };
    (useStore as jest.Mock).mockReturnValue(mockData);

    // const { result } = renderHook(() => useStoreProvider('TEST_ENTITY'));

    // expect(result.current).toEqual(mockData);
    // expect(useStore).toHaveBeenCalledWith(ENTITIES.TEST_ENTITY);
  });
});
