import * as React from 'react';
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
} from './models/Character';

import ImageLoader from './models/ImageLoader';
import Point from './models/Point';
import { MapObject, setBackground as setMapBackground} from './models/MapObject';


export interface IMapRendererState {
  character: Character;
  mapObj: MapObject;
}

class MapRenderer extends React.Component {
  state: IMapRendererState;
  destination: Point;
  start: Point;

  constructor(props: any) {
    super(props);
    this.state = { character: new Character(), mapObj: new MapObject() };
    this.tick = this.tick.bind(this);
    this.destination = new Point(160, 476); // Coruscant 163,476
    this.start = new Point(561, 207); // Dathomir 561,207
  }

  componentDidMount() {
    var character = this.state.character;
    new ImageLoader('http://v12.img-up.net/knightd25b8b7e.png')
      .onLoad((img) => {
        setBackground(character, img);
        this.setState({ character: { ...character } });
      });
    var mapObj = this.state.mapObj;
    new ImageLoader('https://raw.githubusercontent.com/khdevnet/grpc/master/docs/star-wars-galaxy-crop.png')
      .onLoad((img) => {
        setMapBackground(mapObj, img);
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
    return (<Map character={this.state.character} mapObj={this.state.mapObj} />);
  }
}


export default MapRenderer;
