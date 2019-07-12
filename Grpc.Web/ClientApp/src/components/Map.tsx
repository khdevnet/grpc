import * as React from 'react';
import ImageLoader from '../utils/ImageLoader';

import { Character } from '../models/Character';
import { MapObject, setBackground as setMapBackground } from '../models/MapObject';


export interface MapProps {
    character: Character;
    onLoad: () => void;
}

class Map extends React.Component<MapProps> {
    private canvas = React.createRef<HTMLCanvasElement>();
    private mapTerrain: MapObject;

    constructor(props: MapProps) {
        super(props);
        this.mapTerrain = new MapObject();
    }

    getMousePos = (canvas: HTMLCanvasElement | null, evt: any) => {
        if (canvas) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }
    }

    componentDidMount() {
        var props = this.props;
        new ImageLoader('https://raw.githubusercontent.com/khdevnet/grpc/master/docs/star-wars-galaxy-crop.png')
            .onLoad((img) => {
                setMapBackground(this.mapTerrain, img);
                props.onLoad();
            });

        if (this.canvas && this.canvas.current) {
            var self = this;
            this.canvas.current.addEventListener("click", function (evt) {
                var mousePos = self.getMousePos(self.canvas.current, evt);
                if (mousePos) {
                    alert(mousePos.x + ',' + mousePos.y);
                }
            }, false);
        }
    }

    componentDidUpdate() {
        var char = this.props.character;

        if (!(this.canvas && this.canvas.current)) {
            return
        }

        this.context = this.canvas.current.getContext('2d');
        this.context.clearRect(0, 0, this.mapTerrain.width, this.mapTerrain.height);

        if (this.mapTerrain.isReady) {
            this.canvas.current.width = this.mapTerrain.width;
            this.canvas.current.height = this.mapTerrain.height;
            this.context.drawImage(this.mapTerrain.background, this.mapTerrain.x, this.mapTerrain.y);
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
