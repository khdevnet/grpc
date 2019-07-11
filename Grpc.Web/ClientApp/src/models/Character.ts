import CanvasObject from './CanvasObject';
import { Direction } from './Direction';

export class Character extends CanvasObject {
    public spriteX: number;
    public spriteY: number;

    constructor(
        public x: number = 0,
        public y: number = 0,
        public direction: Direction = Direction.East,
        img: HTMLImageElement | null = null) {
        super(x, y, 20, 42);
        this.background = img ? img : null;
        this.isReady = !!img;
        this.spriteX = 0;
        this.spriteY = 0;
        this.setView(direction);
       
    }

    setView = (direction: Direction) => {

        if (direction == Direction.Northwest) {
            console.log(direction);
            this.width = 27;
            this.height = 27;
            this.spriteX = 99;
            this.spriteY = 75;
        }
        if (direction == Direction.Northeast) {
            console.log(direction);
            this.width = 27;
            this.height = 27;
            this.spriteX = 0;
            this.spriteY = 75;
        }
        if (direction == Direction.Southeast) {
            console.log(direction);
            this.width = 27;
            this.height = 27;
            this.spriteX = 29;
            this.spriteY = 75;
        }
        if (direction == Direction.Southwest) {
            console.log(direction);
            this.width = 27;
            this.height = 27;
            this.spriteX = 59;
            this.spriteY = 75;
        }

        if (direction == Direction.West) {
            console.log(direction);
            this.width = 37;
            this.height = 25;
            this.spriteX = 0;
            this.spriteY = 43;
        }

        if (direction == Direction.North) {
            console.log(direction);
            this.width = 27;
            this.height = 38;
            this.spriteX = 0;
            this.spriteY = 0;
        }

        if (direction == Direction.East) {
            console.log(direction);
            this.width = 39;
            this.height = 25;
            this.spriteX = 38;
            this.spriteY = 44;
        }

        if (direction == Direction.South) {
            console.log(direction);
            this.spriteY = 0;
            this.spriteX = 27;
            this.width = 27;
            this.height = 38;
        }
        console.log(this);
    };
}