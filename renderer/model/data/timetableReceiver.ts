import { Appointment } from "./appointment";

export abstract class TimetableReceiver {
    protected id: number;
    protected abstract appointments: Appointment[];

    constructor(id: number) {
        this.id = id;
    }

    public addAppointment(appointment: Appointment): void {
        this.appointments.push(appointment);
    }

    public removeAppointment(): void {
        this.appointments.pop();
    }

    public hasDuplicates(collection: any[]) {
        let seen = new Set();

        collection.forEach(element => {
            if (seen.has(element)) {
                return true;
            }
            seen.add(element);
        });

        return false;
    }

    public getId(): number {
        return this.id;
    }

    public getAppointments(): Appointment[] {
        return this.appointments;
    }

    public abstract isValid(): boolean;
}
