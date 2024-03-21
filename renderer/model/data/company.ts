import { Appointment } from "./appointment";
import { Room } from "./room";
import { Timeslot } from "./timeslot";
import { TimetableReceiver } from "./timetableReceiver";

export class Company extends TimetableReceiver {
    private professions: String[];
    private eventLimit: number;
    private studentLimit: number;
    private available: Timeslot[];
    private rooms: Room[];

    protected appointments: Appointment[] = [];

    constructor(id: number, professions: String[], eventLimit: number, studentLimit: number, availabe: Timeslot[], rooms: Room[]) {
        super(id);
        this.professions = professions;
        this.eventLimit = eventLimit;
        this.studentLimit = studentLimit;
        this.available = availabe;
        this.rooms = rooms;
    }

    public isValid(): boolean {
        if (!this.hasDuplicates(this.appointments)) {
            return true;
        }
        return false;
    }
}
