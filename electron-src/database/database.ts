import { IpcMainEvent, ipcMain } from "electron";
import { Database } from "sqlite3";

let DbPath: string;

//TODO: Constraints
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
    company_id        INTEGER PRIMARY KEY,
    name              TEXT NOT NULL,
    job_occupation    TEXT NOT NULL,
    timeslot_start    TEXT NOT NULL,
    timeslot_end      TEXT NOT NULL
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
    event_id          INTEGER PRIMARY KEY,
    name              TEXT NOT NULL,

    UNIQUE (name)
);`,
    (err: any) => {
      if (err) {
        handleErrors(err);
      }
    }
  );

  // Class Table
  DB.run(
    `
CREATE TABLE Class (
    class_id        INTEGER PRIMARY KEY,
    name            TEXT NOT NULL,
    entry_year      INTEGER NOT NULL,

    UNIQUE (name, entry_year)
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
    student_id      INTEGER PRIMARY KEY,
    class_id        INTEGER,
    firstname       TEXT NOT NULL,
    lastname        TEXT NOT NULL,

    FOREIGN KEY (class_id) REFERENCES Class(class_id)
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
    studentpreference_id     INTEGER PRIMARY KEY,
    student_id               INTEGER NOT NULL,
    company_id               INTEGER NOT NULL,
    event_id                 INTEGER NOT NULL,
    priority                 INTEGER NOT NULL,

    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (company_id) REFERENCES Company(company_id),
    FOREIGN KEY (event_id)   REFERENCES Event(event_id)
);`,
    (err: any) => {
      if (err) {
        handleErrors(err);
      }
    }
  );

  // Room Table
  DB.run(
    `
CREATE TABLE Room (
    room_id               INTEGER PRIMARY KEY,
    name                  TEXT NOT NULL,
    student_capacity      INTEGER NOT NULL
);`,
    (err: any) => {
      if (err) {
        handleErrors(err);
      }
    }
  );

  // Scheduler Table
  DB.run(
    `
  CREATE TABLE Scheduler (
    scheduler_id          INTEGER PRIMARY KEY,
    timeslot_start        TEXT NOT NULL,
    timeslot_end          INTEGER NOT NULL
  );`,
    (err: any) => {
      if (err) {
        handleErrors(err);
      }
    }
  );

  // Timeslot Table
  DB.run(
    `
  CREATE TABLE Timeslot (
      timeslot_id           INTEGER PRIMARY KEY,
      room_id               INTEGER NOT NULL,
      company_id            INTEGER NOT NULL,
      event_id              INTEGER NOT NULL,
      scheduler_id           INTEGER NOT NULL,

      FOREIGN KEY (scheduler_id) REFERENCES Scheduler(scheduler_id),
      FOREIGN KEY (room_id) REFERENCES Room(room_id),
      FOREIGN KEY (company_id) REFERENCES Company(company_id),
      FOREIGN KEY (event_id) REFERENCES Event(event_id)
  );`,
    (err: any) => {
      if (err) {
        handleErrors(err);
      }
    }
  );

  // Timeslot Table
  DB.run(
    `
    CREATE TABLE StudentAppointment (
        appointment_id        INTEGER PRIMARY KEY,
        student_id            INTEGER NOT NULL,
        timeslot_id           INTEGER NOT NULL,
  
        FOREIGN KEY (student_id) REFERENCES Student(student_id),
        FOREIGN KEY (timeslot_id) REFERENCES Schedule(timeslot_id)
    );`,
    (err: any) => {
      if (err) {
        handleErrors(err);
      }
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

    const tableNames = ["Class", "Company", "Event", "Room", "Scheduler", "Student", "StudentPreference", "Timeslot"];

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

function createRow(event: IpcMainEvent, tableName: string, data: any) {
  const db = new Database(DbPath);

  const keys = Object.keys(data).join(", ");
  const values = Object.values(data)
    .map(() => "?")
    .join(", ");

  const sql = `INSERT INTO ${tableName} (${keys}) VALUES (${values})`;

  db.run(sql, Object.values(data), (err: any) => {
    if (err) {
      console.error(err);
      event.sender.send(`${tableName}-creation`, false, err);
    } else {
      event.sender.send(`${tableName}-creation`, true, null);
    }
  });

  db.close();
}

export function registerEventListeners() {
  ipcMain.on("create-database", onCreateDatabase);
  ipcMain.on("test-database-connection", onTestDatabaseConnection);
  ipcMain.on("select-table", selectTable);
  //CREATE ROW
  ipcMain.on("create-class", (event, data) => createRow(event, "Class", data));
  ipcMain.on("create-company", (event, data) => createRow(event, "Company", data));
  ipcMain.on("create-event", (event, data) => createRow(event, "Event", data));
  ipcMain.on("create-room", (event, data) => createRow(event, "Room", data));
  ipcMain.on("create-scheduler", (event, data) => createRow(event, "Scheduler", data));
  ipcMain.on("create-student", (event, data) => createRow(event, "Student", data));
  ipcMain.on("create-appointment", (event, data) => createRow(event, "StudentAppointment", data));
  ipcMain.on("create-studentpreference", (event, data) => createRow(event, "StudentPreference", data));
  ipcMain.on("create-timeslot", (event, data) => createRow(event, "Timeslot", data));
}
