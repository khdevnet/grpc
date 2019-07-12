import * as signalR from "@aspnet/signalr";
import { Promise } from "es6-promise";
import VehicleGps from '../models/VehicleGps';
import { Direction } from "../models/Direction";
import Point from "../models/Point";

export type SignalRPromise = {
    receive: (onMessageCb: any) => void;
}

export const configureSignalrSockets = () =>
    new Promise<SignalRPromise>((resolve) => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("/hub")
            .build();

        const receive = (onMessageCb: any) => {
            connection.on("messageReceived", (vehicleGps: { direction: string, gps : { x: number, y: number } }) => {
                console.log("messageReceived");
                console.log(vehicleGps.direction);
                onMessageCb({ type: 'RECEIVE_VEHICLE_GPS', vehicleGps: new VehicleGps(((<any>Direction)[vehicleGps.direction]), new Point(vehicleGps.gps.x, vehicleGps.gps.y)) });
            });
        };

        connection.start().then(() => resolve({ receive })).catch(err => console.log(err));
    });