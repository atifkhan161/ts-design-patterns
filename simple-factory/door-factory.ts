import { IDoor, WoodenDoor } from "./door";

export class DoorFactory {
    makeDoor(width, height): IDoor {
        return new WoodenDoor(width,height);
    }
}
