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