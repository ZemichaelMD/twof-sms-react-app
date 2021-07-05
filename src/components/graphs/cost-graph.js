import { Chart } from "react-google-charts";

import GraphHeader from "./header";

export default function CostGraph() {
  return (
    <>
    <GraphHeader/>
    <Chart
    style={{
      padding:'20px'
    }}

      height={'400px'}
      chartType="Bar"
      loader={<div>Loading Chart</div>}
      data={[
        ['Month', 'Cost'],
        ['2014', 1000],
        ['2015', 1170],
        ['2016', 660],
        ['2017', 1030],
      ]}

      options={{
        // Material design options
        chart: {
          title: 'Cost',
          subtitle: 'Last seven days cost Graph',
        },
      }}
      // For tests
      rootProps={{ 'data-testid': '2' }}
    />
</>
  )
}

