"use client";
import { dashboardSampleV0_4MealDetailData as SAMPLE_DATA } from "@/lib/data/sampledata_meal_detail";
import { PlusIcon, MinusIcon } from "@/components/icons";
import { Card } from "@/components/ui/card";

import Table from "rc-table";

import { COST_SUMMARY_COLUMNS } from "@/lib/constants/tables";

const BY_DATE_COLUMNS = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  ...COST_SUMMARY_COLUMNS,
];

const BY_RVC_COLUMNS = [
  {
    title: "RVC",
    dataIndex: "outlet_code",
    key: "outlet_code",
  },
  ...COST_SUMMARY_COLUMNS,
];

const BY_MEALS_COLUMNS = [
  {
    title: "Period",
    dataIndex: "period",
    key: "period",
  },
  ...COST_SUMMARY_COLUMNS,
];

const getCostData = (entry: Record<string, any>) => {
  return {
    // date: entry.report_date,
    ...entry,
    adults_sales: entry.total.adults_actual.sales,
    children_sales: entry.total.children_actual.sales,
    adults_count: entry.total.adults_actual.count,
    children_count: entry.total.children_actual.count,
    total_count: entry.total.total_actual.count,
    percentage_count: entry.total.total_actual.percentage_count,
    sales: entry.total.total_actual.sales,
    percentage_sales: entry.total.total_actual.percentage_sales,
  };
};

export default function PageIndex() {
  return (
    <Card>
      <Table
        rowKey={"name"}
        columns={BY_DATE_COLUMNS}
        data={SAMPLE_DATA.map((entry) => ({
          data: entry.report_date,
          ...getCostData(entry),
        }))}
        expandable={{
          expandRowByClick: true,
          defaultExpandAllRows: true,
          expandIcon: ({ expanded, onExpand, record }) => (
            <button
              className="border rounded-md w-5 h-5 flex items-center"
              onClick={(e) => onExpand(record, e)}
            >
              {expanded ? (
                <MinusIcon className="w-full" />
              ) : (
                <PlusIcon className="w-full" />
              )}
            </button>
          ),
          expandedRowRender: (record, index, indent, expanded) => {
            return expanded ? (
              <Table
                columns={BY_RVC_COLUMNS}
                data={record.outlet.map((outlet) => ({
                  outlet_code: outlet.outlet_code,
                  ...getCostData(outlet),
                }))}
                expandable={{
                  expandRowByClick: true,
                  defaultExpandAllRows: true,
                  expandIcon: ({ expanded, onExpand, record }) => (
                    <button
                      className="border rounded-md w-5 h-5 flex items-center"
                      onClick={(e) => onExpand(record, e)}
                    >
                      {expanded ? (
                        <MinusIcon className="w-full" />
                      ) : (
                        <PlusIcon className="w-full" />
                      )}
                    </button>
                  ),
                  expandedRowRender: (record, index, indent, expanded) => {
                    console.log({ record });
                    return expanded ? (
                      <Table
                        columns={BY_MEALS_COLUMNS}
                        data={[
                          {
                            period: "Breakfast",
                            ...getCostData(record.breakfast),
                          },
                          {
                            period: "Lunch",
                            ...getCostData(record.lunch),
                          },
                          {
                            period: "Dinner",
                            ...getCostData(record.dinner),
                          },
                        ]}
                      />
                    ) : null;
                  },
                }}
              />
            ) : null;
          },
        }}
      />
    </Card>
  );
}
