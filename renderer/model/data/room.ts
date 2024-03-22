import { Timeslot } from "./timeslot";

export class Room {
    private roomNumber: number;
    private studentCapacity: number;
    private occupied: Timeslot[] = new Array(5);

    constructor(roomNumber: number, studentCapacity: number) {
        this.roomNumber = roomNumber;
        this.studentCapacity = studentCapacity;
    }

    public getRoomNumber(): number {
        return this.roomNumber;
    }

    public getStudentCapacity(): number {
        return this.studentCapacity;
    }

    public getOccupied(): Timeslot[] {
        return this.occupied;
    }

    public toString(): String {
        let output = `Number: ${this.roomNumber}\n`;

        output += `Student Capacity: ${this.studentCapacity}\n`;

        output += `Occupied:\n`;

        this.occupied.forEach(timeslot => output += `    ${timeslot}\n`);

        return output;
    }
}
