import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import MapRenderer from '../modules/map/MapRenderer';

type HomeProps = RouteComponentProps<{}>;

class Home extends React.Component<HomeProps> {
    render() {
    return (<div>
      <h1>Map</h1>
      <MapRenderer />
    </div>);
  }
}

export default connect()(Home);
