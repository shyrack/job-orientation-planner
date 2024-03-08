import {
  ProcessStepDefinition,
  ProcessStepFunctionalComponentProps
} from "./ProcessStepDefinition";
import View from "../../../../components/view/View";
import { AppState, AvailableViews } from "../../../state/AppState";
import { Nullable } from "../../../../utils/types";

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

  public getStepContentFunctionalComponent(): (
    props: ProcessStepFunctionalComponentProps
  ) => Nullable<React.JSX.Element> {
    return View;
  }
}
