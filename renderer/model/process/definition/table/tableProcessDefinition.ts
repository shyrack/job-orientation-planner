import { ProcessDefinition } from "../ProcessDefinition";

export class SelectTable extends ProcessDefinition {
  private tableName: string;

  constructor(tableName: string, path: string) {
    super(`Select ${tableName}`, path);
    this.tableName = tableName;
  }

  public execute() {
    //TODO: This doesnt work? Security Warning? obj too big?
    console.log("execute select");

    try {
      window.electron.selectTable((event, successfullySelected, obj) => {
        console.log(obj);
      }, this.tableName);
    } catch (error) {
      console.error(error);
    }
  }
}
