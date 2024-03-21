import { Company } from "./company";
import { Room } from "./room";

export class DemonstrationType {
    private demonstrationId: number
    private company: Company;

    private rooms: Room[] = [];

    constructor(demonstrationId: number, company: Company) {
        this.demonstrationId = demonstrationId;
        this.company = company;
    }

    public addRoom(room: Room): void {
        this.rooms.push(room);
    }

    public removeRoom(): void {
        this.rooms.pop();
    }

    public getDemonstrationId(): number {
        return this.demonstrationId;
    }

    public getCompany(): Company {
        return this.company;
    }

    public getRooms(): Room[] {
        return this.rooms;
    }
}
