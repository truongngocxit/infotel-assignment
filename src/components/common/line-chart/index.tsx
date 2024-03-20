"use client";
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from "@visx/xychart";
import { format } from "date-fns";

const accessors = {
  xAccessor: (d: any) => new Date(`${d.x}T00:00:00`),
  yAccessor: (d: any) => d.y,
};
const tickLabelOffset = 10;

export interface LineChartProps {
  entries: {
    id: React.Key;
    data: {
      y: number;
      x: string;
    }[];
    settings?: {
      strokeColor?: string;
    };
  }[];
  height?: number;
}

export const LineChart = ({ entries, height }: LineChartProps) => {
  return (
    <XYChart
      // height={height}
      xScale={{ type: "time" }}
      yScale={{ type: "linear" }}
    >
      <AnimatedGrid
        columns={false}
        numTicks={4}
        lineStyle={{
          stroke: "#e1e1e1",
          strokeLinecap: "round",
          strokeWidth: 1,
        }}
        strokeDasharray="0, 4"
      />
      <AnimatedAxis
        stroke="#e1e1e1"
        orientation="bottom"
        tickLabelProps={() => ({ dy: tickLabelOffset })}
      />
      <AnimatedAxis
        stroke="#e1e1e1"
        orientation="left"
        tickLabelProps={() => ({ dx: -10 })}
      />
      {entries.map((entry) => (
        <AnimatedLineSeries
          key={entry.id}
          stroke={entry?.settings?.strokeColor ?? "#27aae1"}
          dataKey={`${entry.id}`}
          data={entry.data}
          {...accessors}
        />
      ))}

      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        applyPositionStyle
        showVerticalCrosshair
        showSeriesGlyphs
        glyphStyle={{
          fill: "#219ebc",
          strokeWidth: 0,
        }}
        renderTooltip={({ tooltipData }) => {
          return (
            <div>
              {tooltipData &&
                Object.entries(tooltipData?.datumByKey).map((lineDataArray) => {
                  const [key, value] = lineDataArray;

                  return (
                    <div className="row" key={key}>
                      <div className="date">
                        {format(accessors.xAccessor(value.datum), "MMM d")}
                      </div>
                      <div className="value">
                        {/* <ColoredSquare color="#008561" /> */}
                        {accessors.yAccessor(value.datum)}
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        }}
      />
    </XYChart>
  );
};
