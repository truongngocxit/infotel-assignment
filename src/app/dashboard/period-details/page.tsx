"use client";
import { dashboardSampleV0_4MealDetailData as SAMPLE_DATA } from "@/lib/data/sampledata_meal_detail";
import { PlusIcon, MinusIcon } from "@/components/icons";
import { Card } from "@/components/ui/card";
import * as XLSX from "xlsx";
import Table from "rc-table";
const TAB_COLUMNS = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "A. Count",
    dataIndex: "adults_sales",
    key: "adults_sales",
  },
  {
    title: "C. Count",
    dataIndex: "children_sales",
    key: "children_sales",
  },
  {
    title: "A. Sales",
    dataIndex: "adults_count",
    key: "adults_count",
  },
  {
    title: "C. Sales",
    dataIndex: "children_count",
    key: "children_count",
  },
  {
    title: "Count",
    dataIndex: "total_count",
    key: "total_count",
  },
  {
    title: "Count %",
    dataIndex: "percentage_count",
    key: "percentage_count",
  },
  {
    title: "Sales",
    dataIndex: "sales",
    key: "sales",
  },
  {
    title: "Sales %",
    dataIndex: "percentage_sales",
    key: "percentage_sales",
  },
];

const TOTAL_COLUMNS = [
  {
    title: "RVC",
    dataIndex: "outlet_code",
    key: "outlet_code",
  },
  {
    title: "A. Count",
    dataIndex: "adults_sales",
    key: "adults_sales",
  },
  {
    title: "C. Count",
    dataIndex: "children_sales",
    key: "children_sales",
  },
  {
    title: "A. Sales",
    dataIndex: "adults_count",
    key: "adults_count",
  },
  {
    title: "C. Sales",
    dataIndex: "children_count",
    key: "children_count",
  },
  {
    title: "Count",
    dataIndex: "total_count",
    key: "total_count",
  },
  {
    title: "Count %",
    dataIndex: "percentage_count",
    key: "percentage_count",
  },
  {
    title: "Sales",
    dataIndex: "sales",
    key: "sales",
  },
  {
    title: "Sales %",
    dataIndex: "percentage_sales",
    key: "percentage_sales",
  },
];

const DETAIL_COLUMNS = [
  {
    title: "Period",
    dataIndex: "period",
    key: "period",
  },
  {
    title: "A. Count",
    dataIndex: "adults_sales",
    key: "adults_sales",
  },
  {
    title: "C. Count",
    dataIndex: "children_sales",
    key: "children_sales",
  },
  {
    title: "A. Sales",
    dataIndex: "adults_count",
    key: "adults_count",
  },
  {
    title: "C. Sales",
    dataIndex: "children_count",
    key: "children_count",
  },
  {
    title: "Count",
    dataIndex: "total_count",
    key: "total_count",
  },
  {
    title: "Count %",
    dataIndex: "percentage_count",
    key: "percentage_count",
  },
  {
    title: "Sales",
    dataIndex: "sales",
    key: "sales",
  },
  {
    title: "Sales %",
    dataIndex: "percentage_sales",
    key: "percentage_sales",
  },
];

export default function PageIndex() {
  const handleConvertToCsv = (obj: Object) => {
    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet(SAMPLE_DATA);

    // Create a workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Save the workbook as an XLSX file
    XLSX.writeFile(wb, "data.xlsx");
  };
  return (
    <Card>
      <button onClick={() => handleConvertToCsv(SAMPLE_DATA)}>
        Convert csv
      </button>
      <Table
        rowKey={"name"}
        columns={TAB_COLUMNS}
        data={SAMPLE_DATA.map((entry) => ({
          ...entry,
          date: entry.report_date,
          adults_sales: entry.total.adults_actual.sales,
          children_sales: entry.total.children_actual.sales,
          adults_count: entry.total.adults_actual.count,
          children_count: entry.total.children_actual.count,
          total_count: entry.total.total_actual.count,
          percentage_count: entry.total.total_actual.percentage_count,
          sales: entry.total.total_actual.sales,
          percentage_sales: entry.total.total_actual.percentage_sales,
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
                columns={TOTAL_COLUMNS}
                data={record.outlet.map((outlet) => ({
                  ...outlet,
                  outlet_code: outlet.outlet_code,
                  adults_sales: outlet.total.adults_actual.sales,
                  children_sales: outlet.total.children_actual.sales,
                  adults_count: outlet.total.adults_actual.count,
                  children_count: outlet.total.children_actual.count,
                  total_count: outlet.total.total_actual.count,
                  percentage_count: outlet.total.total_actual.percentage_count,
                  sales: outlet.total.total_actual.sales,
                  percentage_sales: outlet.total.total_actual.percentage_sales,
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
                        columns={DETAIL_COLUMNS}
                        data={[
                          {
                            period: "Breakfast",
                            adults_sales:
                              record.breakfast.total.adults_actual.sales,
                            children_sales:
                              record.breakfast.total.children_actual.sales,
                            adults_count:
                              record.breakfast.total.adults_actual.count,
                            children_count:
                              record.breakfast.total.children_actual.count,
                            total_count:
                              record.breakfast.total.total_actual.count,
                            percentage_count:
                              record.breakfast.total.total_actual
                                .percentage_count,
                            sales: record.breakfast.total.total_actual.sales,
                            percentage_sales:
                              record.breakfast.total.total_actual
                                .percentage_sales,
                          },
                          {
                            period: "Lunch",
                            adults_sales:
                              record.lunch.total.adults_actual.sales,
                            children_sales:
                              record.lunch.total.children_actual.sales,
                            adults_count:
                              record.lunch.total.adults_actual.count,
                            children_count:
                              record.lunch.total.children_actual.count,
                            total_count: record.lunch.total.total_actual.count,
                            percentage_count:
                              record.lunch.total.total_actual.percentage_count,
                            sales: record.lunch.total.total_actual.sales,
                            percentage_sales:
                              record.lunch.total.total_actual.percentage_sales,
                          },
                          {
                            period: "Dinner",
                            adults_sales:
                              record.dinner.total.adults_actual.sales,
                            children_sales:
                              record.dinner.total.children_actual.sales,
                            adults_count:
                              record.dinner.total.adults_actual.count,
                            children_count:
                              record.dinner.total.children_actual.count,
                            total_count: record.dinner.total.total_actual.count,
                            percentage_count:
                              record.dinner.total.total_actual.percentage_count,
                            sales: record.dinner.total.total_actual.sales,
                            percentage_sales:
                              record.dinner.total.total_actual.percentage_sales,
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
