import { DemonstrationType } from "./demonstrationType";
import { Room } from "./room";
import { Timeslot } from "./timeslot";

export class Appointment extends DemonstrationType {
    private appointmentId: number;
    private timeslot?: Timeslot;
    private room?: Room;

    constructor(demonstration: DemonstrationType, appointmentId: number) {
        super(demonstration.getDemonstrationId(), demonstration.getCompany());
        this.appointmentId = appointmentId;
    }

    public getAppointmentId(): number {
        return this.appointmentId;
    }

    public getTimeslot() {
        return this.timeslot;
    }

    public getRoom() {
        return this.room;
    }

    public toString(): String {
        let output = `AppointmentId: ${this.appointmentId}\n`;

        output += `Timeslot: ${this.timeslot}\n`;

        output += `Room: ${this.room}\n`;

        return output;
    }
}
