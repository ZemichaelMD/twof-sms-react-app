import { useQuery} from "react-query";
import { makeStyles, Button } from "@material-ui/core";
import { getAllCompanies } from "../../../../api-services/api";
import AuthService from "../../../../auth/Auth";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@material-ui/data-grid";

const useStyles = makeStyles((theme) => ({
  table: {
    height: 400,
    width: "100%",
  },
  button: {},
}));

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
      editable: false
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: false
    },
    {
      field: "balance",
      headerName: "Balance",
      width: 150,
      editable: false
    },
    {
      field: "paymentMethod",
      headerName: "Paymnet Method",
      width: 150,
      editable: false
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: false
    },
    {
      field: "change",
      headerName: "Change",
      type: "number",
      width: 300,
      editable: false,
      renderCell: (params) => (
        <strong>
         {/* {params.value} */}
         <Button
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
        </strong>
      ),
    }
  ]

  let companiesArray = [];
  //const [companies, setCompanies] = useState([]);
  //query to get list of companies
  const { data, error, status } = useQuery(
    "companies",
    () => getAllCompanies(AuthService.getCachedJwtToken()),
    { refetchOnWindowFocus: false }
  );
  console.log(status);

  //array of companies
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
          change: "",
        });
      });
      return (
        <div className={classes.table}>
          <DataGrid
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
  } else {console.log(error)
    return <h1>{error.message}! You may need to refresh token by logging back in!</h1>;
  }
}
