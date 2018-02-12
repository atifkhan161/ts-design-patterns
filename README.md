🚀 Introduction
=================

Design patterns are solutions to recurring problems; **guidelines on how to tackle certain problems**. They are not classes, packages or libraries that you can plug into your application and wait for the magic to happen. These are, rather, guidelines on how to tackle certain problems in certain situations.

> Design patterns are solutions to recurring problems; guidelines on how to tackle certain problems

Wikipedia describes them as

> In software engineering, a software design pattern is a general reusable solution to a commonly occurring problem within a given context in software design. It is not a finished design that can be transformed directly into source or machine code. It is a description or template for how to solve a problem that can be used in many different situations.

⚠️ Be Careful
-----------------
- Design patterns are not a silver bullet to all your problems.
- Do not try to force them; bad things are supposed to happen, if done so. Keep in mind that design patterns are solutions **to** problems, not solutions **finding** problems; so don't overthink.
- If used in a correct place in a correct manner, they can prove to be a savior; or else they can result in a horrible mess of a code.

> Also note that the code samples below are in Typescript, however this shouldn't stop you because the concepts are same anyways. Plus the **support for other languages is underway**.

Types of Design Patterns
-----------------

* [Creational](#creational-design-patterns)
* [Structural](#structural-design-patterns)
* [Behavioral](#behavioral-design-patterns)

Creational Design Patterns
==========================

In plain words
> Creational patterns are focused towards how to instantiate an object or group of related objects.

Wikipedia says
> In software engineering, creational design patterns are design patterns that deal with object creation mechanisms, trying to create objects in a manner suitable to the situation. The basic form of object creation could result in design problems or added complexity to the design. Creational design patterns solve this problem by somehow controlling this object creation.

 * [Simple Factory](#-simple-factory)
 * [Factory Method](#-factory-method)
 * [Abstract Factory](#-abstract-factory)
 * [Builder](#-builder)
 * [Prototype](#-prototype)
 * [Singleton](#-singleton)

🏠 Simple Factory
--------------
Real world example
> Consider, you are building a house and you need doors. It would be a mess if every time you need a door, you put on your carpenter clothes and start making a door in your house. Instead you get it made from a factory.

In plain words
> Simple factory simply generates an instance for client without exposing any instantiation logic to the client

Wikipedia says
> In object-oriented programming (OOP), a factory is an object for creating other objects – formally a factory is a function or method that returns objects of a varying prototype or class from some method call, which is assumed to be "new".

**Programmatic Example**

First of all we have a door interface and the implementation
```typescript
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
```
Then we have our door factory that makes the door and returns it
```typescript
import { IDoor, WoodenDoor } from "./door";

export class DoorFactory {
    makeDoor(width, height): IDoor {
        return new WoodenDoor(width,height);
    }
}
```
And then it can be used as
```typescript
import { DoorFactory } from "./door-factory";

//Create door factory
let doorFactory = new DoorFactory();

//Create door from factory
let woodenDoor = doorFactory.makeDoor(30, 40);

//View door properties
console.log(woodenDoor.getHeight());
console.log(woodenDoor.getWidth());
```

**When to Use?**

When creating an object is not just a few assignments and involves some logic, it makes sense to put it in a dedicated factory instead of repeating the same code everywhere.

🏭 Factory Method
--------------

Real world example
> Consider the case of a hiring manager. It is impossible for one person to interview for each of the positions. Based on the job opening, she has to decide and delegate the interview steps to different people.

In plain words
> It provides a way to delegate the instantiation logic to child classes.

Wikipedia says
> In class-based programming, the factory method pattern is a creational pattern that uses factory methods to deal with the problem of creating objects without having to specify the exact class of the object that will be created. This is done by creating objects by calling a factory method—either specified in an interface and implemented by child classes, or implemented in a base class and optionally overridden by derived classes—rather than by calling a constructor.

 **Programmatic Example**

Taking our hiring manager example above. First of all we have an interviewer interface and some implementations for it

```typescript
export interface IInterviewer {
    askQuestion: Function;
}

export class Developer implements IInterviewer {
    askQuestion(): void {
        console.log('Asking about design patterns!');
    }
}

export class CommunityExecutive  implements IInterviewer {
    askQuestion() : void {
        console.log("Asking about community building");
    }
}
```

Now let us create our `HiringManager`

```typescript
import { IInterviewer } from "./interviewer";

export abstract class HiringManager {
    //Factory method
    abstract makeInterviewer() : IInterviewer;

    takeInterview(): void {
        let interviewer = this.makeInterviewer();
        interviewer.askQuestion();
    }
}

```
Now any child can extend it and provide the required interviewer
```typescript
import { HiringManager } from "./hiring-manager";
import { Developer, IInterviewer, CommunityExecutive } from "./interviewer";

export class DevelopmentManager extends HiringManager {
    makeInterviewer(): IInterviewer {
        return new Developer();
    }
}

export class MarketingManager extends HiringManager {
    makeInterviewer(): IInterviewer {
        return new CommunityExecutive();
    }
}
```
and then it can be used as

```typescript
import { DevelopmentManager, MarketingManager } from "./manager";

let devManager = new DevelopmentManager();
devManager.takeInterview();

let marketingManager = new MarketingManager();
marketingManager.takeInterview();
```

**When to use?**

Useful when there is some generic processing in a class but the required sub-class is dynamically decided at runtime. Or putting it in other words, when the client doesn't know what exact sub-class it might need.