import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import Map from './Map';
import {
  Character,
  setBackground,
  setPosition,
  isMoveRight,
  isMoveLeft,
  isMoveDown,
  isMoveUp
} from '../models/Character';

import ImageLoader from '../models/ImageLoader';
import Point from '../models/Point';
import MapObject from '../models/MapObject';


export interface IHomeState {
  character: Character;
  mapObj: MapObject;
}

type HomeProps = RouteComponentProps<{}>;

class Home extends React.Component<HomeProps> {
  state: IHomeState;
  destination: Point;
  start: Point;

  constructor(props: HomeProps) {
    super(props);
    this.state = { character: new Character(), mapObj: new MapObject() };
    this.tick = this.tick.bind(this);
    this.destination = new Point(477, 72);
    this.start = new Point(68, 456);
  }

  componentDidMount() {
    var character = this.state.character;
    new ImageLoader('http://v12.img-up.net/knightd25b8b7e.png')
      .onLoad((img) => {
        setBackground(character, img);
        this.setState({ character: { ...character } });
      });
    var mapObj = this.state.mapObj;
    new ImageLoader('https://raw.githubusercontent.com/khdevnet/grpc/master/proof-of-concept/map/star-wars-galaxy.jpg')
      .onLoad((img) => {
        mapObj.setBackground(img);
        this.setState({ mapObj: { ...mapObj } });
      });

    setPosition(character, this.start);
    this.setState({ character: { ...this.state.character } });
    requestAnimationFrame(this.tick);
  }



  tick() {
    var step = 5;
    if (isMoveRight(this.state.character, this.destination.x)) {
      this.state.character.x += step;
    }

    if (isMoveLeft(this.state.character, this.destination.x)) {
      this.state.character.x -= step;
    }

    if (isMoveUp(this.state.character, this.destination.y)) {
      this.state.character.y -= step;
    }

    if (isMoveDown(this.state.character, this.destination.y)) {
      this.state.character.y += step;
    }
    this.setState({ character: { ...this.state.character }, mapObj: { ...this.state.mapObj } });
    requestAnimationFrame(this.tick);
  }

  render() {
    return (<div>
      <h1>Map</h1>
      <Map character={this.state.character} mapObj={this.state.mapObj} />
    </div>);
  }
}


export default connect()(Home);
