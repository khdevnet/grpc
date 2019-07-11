import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as GpsStreamStore from '../../store/GpsStream';

import Map from './Map';
import {
    Character,
    setBackground,
    setPosition,
    isMoveRight,
    isMoveLeft,
    isMoveDown,
    isMoveUp,

    setView
} from './models/Character';

import ImageLoader from './utils/ImageLoader';
import Point from './models/Point';

type MapRendererProps = GpsStreamStore.GpsStream;

export interface IMapRendererState {
    character: Character;
}

class MapRenderer extends React.Component<MapRendererProps> {
    state: IMapRendererState;
    destination: Point;
    start: Point;
    characterBackground: HTMLImageElement | null = null;

    constructor(props: MapRendererProps) {
        super(props);
        this.state = { character: new Character() };
        this.tick = this.tick.bind(this);
        this.destination = new Point(160, 476); // Coruscant 163,476
        this.start = new Point(561, 207); // Dathomir 561,207
    }

    componentDidMount() {
        var character = this.state.character;
        new ImageLoader('http://v12.img-up.net/knightd25b8b7e.png')
            .onLoad((img) => {
                this.characterBackground = img;
            });

        requestAnimationFrame(this.tick);
    }

    onMapTerrainLoad = () => {
        this.forceUpdate();
    }

    tick() {
        requestAnimationFrame(this.tick);
    }

    render() {
        var vehicleGps = this.props.vehicleGps;
        var character = new Character();
        setBackground(character, this.characterBackground);
        setPosition(character, vehicleGps.gps);
        setView(character, vehicleGps.direction);

        return (<Map character={character} onLoad={this.onMapTerrainLoad} />);
    }
}


export default MapRenderer;
