"use client";
import {
  sampleActualData,
  sampleActualDataColumns,
} from "@/lib/data/sampledata_actual_data";
import Table from "rc-table";
import { Card } from "@/components/ui/card";
import { CheckboxesDropdown } from "@/components/ui/checkboxes-dropdown";

import { useMemo, useState } from "react";
import { BarChart } from "@/components/common/bar-chart";

export default function PageIndex() {
  const [data, setData] = useState<
    {
      data: Record<string, string | number>;
      title: string;
      code: string;
      checked: boolean;
    }[]
  >(
    sampleActualData.map((entry, index) => ({
      data: {
        "total-room": entry["Total Room in Hotel"],
        "property-code": entry["Property Code"],
        "total-revenue": entry["Total Revenue"],
        "room-revenue": entry["Room Revenue"],
        "fb-revenue": entry["F&B Revenue"],
        "other-revenue": entry["Other Revenue"],
        "hotel-room": entry["Hotel Room"],
        occ: entry["Occ %"],
        "available-room": entry["Available Rooms"],
        "rev-occupied-rooms": entry.Rev["Occupied Room"],
        "rev-transient-rooms": entry.Rev["Transient Rooms"],
        "rev-group-rooms": entry.Rev["Group Rooms"],
        "rn-occupied-rooms": entry.RN["Occupied Room"],
        "rn-transient-rooms": entry.RN["Transient Rooms"],
        "rn-group-rooms": entry.RN["Group Rooms"],
        "adr-occupied-rooms": entry["ADR %"]["Occupied Room"],
        "adr-transient-rooms": entry["ADR %"]["Transient Rooms"],
        "adr-group-rooms": entry["ADR %"]["Group Rooms"],
      },
      title: entry.Cluster,
      code: entry["Property Code"],
      checked: index < 5,
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

  const filteredData = useMemo(
    () => data.filter((entry) => Boolean(entry.checked)),
    [data]
  );

  const flattenedDataColumns = sampleActualDataColumns.reduce<
    typeof sampleActualDataColumns
  >((acc, cur) => {
    if (!Array.isArray(cur.children)) {
      return [...acc, cur];
    }
    return [...acc, ...cur.children];
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Card className="flex flex-col gap-2">
        <span className="text-2xl font-bold">Sales forecast</span>

        <CheckboxesDropdown
          options={data.map((entry) => ({
            checked: entry.checked,
            label: `${entry.title} - ${entry.code}`,
            value: entry.code,
          }))}
          onCheckedChange={handleCheckedChange}
          label={"Select properties..."}
          className={"ml-auto"}
        />

        <Table
          sticky
          scroll={{ x: 2000, y: 500 }}
          columns={sampleActualDataColumns}
          data={data
            .filter((entry) => Boolean(entry.checked))
            .map((entry) =>
              Object.fromEntries(
                Object.entries(entry.data).map(([key, value]) => [
                  key,
                  value.toLocaleString(),
                ])
              )
            )}
          summary={() => (
            <Table.Summary>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  <span className="font-bold">Grand Total</span>
                </Table.Summary.Cell>
                {flattenedDataColumns.slice(1).map((col, index) => (
                  <Table.Summary.Cell key={col.key} index={index + 1}>
                    {filteredData
                      .map((entry) => entry.data)
                      .reduce(
                        (acc, cur) => acc + Number(cur?.[col?.key] ?? 0),
                        0
                      )
                      .toLocaleString()}
                  </Table.Summary.Cell>
                ))}
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>
      <div className="grid grid-cols-2 gap-4">
        <Card className="flex flex-col gap-4">
          <span className="text-2xl font-bold">Room revenue</span>

          <BarChart
            entries={filteredData.map((entry) => ({
              title: `${entry.title} - ${entry.code}`,
              data: entry.data["room-revenue"],
              id: entry.code,
            }))}
          />
        </Card>
        <Card className="flex flex-col gap-4">
          <span className="text-2xl font-bold">Sales forecast</span>
          <BarChart
            entries={filteredData.map((entry) => ({
              title: `${entry.title} - ${entry.code}`,
              data: entry.data["room-revenue"],
              id: entry.code,
            }))}
          />
        </Card>
      </div>
    </div>
  );
}
