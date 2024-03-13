export enum SchoolPeriod {
    "8:45 - 9:30",
    "9:50 - 10:35", 
    "10:35 - 11:20",
    "11:40 - 12:25",
    "12:25 - 13:10"
};

export class Timeslot {
    private id: number;
    private startTime: Date;
    private endTime: Date;

    constructor(id: number, startTime: Date, endTime: Date) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
