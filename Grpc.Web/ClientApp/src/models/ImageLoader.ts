export default class ImageLoader {
  constructor(public src: string) {
  }

  onLoad(onload: (img: HTMLImageElement) => void) {
    var charImg = new Image();
    charImg.src = this.src;
    charImg.onload = () => {
      onload(charImg);
    };
  }
}