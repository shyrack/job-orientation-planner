import { StepContentProps } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import _ from "lodash";
import React from "react";
import * as xlsx from "xlsx";
import { Worksheet } from "../../../../model/excel/Worksheet";
import { useAppState } from "../../../../utils/hooks";

export default function ChooseWorksheetStepContent(props: StepContentProps) {
  const { accessedSubState: excelFiles } = useAppState((appState) => appState.excelFileImportProcessState.excelFiles);

  const buildWorksheetList = React.useCallback(async () => {
    const worksheetMap = await Promise.all(
      _.map(excelFiles, async (excelFile) => {
        const excelFileText = await excelFile.text();
        const readExcelWorkbook = xlsx.read(excelFileText);

        return _.map(
          readExcelWorkbook.Sheets,
          (worksheet, worksheetName) => new Worksheet(worksheetName, xlsx.utils.sheet_to_json(worksheet))
        );
      })
    );

    return _.flatten(worksheetMap);
  }, [excelFiles]);

  const worksheets = React.useMemo(() => buildWorksheetList(), [buildWorksheetList]);

  return <DataGrid columns={[]} rows={[]} />;
}
