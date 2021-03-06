import { Action, Reducer } from 'redux';
import VehicleGps from '../models/VehicleGps';
import Point from '../models/Point';
import { Direction } from '../models/Direction';

export interface GpsStream {
    vehicleGps: VehicleGps;
}

export interface ReceivePointAction { type: 'RECEIVE_VEHICLE_GPS', vehicleGps: VehicleGps }

export type KnownAction = ReceivePointAction;

export const actionCreators = {
    receivePoint: () => <ReceivePointAction>{ type: 'RECEIVE_VEHICLE_GPS' },
};

export const reducer: Reducer<GpsStream> = (state: GpsStream | undefined, incomingAction: Action): GpsStream => {
    if (state === undefined) {
        return { vehicleGps: new VehicleGps(Direction.East, new Point(0, 0)) };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'RECEIVE_VEHICLE_GPS': {
            return { vehicleGps: action.vehicleGps };
        }
        default:
            return state;
    }
};
