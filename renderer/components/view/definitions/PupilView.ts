import { GridColDef } from "@mui/x-data-grid";

const view: { columns: GridColDef[]; rows: any[] } = {
  columns: [
    {
      field: "id",
      headerName: "ID",
      width: 90
    },
    {
      field: "klasse",
      headerName: "Klasse",
      width: 150
    },
    {
      field: "name",
      headerName: "Name",
      width: 150
    },
    {
      field: "vorname",
      headerName: "Vorname",
      width: 150
    }
  ],
  rows: [
    {
      id: 1,
      klasse: "ITF211",
      name: "Jahn",
      vorname: "Florian"
    },
    {
      id: 2,
      klasse: "ITF212",
      name: "Deider",
      vorname: "Kevin"
    },
    {
      id: 3,
      klasse: "ITF211",
      name: "Burjakov",
      vorname: "Paul"
    },
    {
      id: 4,
      klasse: "ITF213",
      name: "Diebert",
      vorname: "Franz"
    },
    {
      id: 5,
      klasse: "ITF213",
      name: "Löwen",
      vorname: "Andre"
    },
    {
      id: 6,
      klasse: "ITF214",
      name: "Doe",
      vorname: "John"
    }
  ]
};

export default view;
