import Panel from "../../components/process/Panel";
import PageProvider from "../../components/provider/PageProvider";
import { SelectTable } from "../../model/process/definition/table/tableProcessDefinition";

type TestProps = {};

const Table_Class = new SelectTable("Class", "/Table/tables");
const Table_Company = new SelectTable("Company", "/Table/tables");
const Table_Event = new SelectTable("Event", "/Table/tables");
const Table_Room = new SelectTable("Room", "/Table/tables");
const Table_Scheduler = new SelectTable("Scheduler", "/Table/tables");
const Table_Student = new SelectTable("Student", "/Table/tables");
const Table_StudentPreference = new SelectTable("StudentPreference", "/Table/tables");
const Table_Timeslot = new SelectTable("Timeslot", "/Table/tables");

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
