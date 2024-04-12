import Panel from "../../components/process/Panel";
import PageProvider from "../../components/provider/PageProvider";
import { SelectTable } from "../../model/process/definition/DB/viewPrintDefinition";

type TestProps = {};

const view1 = `SELECT 
name AS Klasse,
entry_year AS Einschulungsjahr
FROM Class;`;

const view2 = `SELECT 
name AS Unternehmen,
job_occupation AS Beruf
FROM Company;`;
const view3 = `SELECT 
name AS Name
FROM Event;`;
const view4 = `SELECT 
name AS RaumNummer,
student_capacity AS Kapazität
FROM Room;`;
const view5 = `SELECT 
timeslot_start AS ZeitStart,
timeslot_end AS ZeitEnde
FROM Scheduler;`;
const view6 = `SELECT 
Student.firstname || ' ' || Student.lastname AS Schüler,
Company.name || ' ' || Company.job_occupation AS Veranstaltung,
StudentPreference.priority AS Priorität
FROM StudentPreference
  LEFT OUTER JOIN Student ON StudentPreference.student_id = Student.student_id
  LEFT OUTER JOIN Company ON StudentPreference.company_id = Company.company_id;
`;

const view7 = `SELECT 
Student.firstname || ' ' || Student.lastname 					AS Schüler,
Class.name 														AS SchülerKlasse,
Room.name 														AS Raum,
Scheduler.timeslot_start || ' - ' || Scheduler.timeslot_end 	AS Zeitraum,
Company.name || ' ' || Company.job_occupation 					AS Veranstaltung,
Event.name 														AS Veranstaltungstag
FROM StudentAppointment
  LEFT OUTER JOIN Student ON StudentAppointment.student_id = Student.student_id
  LEFT OUTER JOIN Class ON Student.class_id = Class.class_id
  LEFT OUTER JOIN Timeslot ON StudentAppointment.timeslot_id = Timeslot.timeslot_id
  LEFT OUTER JOIN Scheduler ON Timeslot.scheduler_id = Scheduler.scheduler_id
  LEFT OUTER JOIN Room ON Timeslot.room_id = Room.room_id
  LEFT OUTER JOIN Event ON Timeslot.event_id = Event.event_id
  LEFT OUTER JOIN Company ON Timeslot.company_id = Company.company_id;`;
const view8 = `SELECT 
Scheduler.timeslot_start || ' - ' || Scheduler.timeslot_end 	AS Zeitraum,
Room.name 														AS Raum,
Company.name || ' ' ||Company.job_occupation 							AS Veranstaltung,
Event.name 														AS Veranstaltungstag
FROM Timeslot
  LEFT OUTER JOIN Scheduler ON Timeslot.scheduler_id = Scheduler.scheduler_id
  LEFT OUTER JOIN Room ON Timeslot.room_id = Room.room_id
  LEFT OUTER JOIN Event ON Timeslot.event_id = Event.event_id
  LEFT OUTER JOIN Company ON Timeslot.company_id = Company.company_id;`;

const Table_Class = new SelectTable("View1", "/Table/tables", view1);
const Table_Company = new SelectTable("View2", "/Table/tables", view2);
const Table_Event = new SelectTable("View3", "/Table/tables", view3);
const Table_Room = new SelectTable("View4", "/Table/tables", view4);
const Table_Scheduler = new SelectTable("View5", "/Table/tables", view5);
const Table_Student = new SelectTable("View6", "/Table/tables", view6);
const Table_StudentPreference = new SelectTable("View7", "/Table/tables", view7);
const Table_Timeslot = new SelectTable("View8", "/Table/tables", view8);

const tableNames = [
  "Class",
  "Company",
  "Event",
  "Room",
  "Scheduler",
  "Student",
  "StudentPreference",
  "Timeslot",
];

const tablesList = [
  Table_Class
  , Table_Company
  , Table_Event
  , Table_Room
  , Table_Scheduler
  , Table_Student
  , Table_StudentPreference
  , Table_Timeslot
];

function selectTable(dbPath: string) {
  console.log("execute create");
  try {
    window.electron.selectTable((event, successfullySelected, obj) => {
      console.log(obj);
    }, "Company");
  } catch (error) {
    console.error(error);
  }
}

export default function Tables(props: TestProps) {
  return (
    <PageProvider>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {tablesList.map((table, index) => (
          <Panel key={index} processDefinition={table} />
        ))}
      </div>
    </PageProvider>
  );
}
