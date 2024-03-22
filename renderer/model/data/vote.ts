import { DemonstrationType } from "./demonstrationType";

export class Vote {
    private demonstrationType: DemonstrationType;
    private priority: number; // 1 (lowest) - 6 (highest)

    constructor(demonstrationType: DemonstrationType, priority: number) {
        this.demonstrationType = demonstrationType;
        this.priority = priority;
    }

    public getDemonstrationType(): DemonstrationType {
        return this.demonstrationType;
    }

    public getPriority(): number {
        return this.priority;
    }

    public toString(): String {
        let output = `DemonstrationType: ${this.demonstrationType.toString()}\n`;

        output += `Priority: ${this.priority}\n`;

        return output;
    }
}
