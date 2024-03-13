import { Clear as ClearIcon } from "@mui/icons-material";
import { Card, IconButton, styled } from "@mui/material";
import { DataGrid, GridActionsCellItemProps, GridRowParams } from "@mui/x-data-grid";
import _ from "lodash";
import React from "react";
import { ProcessStepFunctionalComponentProps } from "../../../../model/process/definition/step/ProcessStepDefinition";
import { useAppState } from "../../../../utils/hooks";
import FileDropzone from "../../../common/file/FileDropzone";
import Typography from "../../../text/Typography";

const ChooseFileStepContentCard = styled(Card)(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  height: "100%",
  padding: theme.spacing(2),
  width: "100%"
}));

export default function ChooseFileStepContent(props: ProcessStepFunctionalComponentProps) {
  const [wereFilesInitiallyDropped, setWereFilesInitiallyDropped] = React.useState(false);

  const { accessedSubState: excelFiles, modifyAppState } = useAppState(
    (appState) => appState.excelFileImportProcessState.excelFiles
  );

  const normalizedDataGridRows = React.useMemo(
    () =>
      _.map(excelFiles, (excelFile, index) => ({
        id: `excel-file-${excelFile.name}-${index}`,
        name: excelFile.name,
        actions: <div />,
        file: excelFile
      })),
    [excelFiles]
  );

  const onFilesDrop = React.useCallback(
    (files: Array<File>) => {
      modifyAppState((appState) => {
        appState.excelFileImportProcessState.excelFiles.push(...files);
      });
      setWereFilesInitiallyDropped(true);
    },
    [modifyAppState, setWereFilesInitiallyDropped]
  );

  const getActions = React.useCallback(
    (
      params: GridRowParams<{
        id: string;
        name: string;
        actions: React.JSX.Element;
      }>
    ) => {
      const relatedDataGridRow = _.find(
        normalizedDataGridRows,
        (normalizedDataGridRow) => normalizedDataGridRow.id === params.id
      );

      if (relatedDataGridRow) {
        return [
          <RemoveExcelFileIcon
            file={relatedDataGridRow.file}
            icon={<ClearIcon color={"error"} />}
            label={"Entferne Datei"}
            showInMenu={false}
          />
        ];
      } else {
        throw new Error(
          `Creation of actions did not work as expected. Failed with parameters: ${JSON.stringify(params)}`
        );
      }
    },
    [normalizedDataGridRows]
  );

  return (
    <ChooseFileStepContentCard>
      <Typography variant={"h6"}>Excel-Datei Import</Typography>
      <FileDropzone onFilesDrop={onFilesDrop} text={"Excel-Dateien hierher ziehen"} validFileTypes={["xlsx"]} />
      {wereFilesInitiallyDropped && (
        <DataGrid
          columns={[
            { field: "name", headerName: "Dateiname" },
            { field: "actions", headerName: "", type: "actions", getActions: getActions }
          ]}
          rows={normalizedDataGridRows}
          rowSelection={false}
        />
      )}
    </ChooseFileStepContentCard>
  );
}

function RemoveExcelFileIcon(props: GridActionsCellItemProps & { file: File }) {
  const { file, icon } = props;

  const { accessedSubState: excelFiles, modifyAppState } = useAppState(
    (appState) => appState.excelFileImportProcessState.excelFiles
  );

  const onRemoveFile = React.useCallback(() => {
    modifyAppState((appState) => {
      _.remove(appState.excelFileImportProcessState.excelFiles, (iterationFile) => iterationFile === file);
    });
  }, [excelFiles, file, modifyAppState]);

  return <IconButton onClick={onRemoveFile}>{icon}</IconButton>;
}
