import { Timeslot } from "./timeslot";

export class Room {
    private roomNumber: number;
    private studentCapacity: number;
    private available: Timeslot[];

    constructor(roomNumber: number, studentCapacity: number, available: Timeslot[]) {
        this.roomNumber = roomNumber;
        this.studentCapacity = studentCapacity;
        this.available = available;
    }

    public getStudentCapacity(): number {
        return this.studentCapacity;
    }

    public getAvailable(): Timeslot[] {
        return this.available;
    }
}
