import * as signalR from "@aspnet/signalr";
import { Promise } from "es6-promise";
import VehicleGps from '../models/VehicleGps';

export type SignalRPromise = {
    receive: (onMessageCb: any) => void;
}

export const configureSignalrSockets = () =>
    new Promise<SignalRPromise>((resolve) => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("/hub")
            .build();

        const receive = (onMessageCb: any) => {
            connection.on("messageReceived", (vehicleGps: VehicleGps) => {
                console.log(vehicleGps);
                onMessageCb({ type: 'RECEIVE_VEHICLE_GPS', vehicleGps: vehicleGps });
            });
        };

        connection.start().then(() => resolve({ receive })).catch(err => console.log(err));
    });