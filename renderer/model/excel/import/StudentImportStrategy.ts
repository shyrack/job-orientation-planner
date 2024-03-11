import { IImportStrategy } from "./IImportStrategy";

export class StudentImportStrategy implements IImportStrategy {
  import(row: Record<string, any>) {
    return { command: "", params: [] };
  }
}
