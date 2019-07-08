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
        return (
            <div>
                <form className='form-inline'>
                    <div className='form-group mb-2'>
                        <label className='sr-only'>From</label>
                        <input type='text' className='form-control' id='from' value='Coruscant' placeholder='From' />
                    </div>
                    <div className='form-group mx-sm-3 mb-2'>
                        <label className='sr-only'>To</label>
                        <input type='text' className='form-control' id='to' value='Maridun' placeholder='To' />
                    </div>
                    <button type='submit' className='btn btn-primary mb-2'>Delivery</button>
                </form>
                <h1>Map: {vehicleGps.direction} {vehicleGps.gps.x} : {vehicleGps.gps.y}</h1>
                <MapRenderer vehicleGps={vehicleGps} />
            </div>);
    }
}

export default connect(
    (state: ApplicationState) => state.gpsStream,
    GpsStreamStore.actionCreators
)(Home);

