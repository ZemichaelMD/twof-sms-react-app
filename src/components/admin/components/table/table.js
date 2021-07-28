import { useQuery } from "react-query";
import { makeStyles, Button } from "@material-ui/core";
import clsx from "clsx";
import { getAllCompanies } from "../../../../api-services/api";
import AuthService from "../../../../auth/Auth";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@material-ui/data-grid";

const useStyles = makeStyles({
  root: {
    "& .status": {
      "&.active": {
        color: "green",
        fontWeight: "600",
        textTransform: "capitalize",
      },
      "&.blocked": {
        color: "Red",
        fontWeight: "600",
        textTransform: "capitalize",
      },
    },
  },
  table: {
    height: 400,
    width: "100%",
  },
});

function handleChangeStatus(id) {
  return console.log("clicked" + id);
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function ColumnSelectorGrid() {
  const classes = useStyles();
  const Columns = [
    {
      field: "id",
      hide: true,
      editable: false,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: false,
    },
    {
      field: "balance",
      headerName: "Balance",
      width: 150,
      editable: false,
    },
    {
      field: "paymentMethod",
      headerName: "Paymnet Method",
      width: 150,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: false,
      cellClassName: (params) =>
        clsx("status", {
          active: params.value === "active",
          blocked: params.value === "blocked",
        }),
    },

    {
      field: "change",
      headerName: "Change",
      type: "number",
      width: 300,
      editable: false,

      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          const api = params.api;
          const fields = api
            .getAllColumns()
            .map((c) => c.field)
            .filter((c) => c !== "__check__" && !!c);
          const thisRow = {};

          fields.forEach((f) => {
            thisRow[f] = params.value;
          });
          return alert(JSON.stringify(thisRow, null, 4));
        };

        return (
          <>
            <Button
              onClick= {onClick}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
            >
              Change Status
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
            >
              Open
            </Button>
          </>
        );
      },
    },
  ];

  let companiesArray = [];
  //query to get list of companies
  const { isFetching, data, error, status } = useQuery(
    "companies",
    async () => await getAllCompanies(AuthService.getCachedJwtToken()),
    { refetchOnWindowFocus: false }
  );
  console.log(status);

  if (status === "success") {
    const rowData = data.data.data;
    try {
      rowData.map((rowItem) => {
        companiesArray.push({
          id: rowItem.id,
          name: rowItem.company_name,
          balance: rowItem.balance,
          paymentMethod: rowItem.payment_type,
          status: rowItem.status,
          change: rowItem.id,
        });
      });
      return (
        <div className={classes.table}>
          <DataGrid
            className={classes.root}
            rows={companiesArray}
            columns={Columns}
            components={{
              Toolbar: CustomToolbar,
            }}
          />
        </div>
      );
    } catch (error) {
      return console.log(error);
    }
  } else if (isFetching) {
    return <h1>Loading... Please wait!</h1>;
  } else {
    console.log(error);
    return <h1>{error.message}</h1>;
  }
}
