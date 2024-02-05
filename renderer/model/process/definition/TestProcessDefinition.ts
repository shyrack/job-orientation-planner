import { ProcessDefinition } from "./ProcessDefinition";

export class TestProcessDefinition extends ProcessDefinition {
  constructor(name: string, url: string) {
    super(name, url);
  }

  public execute() {}
}
