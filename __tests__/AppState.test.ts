import { AppState, AppStateModifier } from '../renderer/model/state/AppState';


describe('AppState', () => {
  let appState: AppState;

  beforeEach(() => {
    appState = new AppState();
  });

  it('should initialize with default values', () => {
    expect(appState.viewName).toEqual('room');
    expect(appState.company.rows.length).toBeGreaterThan(0);
    expect(appState.student.rows.length).toBeGreaterThan(0);
    expect(appState.room.rows.length).toBeGreaterThan(0);
  });

  it('should clone the AppState correctly', () => {
    const clonedState = appState.clone();
    expect(clonedState).toEqual(appState);
    expect(clonedState).not.toBe(appState); 
  });

  it('should modify the AppState correctly', () => {
    const newViewName = 'company';
    const modifier: AppStateModifier = (appState) => {
      appState.viewName = newViewName;
    };
    appState.cloneAndModify(modifier);
    expect(appState.viewName).toEqual(newViewName);
  });
});
