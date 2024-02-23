import {
  ProcessStepDefinition,
  ProcessStepFunctionalComponentProps
} from "./ProcessStepDefinition";
import View from "../../../../components/view/View";

export class ViewTestProcessStepDefinition extends ProcessStepDefinition {
  constructor() {
    super("View test process step");
  }

  public validate() {
    return false;
  }

  public getStepContentFunctionalComponent() {
    return View;
  }
}
