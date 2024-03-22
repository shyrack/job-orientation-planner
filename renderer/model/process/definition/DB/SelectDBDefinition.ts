import { ProcessDefinition } from "../ProcessDefinition";

export class SelectDBDefinition extends ProcessDefinition {
  constructor() {
    super("Select Database", "/DB/selectDB");
  }

  public execute() {}

  onProcessFinished() {}
}
