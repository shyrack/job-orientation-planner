export abstract class ProcessDefinition {
  constructor(private name: string, private url: string) {}

  public getName() {
    return this.name;
  }

  public getUrl() {
    return this.url;
  }

  abstract execute(): void;
  abstract onProcessFinished(): void;
}
