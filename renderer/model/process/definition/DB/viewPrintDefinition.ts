import { ProcessDefinition } from "../ProcessDefinition";

export class SelectTable extends ProcessDefinition {
  private tableName: string;
  private select: string;
  constructor(tableName: string, path: string, select: string) {
    super(`Select ${tableName}`, path, false);
    this.select = select;
    this.tableName = tableName;
  }

  execute() {
    console.log("execute select");

    try {
      window.electron.printSelect((event, successfullySelected, obj) => {
        console.log(obj);
      }, this.select);
    } catch (error) {
      console.error(error);
    }
  }

  onProcessFinished() {}
}
