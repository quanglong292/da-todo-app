import React, { memo } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { myDayjs } from "../../utils/helpers/useDayjs";
import { ScheduleItemType } from "../../types/ScheduleType";

type DashboardTable = {
  columns?: {
    title: any;
    dataIndex: string;
    key: string;
  }[];
  dataSource?: any[];
  handleClickCellAction: (type: "done" | "remove", record: any) => void;
};

const today: number = myDayjs().get("date");

const DashboardTable = memo((props: DashboardTable) => {
  const { dataSource, columns, handleClickCellAction } = props;
  console.log({ dataSource, columns });

  return (
    <Table responsive="sm" bordered hover>
      <thead>
        <tr>
          {columns?.map(({ title }, i) => {
            const isActiveDay: boolean = title.day === today;
            return (
              <th
                key={i}
                className={
                  "gap-4 text-center " + (isActiveDay ? "activeDay" : "")
                }
              >
                <p className="text-sm h-fit">{title.name}</p>
                <div className="h-[58px] w-[58px] m-auto flex justify-center items-center">
                  <span className="text-2xl font-semibold">{title.day}</span>
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {dataSource?.length ? (
          dataSource.map((weekData, i) => {
            const entriesData: [string, ScheduleItemType][] =
              Object.entries(weekData);
            return (
              <tr key={i}>
                {entriesData.map((item, j) => {
                  const value: ScheduleItemType | "" = item[1];
                  if (!value) return <td key={j}></td>;
                  return (
                    <td key={value.title + j}>
                      {value.status === "DOING" ? (
                        <div className="flex justify-between items-center">
                          <Button
                            onClick={() => handleClickCellAction("done", value)}
                          >
                            Done
                          </Button>
                          <span className="mx-2">{value.title}</span>
                          <Button
                            onClick={() =>
                              handleClickCellAction("remove", value)
                            }
                          >
                            Del
                          </Button>
                        </div>
                      ) : (
                        <p className="text-center bg-green-500 text-white">
                          {value.title}
                        </p>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })
        ) : (
          <tr>
            <td className="text-center py-4" colSpan={7}>
              No data!
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
});

export default DashboardTable;
