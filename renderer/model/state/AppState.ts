import _ from "lodash";
import { ICloneable } from "../../utils/ICloneable";

export class AppState implements ICloneable<AppState> {
  constructor() {}

  public clone() {
    const clonedInstance = new AppState();

    _.forEach(Object.keys(this) as Array<keyof AppState>, (key) => {
      clonedInstance[key] = this[key];
    });

    return clonedInstance;
  }
}
