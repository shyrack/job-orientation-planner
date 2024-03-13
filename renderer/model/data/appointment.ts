import { Company } from "./company";
import { DemonstrationType } from "./demonstrationType";
import { Room } from "./room";
import { Timeslot } from "./timeslot";

export class Appointment extends DemonstrationType {
    // private timeslot: Timeslot;
    // private room: Room;

    constructor(professions: String[]) {
        super(professions);
    }
}
