import { Appointment } from "./appointment";
import { Timeslot } from "./timeslot";
import { TimetableReceiver } from "./timetableReceiver";

export class Company extends TimetableReceiver {
    private name: string;
    private available: Timeslot[];

    protected appointments: Appointment[] = [];

    constructor(id: number, name: string, availabe: Timeslot[]) {
        super(id);
        this.name = name;
        this.available = availabe;
    }

    public isValid(): boolean {
        if (!this.hasDuplicates(this.appointments)) {
            return true;
        }
        return false;
    }

    public getName(): string {
        return this.name;
    }

    public getAvailable(): Timeslot[] {
        return this.available;
    }

    public toString(): String {
        let output = `Name: ${this.name}`;

        output += `Available:\n`;

        this.available.forEach(timeslot => output += `    ${timeslot}\n`);

        output += `Appointments:\n`;

        this.appointments.forEach(appointment => output += `    ${appointment.toString()}\n`);

        return output;
    }
}
