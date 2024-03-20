"use client";
import {
  sampleActualData,
  sampleActualDataColumns,
} from "@/lib/data/sampledata_actual_data";
import Table from "rc-table";
import { Card } from "@/components/ui/card";
import { CheckboxesDropdown } from "@/components/ui/checkboxes-dropdown";
import { FORECAST_PERIODS } from "@/lib/constants/misc";
import { useState } from "react";
import { BarChart } from "@/components/common/bar-chart";
export default function PageIndex() {
  const [data, setData] = useState(
    sampleActualData.map((entry) => ({
      data: {
        "property-code": entry["Property Code"],
        "total-revenue": entry["Total Revenue"],
        "room-revenue": entry["Room Revenue"],
        "fb-revenue": entry["F&B Revenue"],
        other: entry["Other Revenue"],
        total: entry["Total Revenue"],
      },
      title: entry.Cluster,
      code: entry["Property Code"],
      checked: true,
    }))
  );

  const handleCheckedChange = (key: string, checked: boolean) => {
    setData((prev) => {
      const clonedPrev = structuredClone(prev);
      const targetOptions = clonedPrev.find((option) => option.code === key);
      if (targetOptions) {
        targetOptions.checked = checked;
      }
      return clonedPrev;
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <Card className="flex flex-col gap-2">
        <CheckboxesDropdown
          options={data.map((entry) => ({
            checked: entry.checked,
            label: entry.title,
            value: entry.code,
          }))}
          onCheckedChange={handleCheckedChange}
        />

        <Table
          sticky
          scroll={{ x: 2000, y: 300 }}
          columns={sampleActualDataColumns.map((entry) => ({
            ...entry,
            dataIndex: entry.key,
          }))}
          data={data
            .filter((entry) => Boolean(entry.checked))
            .map((entry) => entry.data)}
          summary={() => (
            <Table.Summary>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Grand Total</Table.Summary.Cell>
                {sampleActualDataColumns.slice(1).map((col, index) => (
                  <Table.Summary.Cell key={col.key} index={index + 1}>
                    {data
                      .filter((entry) => Boolean(entry.checked))
                      .map((entry) => entry.data)
                      .reduce(
                        (acc, cur) => acc + (cur?.[col?.key as any] ?? 0),
                        0
                      )}
                  </Table.Summary.Cell>
                ))}
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>
      <div className="grid grid-cols-2 gap-2">
        <Card>
          <BarChart
            entries={data.map((entry) => ({
              title: entry.title,
              data: entry.data["fb-revenue"],
              id: entry.code,
            }))}
          />
        </Card>
        <Card>
          <BarChart
            entries={data.map((entry) => ({
              title: entry.title,
              data: entry.data["room-revenue"],
              id: entry.code,
            }))}
          />
        </Card>
      </div>
    </div>
  );
}
