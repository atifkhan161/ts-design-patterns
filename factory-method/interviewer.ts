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