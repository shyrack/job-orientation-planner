import { ProcessDefinition } from "./ProcessDefinition";

export class ViewTestProcessDefinition extends ProcessDefinition {
  constructor() {
    super("View test process", "/process/view");
  }

  execute() {}
  onProcessFinished() {}
}
