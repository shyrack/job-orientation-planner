import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
  TextRun,
} from "docx";
import fs from "fs";

export function printJsonInTable(jsonData: any[], filename: string) {
  const tableRows = jsonData.map((data) => {
    const tableCells = Object.values(data).map(
      (value: any) =>
        new TableCell({
          children: [
            new Paragraph({ children: [new TextRun(value.toString())] }),
          ],
        })
    );
    return new TableRow({
      children: tableCells,
    });
  });

  const table = new Table({
    rows: tableRows,
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [table],
      },
    ],
  });

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(
      "C:/Repositories/jobv2/job-orientation-planner/electron-src/data/" +
        filename +
        ".docx",
      buffer
    );
  });
}
