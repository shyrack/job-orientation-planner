import { Appointment } from "./appointment";
import { Company } from "./company";
import { DemonstrationType } from "./demonstrationType";
import { Student } from "./student";
import { Vote } from "./vote";
import deepCopier from "lodash"

export class TimetableProvider {
    private students: Student[];
    private companies: Company[];
    private votesLeft: [Vote, Student][];
    private votesDone: [Vote, Student][];

    private appointments: Appointment[] = [];

    private currentScore = 0;

    private bestScore = 0;
    private bestSolution?: TimetableProvider;

    private currentStudentIdx = 0;

    private iterationCounter = 0;
    private levelCounter = 0;

    constructor(students: Student[], companies: Company[]) {
        this.students = students;
        this.companies = companies;

        this.votesLeft = [];
        this.votesDone = [];

        this.students.forEach(student =>
            student.getVotes().forEach(vote => this.votesLeft.push([vote, student])));
        this.votesLeft.sort((a, b) => a[0].getPriority() - b[0].getPriority());
    }

    private deepCopy(): TimetableProvider {
        return new TimetableProvider(this.students.map(student => deepCopier.cloneDeep(student)),
            this.companies.map(company => deepCopier.cloneDeep(company)));
    }

    public backtracking(): void {
        this.backtrackingStudents();
        this.backtrackingCompanies();
    }

    private backtrackingStudents(): void {
        console.log(`ITERATION COUNTER: ${this.iterationCounter++}`);
        console.log(`STUDENTS LEVEL COUNTER: ${this.levelCounter++}`);

        if (this.isStudentValid() && this.isStudentComplete()) {
            if (this.isStudentComplete()) {
                let currentScore = this.getScore();

                if (this.currentScore > this.bestScore) {
                    this.bestScore = currentScore;
                    this.bestSolution = this.deepCopy();
                }
            }
        }

        if (!this.isStudentComplete()) {

            // iterate over votesLeft
            for (let i = 0; i < this.votesLeft.length; i++) {
                let popped = this.votesLeft.pop();

                if (popped !== undefined) { this.votesDone.push(popped);
                    let vote = popped[0];
                    let student = popped[1];

                    let possibleAppointments = this.findPossibleAppointments(vote.getDemonstrationType());

                    if (possibleAppointments.length != 0) { // no possible appointments available
                        // iterate over possibleAppointments
                        possibleAppointments.forEach(possibleAppointment => {

                        // execute this possibility
                        student.addAppointment(possibleAppointment);

                        // execute next possibility/entry next recursion level
                        this.backtrackingStudents();
                    })
                    }
                    else { // generate possible appointment
                        this.appointments.push(new Appointment(vote.getDemonstrationType(), this.appointments.length));

                        // execute this possibility
                        student.addAppointment(this.appointments[this.appointments.length - 1]);

                        // execute next possibility/entry next recursion level
                        this.backtrackingStudents();

                        // revert this execution/step back
                        this.appointments.pop();
                    }

                    // revert this execution/step back
                    student.removeAppointment();

                    this.votesDone.pop();
                    if (popped !== undefined) { this.votesLeft.push(popped); }
                }
            }
        }

        this.levelCounter--;
    }

    private findPossibleAppointments(whishedDemonstrationType : DemonstrationType): Appointment[] {
        return this.appointments.filter(appointment => {
            if (appointment.getDemonstrationId() === whishedDemonstrationType.getDemonstrationId()) {
                return appointment;
            }
        })
    }

    private backtrackingCompanies(): void {
        console.log(`ITERATION COUNTER: ${this.iterationCounter++}`);
        console.log(`COMPANIES LEVEL COUNTER: ${this.levelCounter++}`);

        if (this.isCompanyValid() && this.isCompanyComplete()) {
                let currentScore = this.getScore();

                if (this.currentScore > this.bestScore) {
                    this.bestScore = currentScore;
                    this.bestSolution = this.deepCopy();
                }
        }

        if (!this.isCompanyComplete()) {
            for (let i = 0; i < this.companies.length; i++) {


                this.backtrackingCompanies();


            }
        }

        this.levelCounter--;
    }

    private isStudentValid(): boolean {
        if (this.students.every(student => student.isValid())) {
            return true;
        }
        return false;
    }

    private isCompanyValid(): boolean {
        if (this.companies.every(company => company.isValid())) {
            return true;
        }
        return false;
    }

    private isStudentComplete(): boolean {
        if (this.students.every(student => student.isComplete())) {
            return true;
        }
        return false;
    }

    private isCompanyComplete(): boolean {
        if (true) {
            return true;
        }
        return false;
    }

    private getScore(): number {
        let score = 0;

        this.students.forEach(student => {
            score += student.getScore();
        })

        return score;
    }

    private runGreedy(): void {
        console.log("DEBUG");
    }
}
