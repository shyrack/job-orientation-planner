import { AppState } from '../renderer/model/state/AppState.ts';

describe('AppState', () => {
  it('should initialize with default name', () => {
    const appState = new AppState();
    expect(appState.name).toBe('bla');
  });

  it('should clone the app state', () => {
    const appState = new AppState();
    const clonedState = appState.clone();
    expect(clonedState).not.toBe(appState);
    expect(clonedState.name).toBe(appState.name);
  });

  it('should clone and modify the app state', () => {
    const appState = new AppState();
    const modifiedState = appState.cloneAndModify((state) => {
      state.name = 'modified';
    });
    expect(modifiedState).not.toBe(appState);
    expect(modifiedState.name).toBe('modified');
  });
});
