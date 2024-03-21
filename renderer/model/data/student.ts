import { Appointment } from "./appointment";
import { TimetableReceiver } from "./timetableReceiver";
import { Vote } from "./vote";

export class Student extends TimetableReceiver {
    private votes: Vote[] = new Array(6);

    protected appointments: Appointment[] = new Array(5);

    constructor(id: number, votes: Vote[]) {
        super(id);
        this.votes = votes;
    }

    public isValid(): boolean {
        if (!this.hasDuplicates(this.appointments) && this.appointments.length <= 5) {
            return true;
        }
        return false;
    }

    public isComplete(): boolean {
        if (this.isValid() && this.appointments.length == 5) {
            return true;
        }
        return false;
    }

    public getScore(): number {
        let score = 0;

        this.appointments.forEach(appointment => {
            this.votes.forEach(vote => {
                if (vote.getDemonstrationType() == appointment) {
                    score += vote.getPriority();
                }
            })
        })

        return score;
    }

    public getVotes(): Vote[] {
        return this.votes;
    }
}
