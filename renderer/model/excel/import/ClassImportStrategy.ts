import { IImportStrategy } from "./IImportStrategy";

export class ClassImportStrategy implements IImportStrategy {
  import(row: Record<string, any>) {
    return { command: "", params: [] };
  }
}
