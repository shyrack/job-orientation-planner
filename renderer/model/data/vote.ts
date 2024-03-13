import { DemonstrationType } from "./demonstrationType";

export class Vote {
    private id: number;
    private demonstrationType: DemonstrationType;
    private priority: number; // 1 (lowest) - 6 (highest)

    constructor(id: number, demonstrationType: DemonstrationType, priority: number) {
        this.id = id;
        this.demonstrationType = demonstrationType;
        this.priority = priority;
    }

    getDemonstrationType(): DemonstrationType {
        return this.demonstrationType;
    }

    getPriority(): number {
        return this.priority;
    }
}
