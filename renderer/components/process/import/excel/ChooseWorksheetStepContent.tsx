import { StepContentProps } from "@mui/material";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import _ from "lodash";
import React from "react";
import * as xlsx from "xlsx";
import { Worksheet } from "../../../../model/excel/Worksheet";
import { useAppState } from "../../../../utils/hooks";

export default function ChooseWorksheetStepContent(props: StepContentProps) {
  const { accessedSubState: excelFiles, modifyAppState } = useAppState(
    (appState) => appState.excelFileImportProcessState.excelFiles
  );
  const [worksheets, setWorksheets] = React.useState<Array<Worksheet>>([]);

  const worksheetData = React.useMemo(
    () =>
      _.map(worksheets, (worksheet, index) => ({
        filename: worksheet.getFilename(),
        id: `worksheet-${worksheet.getName()}-${index}`,
        name: worksheet.getName(),
        sheet: worksheet
      })),
    [worksheets]
  );

  React.useEffect(() => {
    async function buildWorksheetList() {
      const worksheetFileMap = await Promise.all(
        _.map(excelFiles, async (excelFile) => {
          const excelFileText = await excelFile.text();
          const readExcelWorkbook = xlsx.read(excelFileText);

          return _.map(
            readExcelWorkbook.Sheets,
            (worksheet, worksheetName) =>
              new Worksheet(excelFile.name, worksheetName, xlsx.utils.sheet_to_json(worksheet))
          );
        })
      );

      setWorksheets(_.flatten(worksheetFileMap));
    }

    buildWorksheetList();
  }, [excelFiles, setWorksheets]);

  const onRowClick = React.useCallback(
    (gridRowParams: GridRowParams<any>) => {
      const rowIndex = _.findIndex(worksheetData, (worksheet) => worksheet.id === gridRowParams.id);
      const row = worksheetData[rowIndex];

      modifyAppState((appState) => {
        appState.excelFileImportProcessState.worksheets.push(row.sheet);
      });
    },
    [modifyAppState, worksheetData]
  );

  return (
    <DataGrid
      columns={[
        { field: "filename", headerName: "Workbook Name" },
        { field: "name", headerName: "Worksheet Name" }
      ]}
      onRowClick={onRowClick}
      rows={worksheetData}
    />
  );
}
