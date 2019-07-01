import { Action, Reducer } from 'redux';
//import * as grpcWeb from 'grpc-web';
//import { GreeterClient } from '../protos/greet_grpc_web_pb';
//import { HelloRequest, HelloReply } from '../protos/greet_pb';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface CounterState {
    count: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface IncrementCountAction { type: 'INCREMENT_COUNT' }
export interface DecrementCountAction { type: 'DECREMENT_COUNT' }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = IncrementCountAction | DecrementCountAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    increment: () => <IncrementCountAction>{ type: 'INCREMENT_COUNT' },
    decrement: () => <DecrementCountAction>{ type: 'DECREMENT_COUNT' }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<CounterState> = (state: CounterState | undefined, incomingAction: Action): CounterState => {
    if (state === undefined) {
        return { count: 0 };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'INCREMENT_COUNT': {
            //const echoService = new GreeterClient('http://localhost:50051', null, null);

            //const request = new HelloRequest();
            //request.setName('Anton!');

            //const call = echoService.sayHello(request, { 'custom-header-1': 'value1' },
            //    (err: grpcWeb.Error, response: HelloReply) => {
            //        console.log(response.getMessage());
            //    });
            //call.on('status', (status: grpcWeb.Status) => {
            //    // ...
            //});
            return { count: state.count + 1 };
        }
        case 'DECREMENT_COUNT':
            return { count: state.count - 1 };
        default:
            return state;
    }
};
