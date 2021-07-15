import { Chart } from "react-google-charts";
import GraphHeader from "./header";

export default function CompanyGrowth() {
  return (
    <>
    <GraphHeader/>
    <Chart
      style={{
        padding: "20px",
      }}
      height={"400"}
      chartType="AreaChart"
      loader={<div>Loading Chart</div>}
      data={[
        [
          "Year",
          "Sales",
          { id: "iBottom", type: "number", role: "interval" },
          { id: "iTop", type: "number", role: "interval" },
        ],
        ["2013", 1000, 0, 1000],
        ["2014", 1170, 0, 1172],
        ["2015", 660, 0, 660],
        ["2016", 1030, 0, 1030],
      ]}
      options={{
        isStacked: false,
        height: 300,
        legend: { position: "top", maxLines: 30 },
        vAxis: { minValue: 0 },
        curveType: "function",
        intervals: { style: "area", color: "#D49464" },
      }}
      rootProps={{ "data-testid": "2" }}
    /></>
  );
}
