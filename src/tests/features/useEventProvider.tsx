import { renderHook, act } from '@testing-library/react-hooks';
import { useEventProvider } from '../../features/state-provider/hooks';
import { ACTIONS, ENTITIES } from '../../features/state-provider/constants';

describe('useEventProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('observers tekshirish', () => {
    ENTITIES.DATABASES.watch = jest.fn();

    const { result, unmount } = renderHook(() => useEventProvider());

    const callback = jest.fn();

    act(() => {
      result.current.observe('DATABASES', callback);
    });

    expect(ENTITIES.DATABASES.watch).toHaveBeenCalled();

    act(() => {
      unmount();
    });

    // Проверка, что метод отписки был вызван (если ENTITIES.DATABASES.watch возвращает метод отписки)
  });

  
});
