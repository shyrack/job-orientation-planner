import xlsx from "xlsx";

export class Worksheet {
  constructor(private name: string, private data: Array<string>) {}

  getName() {
    return this.name;
  }

  getData() {
    return this.data;
  }
}
