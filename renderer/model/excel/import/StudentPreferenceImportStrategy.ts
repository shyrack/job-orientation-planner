import { IImportStrategy } from "./IImportStrategy";

export class StudentPreferenceImportStrategy implements IImportStrategy {
  import(row: Record<string, any>) {
    return { command: "", params: [] };
  }
}
