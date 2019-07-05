import CanvasObject from './CanvasObject';

export class MapObject extends CanvasObject {
  constructor() {
    super();
  }
}

export const setBackground = (map: MapObject, img: HTMLImageElement) => {
  map.isReady = true;
  map.background = img;
  map.width = img.width;
  map.height = img.height;
};