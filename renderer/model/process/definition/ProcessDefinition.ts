export abstract class ProcessDefinition {
  constructor(private name: string) {}

  public abstract execute();

  public getName() {
    return this.name;
  }
}
