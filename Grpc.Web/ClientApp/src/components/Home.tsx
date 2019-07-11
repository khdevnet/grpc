import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as GpsStreamStore from '../store/GpsStream';
import ImageLoader from '../utils/ImageLoader';
import Map from './Map';
import {
    Character,
    setBackground,
    setPosition,
    setView
} from '../models/Character';

interface HomeProps {
    gpsStream: GpsStreamStore.GpsStream;
}

class Home extends React.Component<HomeProps> {
    vehicleBackground: HTMLImageElement | null = null;

    constructor(props: HomeProps) {
        super(props);
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        new ImageLoader('http://v12.img-up.net/knightd25b8b7e.png')
            .onLoad((img) => {
                this.vehicleBackground = img;
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
        var vehicleGps = this.props.gpsStream.vehicleGps;
        var character = new Character();
        setBackground(character, this.vehicleBackground);
        setPosition(character, vehicleGps.gps);
        setView(character, vehicleGps.direction);
        return (
            <div>
                <h1>Map: {vehicleGps.direction} {vehicleGps.gps.x} : {vehicleGps.gps.y}</h1>
                <Map character={character} onLoad={this.onMapTerrainLoad} />
            </div>);
    }
}

function mapStateToProps(state: ApplicationState) {
    return {
        gpsStream: state.gpsStream,
        planets: state.planets
    };
};

export default connect(
    (state: ApplicationState) => mapStateToProps(state),
)(Home as any);

