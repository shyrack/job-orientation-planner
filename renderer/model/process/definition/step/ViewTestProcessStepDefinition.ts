import {
  ProcessStepDefinition,
  ProcessStepFunctionalComponentProps,
} from "./ProcessStepDefinition";
import View from "../../../../components/view/View";
import { AppState } from "../../../state/AppState";

export class ViewTestProcessStepDefinition extends ProcessStepDefinition {
  constructor(private viewName: string, stepLabel: string) {
    super(stepLabel);
  }

  public execute() {
    AppState.modifyAppState((appState) => {
      appState.viewName = this.viewName;
    });
  }

  public validate() {
    return false;
  }

  public getStepContentFunctionalComponent() {
    return View;
  }
}
