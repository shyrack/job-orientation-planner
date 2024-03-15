import { DemonstrationType } from "./demonstrationType";
import { Room } from "./room";
import { SchoolPeriod, Timeslot } from "./timeslot";

export class Appointment extends DemonstrationType {
    private appointmentId: number;
    private timeslot: undefined;
    private room: undefined;

    constructor(demonstration: DemonstrationType, appointmentId: number) {
        super(demonstration.getDemonstrationId(), demonstration.getCompany(), demonstration.getProfessions());
        this.appointmentId = appointmentId;
    }

    public getAppointmentId(): number {
        return this.appointmentId;
    }
}
