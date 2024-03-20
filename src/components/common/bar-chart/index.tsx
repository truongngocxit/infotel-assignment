import { Axis, Bar, BarSeries, Grid, XYChart } from "@visx/xychart";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
interface Props {
  height: number;
  width: number;
}

type Data = {
  country: string;
  learners: number;
  color: string;
};

export type Entry = {
  id: React.Key;
  title: string;
  data: number;
  color?: string;
};

export interface BarChartProps {
  entries: Entry[];
}

const xAccessor = ({ title }: Entry) => title;
const yAccessor = ({ data }: Entry) => data;
const colorAccessor = ({ color }: Entry) => color ?? "#00a4d1";

export const BarChart = ({ entries }: BarChartProps) => {
  return (
    <ParentSize>
      {({ width, height }) => (
        <XYChart
          height={height || 500}
          width={width}
          xScale={{ type: "band", padding: 0.4 }}
          yScale={{ type: "linear" }}
        >
          <Grid
            columns={false}
            numTicks={4}
            lineStyle={{ stroke: "#EAEAEA" }}
          />
          <BarSeries
            dataKey="learners"
            data={entries}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            colorAccessor={colorAccessor}
            radius={4}
            radiusTop
          />
          <Axis hideAxisLine hideTicks numTicks={4} orientation="left" />
          <Axis hideAxisLine hideTicks orientation="bottom" rangePadding={10} />
        </XYChart>
      )}
    </ParentSize>
  );
};
