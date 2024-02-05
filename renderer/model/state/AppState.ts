import _ from "lodash";
import { ICloneable } from "../../utils/ICloneable";

export class AppState implements ICloneable<AppState> {
  constructor() {}

  public clone() {
    return Object.create(this);
  }

  public cloneAndModify(modifier: (appState: AppState) => void) {
    const clonedInstance = this.clone();
    modifier(clonedInstance);

    return clonedInstance;
  }
}
