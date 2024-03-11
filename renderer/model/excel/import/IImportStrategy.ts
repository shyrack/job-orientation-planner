export interface IImportStrategy {
  import(row: Record<string, any>): { command: string; params: Array<string> };
}
