import { Appointment } from "./appointment";
import { Company } from "./company";
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

    public deepCopy(): TimetableProvider {
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

        if (this.isValid()) {
            if (this.isStudentComplete()) {
                let currentScore = this.getScore();

                if (this.currentScore > this.bestScore) {
                    this.bestScore = currentScore;
                    this.bestSolution = this.deepCopy();
                }
            }
        }
        
        if (!this.isStudentComplete()) {
            for (let i = 0; i < this.votesLeft.length; i++) {
                let popped = this.votesLeft.pop();
                if (popped !== undefined) { this.votesDone.push(popped); }

                if (popped !== undefined) { this.execute(popped); }

                this.backtrackingStudents();

                if (popped !== undefined) { this.revert(popped); }

                this.votesDone.pop();
                if (popped !== undefined) { this.votesLeft.push(popped); }
            }
        }

        this.levelCounter--;
    }

    private execute(tuple: [Vote, Student]): void {
        let vote = tuple[0];
        let student = tuple[1];

        this.findAppointment(vote.getDemonstrationType().getProfessions());

        student.addAppointment();
    }

    private findAppointment(professions: String[]) {
        this.appointments
    }

    private revert(tuple: [Vote, Student]): void {
        let vote = tuple[0];
        let student = tuple[1];

        student.addAppointment();
    }

    private backtrackingCompanies(): void {
        console.log(`ITERATION COUNTER: ${this.iterationCounter++}`);
        console.log(`COMPANIES LEVEL COUNTER: ${this.levelCounter++}`);

        if (this.isValid()) {
            if (this.isCompanyComplete()) {
                let currentScore = this.getScore();

                if (this.currentScore > this.bestScore) {
                    this.bestScore = currentScore;
                    this.bestSolution = this.deepCopy();
                }
            }
        }

        if (!this.isCompanyComplete()) {
            for (let i = 0; i < this.companies.length; i++) {
                

                this.backtrackingCompanies();


            }
        }

        this.levelCounter--;
    }

    private isValid(): boolean {
        if (this.students.every(student => student.isValid()) &&
            this.companies.every(company => company.isValid())) {
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
