import { IpcMainEvent, ipcMain } from "electron";
import _ from "lodash";
import { Database, RunResult, verbose } from "sqlite3";

export enum Table {
  CLASS = "Class",
  COMPANY = "Company",
  EVENT = "Event",
  ROOM = "Room",
  SCHEDULER = "Scheduler",
  STUDENT = "Student",
  STUDENT_APPOINTMENT = "StudentAppointment",
  STUDENT_PREFERENCE = "StudentPreference",
  TIME_SLOT = "Timeslot"
}

let DATABASE_PATH: string;

//TODO: Constraints
function onCreateDatabase(event: IpcMainEvent, filepath: string) {
  DATABASE_PATH = filepath;
  let errors: string[] = [];
  let successfully: boolean = true;
  function handleErrors(errorMessage: any) {
    console.error(errorMessage);
    errors.push(errorMessage);
  }

  const sql3 = verbose();
  const DB = new sql3.Database(DATABASE_PATH, sql3.OPEN_READWRITE, (err: any) => {
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
  DATABASE_PATH = filepath;
  let db: Database;
  db = new Database(DATABASE_PATH, (err: any) => {
    if (err) {
      console.error(err);
      event.sender.send("connection-database-test", false, err);
      return;
    }

    const tableNames = _.keys(Table);

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
  const db = new Database(DATABASE_PATH);

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

function makeOperation<T, U>(operable: (param: T) => U, responseChannel: string) {
  return async function (event: IpcMainEvent, operationId: string, param: T) {
    const result = await operable(param);
    event.sender.send(responseChannel, operationId, result);
  };
}

function createRow(event: IpcMainEvent, tableName: string, data: any) {
  const db = new Database(DATABASE_PATH);
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

export function createTableRows(
  event: IpcMainEvent,
  table: Table,
  rows: Array<Record<string, any>>,
  operationId: string
) {
  function commandCallback(_ignore: RunResult, error: Error | null) {
    console.log("_ignore", _ignore);
    console.log("error", error);
    event.sender.send(`row-creations`, operationId, !Boolean(error), error);
  }

  executeDatabaseOperation((database) => {
    _.forEach(rows, (row) => {
      const columns = _.keys(row);
      const values = _.values(row).join(", ");
      const questionMarks = _.map(columns, () => "?").join(", ");
      const command = `INSERT INTO ${table} (${questionMarks}) VALUES (${values})`;

      console.log("command", command);

      database.run(command, _.values(row), commandCallback);
    });
  });
}

function executeDatabaseOperation(databaseOperation: (database: Database) => any) {
  const database = new Database(DATABASE_PATH);
  databaseOperation(database);
  database.close();
}

function retrieveTable(table: Table) {
  const db = new Database(DATABASE_PATH);

  return new Promise<{ error: Error | null; rows: Array<unknown> }>((resolve) => {
    function onDatabaseResponse(error: Error | null, rows: Array<unknown>) {
      resolve({
        error,
        rows
      });
    }

    db.all(`SELECT * FROM ${table}`, [], onDatabaseResponse);
    db.close();
  });
}

export function registerEventListeners() {
  ipcMain.on("create-database", onCreateDatabase);
  ipcMain.on("test-database-connection", onTestDatabaseConnection);
  ipcMain.on("select-table", selectTable);

  // Create row
  const tables = _.keys(Table) as Array<keyof typeof Table>;
  _.forEach(tables, (table) => {
    const tableName = Table[table];
    ipcMain.on(`create-${tableName.toLowerCase()}`, (event, data) => createRow(event, tableName, data));
  });

  // Create rows
  ipcMain.on("create-table-rows", createTableRows);

  // Testing code
  ipcMain.on("retrieve-table", makeOperation(retrieveTable, "table-retrieved"));
}
