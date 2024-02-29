import { IpcMainEvent, ipcMain } from "electron";
import { Database } from "sqlite3";

let DbPath: string;

//TODO: DB ist noch auf teststand.. Room fehlt und manche Constraints 
function onCreateDatabase(event: IpcMainEvent, filepath: string) {
  DbPath = filepath;
  let errors: string[] = [];
  let successfully: boolean = true;
  function handleErrors(errorMessage: any) {
    console.error(errorMessage);
    errors.push(errorMessage);
  }

  const sql3 = require("sqlite3").verbose();
  const DB = new sql3.Database(DbPath, sql3.OPEN_READWRITE, (err: any) => {
    successfully = false;
    if (err) handleErrors(err);
  });

  // Company Table
  DB.run(
    `
CREATE TABLE Company (
    CompanyID INTEGER PRIMARY KEY,
    CompanyName TEXT NOT NULL
);`,
    (err: any) => {
      if (err) {
        handleErrors(err);
      }
    }
  );
  // Event Table
  DB.run(
    `
CREATE TABLE Event (
    EventID INTEGER PRIMARY KEY,
    EventName TEXT NOT NULL,
    Year INTEGER
);`,
    (err: any) => {
      if (err) {
        handleErrors(err);
      }
    }
  );

  DB.run(
    `
CREATE TABLE Class (
    ClassID INTEGER PRIMARY KEY,
    ClassName TEXT NOT NULL,
    Year INTEGER NOT NULL,
    UNIQUE (ClassName, Year)
);`,
    (err: any) => {
      if (err) {
        handleErrors(err);
      }
    }
  );

  // Student Table
  DB.run(
    `
CREATE TABLE Student (
    StudentID INTEGER PRIMARY KEY,
    ClassID INTEGER,
    LastName TEXT NOT NULL,
    FirstName TEXT NOT NULL,
    FOREIGN KEY (ClassID) REFERENCES Class(ClassID)
);`,
    (err: any) => {
      if (err) {
        handleErrors(err);
      }
    }
  );

  // StudentPreference Table
  DB.run(
    `
CREATE TABLE StudentPreference (
    PreferenceID INTEGER PRIMARY KEY,
    StudentID INTEGER,
    CompanyID INTEGER,
    Priority INTEGER,
    EventID INTEGER,
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID),
    FOREIGN KEY (CompanyID) REFERENCES Company(CompanyID),
    FOREIGN KEY (EventID) REFERENCES Event(EventID)
);`,
    (err: any) => {
      if (err) {
        handleErrors(err);
      }
    }
  );

  // Schedule Table
  DB.run(
    `
CREATE TABLE Schedule (
    PreferenceID INTEGER PRIMARY KEY AUTOINCREMENT,
    StudentID TEXT,
    CompanyID TEXT,
    EventID TEXT,
    Priority INTEGER,
    CONSTRAINT CHK_MaxPreferences CHECK (Priority <= 5),
    CONSTRAINT CHK_UniquePriorityEventStudent UNIQUE (Priority, EventID, StudentID),
    CONSTRAINT CHK_UniqueStudentEventCompany UNIQUE (StudentID, EventID, CompanyID),
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID),
    FOREIGN KEY (CompanyID) REFERENCES Company(CompanyID),
    FOREIGN KEY (EventID) REFERENCES Event(EventID)
);`,
    (err: any) => {
      handleErrors(err);
    }
  );

  // Attendance Table
  DB.run(
    `
CREATE TABLE TimeSlot  (
    AttendanceID INTEGER PRIMARY KEY,
    EventID INTEGER,
    StudentID INTEGER,
    CompanyID INTEGER,
    FOREIGN KEY (EventID) REFERENCES Event(EventID),
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID),
    FOREIGN KEY (CompanyID) REFERENCES Company(CompanyID)
);`,
    (err: any) => {
      handleErrors(err);
    }
  );

  console.log(errors);
  event.sender.send("database-creation", successfully, errors);
}

function onTestDatabaseConnection(event: IpcMainEvent, filepath: string) {
  DbPath = filepath;
  let db: Database;
  db = new Database(DbPath, (err: any) => {
    if (err) {
      console.error(err);
      event.sender.send("connection-database-test", false, err);
      return;
    }

    const tableNames = [
      "Student",
      "Company",
      "Event",
      "Class",
      "StudentPreference",
      "Schedule",
      "TimeSlot",
    ];

    const handleResult = (tableName: string) => (err: any, row: any) => {
      if (err) {
        console.error(err);
        event.sender.send("connection-database-test", false, err);
      } else {
        console.log(`Count for ${tableName}:`, row);
        event.sender.send("connection-database-test", true, { tableName, row });
      }
    };

    tableNames.forEach((tableName) => {
      db.get(`SELECT COUNT(*) FROM ${tableName}`, [], handleResult(tableName));
    });

    db.close((err) => {
      if (err) {
        console.error(err);
      }
    });
  });
}

function selectTable(event: IpcMainEvent, tableName: string) {
  const db = new Database(DbPath);

  db.all(`SELECT * FROM ${tableName}`, [], (err: any, rows: any) => {
    if (err) {
      console.error(err);
      event.sender.send("table-selection", false, err);
    } else {
      const jsonString = JSON.stringify(rows);
      console.log(jsonString);
      event.sender.send("table-selection", true, jsonString);
    }
  });

  db.close();
}

export function registerEventListeners() {
  ipcMain.on("create-database", onCreateDatabase);
  ipcMain.on("test-database-connection", onTestDatabaseConnection);
  ipcMain.on("select-table", selectTable);
}
