
import DataTable from "./table/table";
import InfoBox from "./table/info";

import AddCompany from "./add-company";
export default function Companies() {
  return (
    <div className = "root">
      <InfoBox />
      <DataTable />
      <AddCompany />
    </div>
  );
}
