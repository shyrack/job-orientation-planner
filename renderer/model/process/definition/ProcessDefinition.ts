export abstract class ProcessDefinition {
  constructor(private name: string, private url: string) {}

  public abstract execute(): unknown;

  public getName() {
    return this.name;
  }

  public getUrl() {
    return this.url;
  }
}
