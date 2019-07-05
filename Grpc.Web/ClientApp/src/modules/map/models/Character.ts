import Point from './Point';
import CanvasObject from './CanvasObject';

export class Character extends CanvasObject {
  constructor(
    public spriteX: number = 0,
    public spriteY: number = 0,
    public speed: number = 150,
    public edgeRegion: number = 50,
    public moving: boolean = false) {
    super();
    this.width = 20;
    this.height = 42;
  }
}

export const setBackground = (char: Character, img: HTMLImageElement) => {
  char.isReady = true;
  char.background = img;
};

export const setPosition = (char: Character, position: Point) => {
  char.x = position.x;
  char.y = position.y;
};

export const isMoveUp = (char: Character, endY: number) => {
  return char.y > endY;
};

export const isMoveDown = (char: Character, endY: number) => {
  return char.y < endY;
};

export const isMoveRight = (char: Character, endX: number) => {
  return char.x < endX;
};

export const isMoveLeft = (char: Character, endX: number) => {
  return char.x > endX;
};

export const setView = (char: Character, target: Point) => {
  if (isMoveLeft(char, target.x) && isMoveUp(char, target.y)) {
    char.spriteX = 124;
  }
  if (isMoveRight(char, target.x) && isMoveUp(char, target.y)) {
    char.spriteX = 100;
  }
  if (isMoveRight(char, target.x) && isMoveDown(char, target.y)) {
    char.spriteX = 50;
  }
  if (isMoveRight(char, target.x) && isMoveDown(char, target.y)) {
    char.spriteX = 26;
  }

  if (isMoveLeft(char, target.x)) {
    char.spriteX = 170;
  }

  if (isMoveUp(char, target.y)) {
    char.spriteX = 74;
  }

  if (isMoveRight(char, target.x)) {
    char.spriteX = 148;
  }

  if (isMoveDown(char, target.y)) {
    char.spriteX = 0;
  }

  char.spriteX = 74;
};