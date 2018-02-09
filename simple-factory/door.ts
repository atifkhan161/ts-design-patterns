export interface IDoor {
    getWidth : Function;
    getHeight: Function;
}

export class WoodenDoor implements IDoor {
    _width: number;
    _height: number;

    constructor (public width: number, public height: number) {
        this._width = width;
        this._height = height;
    }

    getWidth() : number {
        return this._width;
    }

    getHeight() : number {
        return this._height;
    }
}