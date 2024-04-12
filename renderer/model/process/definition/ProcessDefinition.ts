export abstract class ProcessDefinition {
  constructor(
    private name: string,
    private url: string,
    private isRouter: boolean = true
  ) {}

  public getName() {
    return this.name;
  }

  public getIsRouter() {
    return this.isRouter;
  }

  public getUrl() {
    return this.url;
  }

  abstract execute(): void;
  abstract onProcessFinished(): void;
}
