import * as signalR from "@aspnet/signalr";
import { Promise } from "es6-promise";
import { Dispatch, AnyAction } from 'redux';

export type SignalRPromise = {
    receive: (onMessageCb: any) => void;
}

export const configureSignalrSockets = () =>
    new Promise<SignalRPromise>((resolve) => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("/hub")
            .build();

        const receive = (onMessageCb: any) => {
            connection.on("messageReceived", (message: string) => {
                console.log(message);
                onMessageCb({ type: 'RECEIVE_POINT', point: message });
            });
        };

        connection.start().then(() => resolve({ receive })).catch(err => console.log(err));
    });