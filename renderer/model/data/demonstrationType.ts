import { Company } from "./company";

export class DemonstrationType {
    // private id: number
    // private company: Company;
    private professions: String[];

    constructor(professions: String[]) {
        this.professions = professions;
    }

    public getProfessions() : String[] {
        return this.professions;
    }
}
