export class Worksheet {
  constructor(private filename: string, private name: string, private data: Array<string>) {}

  getFilename() {
    return this.filename;
  }

  getName() {
    return this.name;
  }

  getData() {
    return this.data;
  }
}
