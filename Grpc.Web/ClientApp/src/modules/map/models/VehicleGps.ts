import Point from './Point';
import { Direction } from './Direction';

export default class VehicleGps {
    constructor(public direction: Direction, public gps: Point) { }
}