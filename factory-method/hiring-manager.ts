import { IInterviewer } from "./interviewer";

export abstract class HiringManager {
    //Factory method
    abstract makeInterviewer() : IInterviewer;

    takeInterview(): void {
        let interviewer = this.makeInterviewer();
        interviewer.askQuestion();
    }
}