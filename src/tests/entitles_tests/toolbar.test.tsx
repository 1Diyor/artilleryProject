import { createEvent, createStore, fork, allSettled } from 'effector';
import { reshape, annotate, applyAction, $toolbarReshape, $toolbarAnnotate, $toolbarAction } from '../../entities/toolbar/index';
import { ToolbarAction } from '../../entities/toolbar/types';

describe('Toolbar Effector Events and Stores', () => {
  test('reshape event should toggle $toolbarReshape state', async () => {
    const scope = fork({
      values: new Map().set($toolbarReshape, false)
    });

    await allSettled(reshape, { scope });

    expect(scope.getState($toolbarReshape)).toBe(true);

    await allSettled(reshape, { scope });

    expect(scope.getState($toolbarReshape)).toBe(false);
  });

  test('annotate event should toggle $toolbarAnnotate state', async () => {
    const scope = fork({
      values: new Map().set($toolbarAnnotate, false)
    });

    await allSettled(annotate, { scope });

    expect(scope.getState($toolbarAnnotate)).toBe(true);

    await allSettled(annotate, { scope });

    expect(scope.getState($toolbarAnnotate)).toBe(false);
  });

  test('applyAction event should update $toolbarAction state', async () => {
    const mockAction: ToolbarAction = ToolbarAction.Modify;
    const scope = fork();

    await allSettled(applyAction, { scope, params: mockAction });

    expect(scope.getState($toolbarAction)).toEqual(mockAction);
  });
});
