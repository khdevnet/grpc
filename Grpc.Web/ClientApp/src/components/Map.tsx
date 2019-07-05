import * as React from 'react';

import { Character } from '../models/Character';
import MapObject from '../models/MapObject';

export interface IMapState {
    character: Character;
    mapObj: MapObject;
}

type MapProps = IMapState;

class Map extends React.Component<MapProps> {
    private canvas = React.createRef<HTMLCanvasElement>();

    componentDidUpdate() {
        var props = this.props;
        var map = props.mapObj;
        var char = props.character;
        if (this.canvas && this.canvas.current) {
            this.context = this.canvas.current.getContext('2d');
            this.canvas.current.width = map.width;
            this.canvas.current.height = map.height;
        }

        this.context.clearRect(0, 0, map.width, map.height);

        if (map.isReady) {
            this.context.drawImage(map.background, map.x, map.y);
        }

        if (char.isReady) {
            this.context.drawImage(
                char.background,
                char.spriteX,
                char.spriteY,
                char.width,
                char.height,
                char.x,
                char.y,
                char.width,
                char.height);
        }
    }

    render() {
        return (
            <canvas
                ref={this.canvas}
            />
        );
    }
}

export default Map;
