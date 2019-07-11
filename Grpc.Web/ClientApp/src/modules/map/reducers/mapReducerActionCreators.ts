import { AppThunkAction } from '../../../store';
import { KnownAction } from './mapReducer';

export const actionCreators = {
  requestPlanets: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
    const appState = getState();
    if (appState && appState.planets) {
      fetch(`api/planets/all`)
        .then(response => response.json() as Promise<string[]>)
        .then(data => {
          dispatch({ type: 'RECEIVE_PLANETS', planets: data });
        });

      dispatch({ type: 'REQUEST_PLANETS' });
    }
  },
  sendRoute: (from: string, to: string): AppThunkAction<KnownAction> => () => {
    fetch(`api/planets/sendRoute`, {
      method: 'post',
      body: JSON.stringify({ from, to })
    }).then(response => response.json());
  }
};
