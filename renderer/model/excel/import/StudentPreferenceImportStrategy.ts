import _ from "lodash";
import { Database } from "../../../database/helper";
import { ClassBasedImportStrategy } from "./helper/ClassBasedImportStrategy";

export class StudentPreferenceImportStrategy extends ClassBasedImportStrategy {
  private eventId: number = 112;

  private async retrieveStudentId() {
    const { Name: name, Vorname: firstName } = this.parsedRow;
    const studentTable = await this.electron.retrieveTable(Database.Table.STUDENT);
    const studentIndex = _.findIndex(
      studentTable.rows as Array<any>,
      (student) => student.lastname === name && student.firstname === firstName
    );

    return (studentTable.rows[studentIndex] as any)["student_id"];
  }

  async import() {
    const {
      "Wahl 1": choiceOne,
      "Wahl 2": choiceTwo,
      "Wahl 3": choiceThree,
      "Wahl 4": choiceFour,
      "Wahl 5": choiceFive,
      "Wahl 6": choiceSix
    } = this.parsedRow;
    const choices = [choiceSix, choiceFive, choiceFour, choiceThree, choiceTwo, choiceOne];
    const studentId = await this.retrieveStudentId();
    const rows = _.map(choices, (choice, index) => ({
      student_id: studentId,
      company_id: choice,
      event_id: this.eventId,
      priority: index + 1
    }));
    const filteredRows = _.reject(rows, (row) => !Boolean(row.company_id));

    await super.createDatabaseTableRows(Database.Table.STUDENT_PREFERENCE, filteredRows);
  }

  resolveDependencies() {
    return true; // TODO: Create event for good measure
  }

  verify() {
    const {
      "Wahl 1": choiceOne,
      "Wahl 2": choiceTwo,
      "Wahl 3": choiceThree,
      "Wahl 4": choiceFour,
      "Wahl 5": choiceFive,
      "Wahl 6": choiceSix
    } = this.parsedRow;
    const choices = [choiceSix, choiceFive, choiceFour, choiceThree, choiceTwo, choiceOne];

    return _.some(choices, (choice) => Boolean(choice));
  }
}
