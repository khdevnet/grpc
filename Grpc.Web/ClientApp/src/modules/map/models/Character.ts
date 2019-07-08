import Point from './Point';
import CanvasObject from './CanvasObject';
import { Direction } from './Direction';

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

export const setBackground = (char: Character, img: HTMLImageElement | null) => {
    char.background = img ? img : null;
    char.isReady = !!img;
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

export const setView = (char: Character, direction: Direction) => {
    if (direction == Direction.Northwest) {
        char.spriteX = 124;
    }
    if (direction == Direction.Northeast) {
        char.spriteX = 100;
    }
    if (direction == Direction.Southeast) {
        char.spriteX = 50;
    }
    if (direction == Direction.Southwest) {
        char.spriteX = 26;
    }

    if (direction == Direction.West) {
        char.spriteX = 170;
    }

    if (direction == Direction.North) {
        char.spriteX = 74;
    }

    if (direction == Direction.East) {
        char.spriteX = 148;
    }

    if (direction == Direction.South) {
        char.spriteX = 0;
    }

    char.spriteX = 74;
};