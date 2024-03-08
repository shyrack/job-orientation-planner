import { StepContentProps } from "@mui/material";
import _ from "lodash";
import React from "react";
import xlsx from "xlsx";
import { Worksheet } from "../../../../model/excel/Worksheet";
import { useAppState } from "../../../../utils/hooks";

export default function ChooseWorksheetStepContent(props: StepContentProps) {
  const { accessedSubState: excelFiles } = useAppState((appState) => appState.excelFileImportProcessState.excelFiles);

  const buildWorksheetList = React.useCallback(() => {
    return _.union(
      ..._.map(excelFiles, (excelFile) => {
        const readExcelWorkbook = xlsx.read(excelFile.text);
        return _.map(
          readExcelWorkbook.Sheets,
          (worksheet, worksheetName) => new Worksheet(worksheetName, xlsx.utils.sheet_to_json(worksheet))
        );
      })
    );
  }, [excelFiles]);

  const worksheets = React.useMemo(() => buildWorksheetList(), [buildWorksheetList]);

  // return <DataGrid columns={} />;
  return null;
}
