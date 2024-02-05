export abstract class ProcessDefinition {
  constructor(private name: string) {}

  public abstract execute(): unknown;

  public getName() {
    return this.name;
  }
}
