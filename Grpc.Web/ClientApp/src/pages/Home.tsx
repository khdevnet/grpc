import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import MapRenderer from '../modules/map/MapRenderer';
import RouteDefinitionForm from '../modules/map/RouteDefinitionForm';
import { ApplicationState } from '../store';
import * as GpsStreamStore from '../store/GpsStream';
import * as MapReducer from '../modules/map/reducers/mapReducer';
import * as MapActions from '../modules/map/reducers/mapReducerActionCreators';
import { func } from 'prop-types';


type Actions = typeof MapActions.actionCreators;

interface HomePropsData {
    gpsStream: GpsStreamStore.GpsStream;
    planets: MapReducer.PlanetsState;
}

type HomeProps = HomePropsData & Actions;
// & typeof GpsStreamStore.actionCreators
// & MapReducer.PlanetsState
// & typeof MapActions.actionCreators
// & RouteComponentProps<{}>;

class Home extends React.Component<HomeProps> {

    componentDidMount() {
        console.log(this.props);
        this.props.requestPlanets();
    }

    render() {
        var vehicleGps = this.props.gpsStream.vehicleGps;
        var planets = this.props.planets.planets;
        console.log(this.props.planets.planets);
        return (
            <div>
                <RouteDefinitionForm planets={planets} sendRoute={this.props.sendRoute} />
                <h1>Map: {vehicleGps.direction} {vehicleGps.gps.x} : {vehicleGps.gps.y}</h1>
                <MapRenderer vehicleGps={vehicleGps} />
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
    MapActions.actionCreators
)(Home as any);

