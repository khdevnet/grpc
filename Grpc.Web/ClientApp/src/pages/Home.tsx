import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import MapRenderer from '../modules/map/MapRenderer';
import { ApplicationState } from '../store';
import * as GpsStreamStore from '../store/GpsStream';

type HomeProps = GpsStreamStore.GpsStream
    & typeof GpsStreamStore.actionCreators
    & RouteComponentProps<{}>;

class Home extends React.Component<HomeProps> {
    render() {
        var vehicleGps = this.props.vehicleGps;
        return (<div>
            <h1>Map: {vehicleGps.direction} {vehicleGps.gps.x} : {vehicleGps.gps.y}</h1>
            <MapRenderer vehicleGps={vehicleGps} />
        </div>);
    }
}

export default connect(
    (state: ApplicationState) => state.gpsStream,
    GpsStreamStore.actionCreators
)(Home);

