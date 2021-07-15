import DataTable from "./table/table";
import InfoBox from "./table/info";

export default function Companies() {
  return (
    <div className = "root">
      <InfoBox />
      <DataTable />
    </div>
  );
}
