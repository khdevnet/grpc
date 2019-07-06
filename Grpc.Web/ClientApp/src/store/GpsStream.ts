import { Action, Reducer } from 'redux';
import VehicleGps from '../modules/map/models/VehicleGps';
import Point from '../modules/map/models/Point';
import { strict } from 'assert';
//import * as grpcWeb from 'grpc-web';
//import { GreeterClient } from '../protos/greet_grpc_web_pb';
//import { HelloRequest, HelloReply } from '../protos/greet_pb';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface GpsStream {
    vehicleGps: VehicleGps;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface ReceivePointAction { type: 'RECEIVE_VEHICLE_GPS', vehicleGps: VehicleGps }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = ReceivePointAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    receivePoint: () => <ReceivePointAction>{ type: 'RECEIVE_VEHICLE_GPS' },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<GpsStream> = (state: GpsStream | undefined, incomingAction: Action): GpsStream => {
    if (state === undefined) {
        return { vehicleGps: new VehicleGps("", new Point(0, 0)) };
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
