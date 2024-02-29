import Panel from "../../components/process/Panel";
import PageProvider from "../../components/provider/PageProvider";
import { SelectTable } from "../../model/process/definition/table/tableProcessDefinition";

type TestProps = {};

const Class = new SelectTable("Class", "/Table/tables");
const Table_Student = new SelectTable("Student", "/Table/tables");
const Table_StudentPreference = new SelectTable("StudentPreference", "/Table/tables");
const Table_Schedule = new SelectTable("Schedule", "/Table/tables");
const Table_TimeSlot = new SelectTable("TimeSlot", "/Table/tables");
const Table_Company = new SelectTable("Company", "/Table/tables");
const Table_Event = new SelectTable("Event", "/Table/tables");

const tablesList = [
  Class,
  Table_Student,
  Table_StudentPreference,
  Table_Schedule,
  Table_TimeSlot,
  Table_Student,
  Table_Company,
  Table_Event
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
