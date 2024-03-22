import { Company } from "./company";
import { Room } from "./room";

export class DemonstrationType {
    private demonstrationId: number
    private company: Company;

    constructor(demonstrationId: number, company: Company) {
        this.demonstrationId = demonstrationId;
        this.company = company;
    }

    public getDemonstrationId(): number {
        return this.demonstrationId;
    }

    public getCompany(): Company {
        return this.company;
    }

    public toString(): String {
        let output = `DemonstrationId: ${this.demonstrationId}\n`;

        output += `Company:\n`;

        output += `    Id: ${this.company.getId()}\n`;

        output += `    Name: ${this.company.getName()}\n`;

        return output;
    }
}
