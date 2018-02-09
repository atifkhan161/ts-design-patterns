import { DoorFactory } from "./door-factory";

//Create door factory
let doorFactory = new DoorFactory();

//Create door from factory
let woodenDoor = doorFactory.makeDoor(30, 40);

//View door properties
console.log(woodenDoor.getHeight());
console.log(woodenDoor.getWidth());