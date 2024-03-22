import { Student } from "./student";
import { Company } from "./company";
import { Room } from "./room";
import { DemonstrationType } from "./demonstrationType";
import { Vote } from "./vote";
import { Timeslot } from "./timeslot";
import { TimetableProvider } from "./timetableProvider";

import fs from 'fs';

function main() {
    let students: Student[] = [];
    let companies: Company[] = [];
    let rooms: Room[] = [];
    let demonstrationTypes: DemonstrationType[] = [];

    // read students
    try {
        let studentsFile = fs.readFileSync("./renderer/model/data/students.json", 'utf8');
        let studentJSONs = JSON.parse(studentsFile);

        for (let studentJSON of studentJSONs) {
            students.push(new Student(studentJSON.student_id));
        }
    } catch (error) {
        console.error(`Error reading or parsing students JSON file : ${error}`);
    }

    // read votes
    try {
        let votesFile = fs.readFileSync("./renderer/model/data/votes.json", 'utf8');
        let voteJSONs = JSON.parse(votesFile);

        for (let voteJSON of voteJSONs) {
            let votesStudentId = voteJSON.student_id;

            students.forEach(student => {
                if (student.getId() === votesStudentId) {
                    student.addVote(new Vote(voteJSON.company_id, voteJSON.priority));
                    return;
                }
            });
        }
    } catch (error) {
        console.error(`Error reading or parsing votes JSON file : ${error}`);
    }

    // read companies
    try {
        let companiesFile = fs.readFileSync("./renderer/model/data/companies.json", 'utf8');
        let companyJSONs = JSON.parse(companiesFile);

        let companyCounter = 0;

        for (let companyJSON of companyJSONs) {
            if (!isCompanyKnown(companies, companyJSON.name)) {
                companies.push(new Company(companyCounter++, companyJSON.name, getMatchingTimeslots(companyJSON.timeslot_start, companyJSON.timeslot_end)));
            }
        }

    } catch (error) {
        console.error(`Error reading or parsing companies JSON file : ${error}`);
    }

    // read rooms
    try {
        let roomsFile = fs.readFileSync("./renderer/model/data/rooms.json", 'utf8');
        let roomJSONs = JSON.parse(roomsFile);

        for (let roomJSON of roomJSONs) {
            rooms.push(new Room(roomJSON.room_id, roomJSON.student_capacity));
        }
    } catch (error) {
        console.error(`Error reading or parsing rooms JSON file : ${error}`);
    }

    // read demonstrationType
    /*
    company_id is the demonstration.id
    */
    try {
        let demonstrationTypeFile = fs.readFileSync("./renderer/model/data/companies.json", 'utf8');
        let demonstrationTypeJSONs = JSON.parse(demonstrationTypeFile);

        for (let demonstrationTypeJSON of demonstrationTypeJSONs) {

            for (let company of companies) {
                if (demonstrationTypeJSON.name === company.getName()) {
                    demonstrationTypes.push(new DemonstrationType(demonstrationTypeJSON.company_id, company));
                }
            }
        }
    } catch (error) {
        console.error(`Error reading or parsing demonstration types JSON file : ${error}`);
    }

    console.log(`DEBUG STUDENTS`);

    students.forEach(student => {
        console.log(student);
    });

    console.log(`DEBUG COMPANIES`);

    companies.forEach(company => {
        console.log(company);
    });

    console.log(`DEBUG ROOMS`);

    rooms.forEach(room => {
        console.log(room);
    });

    console.log(`DEBUG DEMONSTRATIONTYPES`);

    demonstrationTypes.forEach(demonstrationType => {
        console.log(demonstrationType);
    });

    let provider = new TimetableProvider(students, companies);
    provider.backtracking();
}

function isCompanyKnown(companies: Company[], name: string): boolean {
    let isUnknown = false;

    companies.forEach(company => {
        if (company.getName() == name) {
            isUnknown = true;
            return;
        }
    });

    return isUnknown;
}

function getMatchingTimeslots(companyStartTime: string, companyEndTime: string): Timeslot[] {
    const timeslotValues = Object.values(Timeslot);

    const matchingTimeslots: Timeslot[] = timeslotValues.filter(value =>
        isMatchingTimeslot(companyStartTime, companyEndTime, Timeslot[value as keyof typeof Timeslot]))
        .map(value => value as Timeslot);

    return matchingTimeslots;
}

// Define the condition to filter timeslots
function isMatchingTimeslot(companyStartTime: string, companyEndTime: string, timeslotValue: Timeslot): boolean {
    if (!isNaN(timeslotValue)) {
        return false;
    }

    let companyStartDate = stringToDateTime(companyStartTime);
    let companyEndDate = stringToDateTime(companyEndTime);

    let timeslotStart = timeslotValue.toString().split('-')[0];
    let timeslotEnd = timeslotValue.toString().split('-')[1];

    let timeslotStartDate = stringToDateTime(timeslotStart);
    let timeslotEndDate = stringToDateTime(timeslotEnd);

    return timeslotStartDate >= companyStartDate && timeslotStartDate <= companyEndDate &&
        timeslotEndDate >= companyStartDate && timeslotEndDate <= companyEndDate;
}

function stringToDateTime(dateTimeString: string): Date {
    let dateTime = new Date();

    let dateTimeHour = dateTimeString.split(':')[0];
    let dateTimeMinute = dateTimeString.split(':')[1];

    dateTime.setHours(Number(dateTimeHour));
    dateTime.setMinutes(Number(dateTimeMinute));

    dateTime.setSeconds(0);

    return dateTime;
}

// Execute main for debugging purposes
main();