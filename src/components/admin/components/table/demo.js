import { Button } from "@material-ui/core";

export class UseDemoData {
Columns = () => [
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

Rows = () => [
  {
    id: "c0a59fcd-f543-52fc-9c31-ecf08ba317c7",
        name: "Ethio Telecom",
        balance: 500,
        paymentMethod: "Prepaid",
        status: "Active",
        change: ""
  }
]
}

export default new UseDemoData();