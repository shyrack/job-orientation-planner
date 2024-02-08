import { ProcessDefinition } from "./ProcessDefinition";

export class TestProcessDefinition extends ProcessDefinition {
  constructor() {
    super("Test process", "/process/test");
  }

  public execute() {}
}
