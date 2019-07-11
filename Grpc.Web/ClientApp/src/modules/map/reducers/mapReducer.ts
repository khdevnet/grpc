import { Action, Reducer } from 'redux';

interface RequestPlanetsAction {
  type: 'REQUEST_PLANETS';
}

interface ReceivePlanetsAction {
  type: 'RECEIVE_PLANETS';
  planets: string[];
}

export interface PlanetsState {
  isLoading: boolean;
  planets: string[];
}

export type KnownAction = RequestPlanetsAction | ReceivePlanetsAction;

const unloadedState: PlanetsState = { planets: [], isLoading: false };


export const reducer: Reducer<PlanetsState> = (state: PlanetsState = unloadedState, incomingAction: Action): PlanetsState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case 'REQUEST_PLANETS':
      return {
        planets: state.planets,
        isLoading: true
      };
    case 'RECEIVE_PLANETS':
      return {
        planets: action.planets,
        isLoading: false
      };
    default:
      return state;
  }
};