import { ProcessDefinition } from "../ProcessDefinition";

export class CreateDBDefinition extends ProcessDefinition {
  constructor() {
    super("Create Database", "/DB/createDB");
  }

  public execute() {}
}
