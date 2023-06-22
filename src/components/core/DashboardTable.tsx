import { memo } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Dayjs } from "../../utils/helpers/dayjs";
import { ScheduleItemType } from "../../types/ScheduleType";

type ColumnType = {
  title: any;
  dataIndex: string;
  key: string;
};

type DashboardTable = {
  columns?: ColumnType[];
  dataSource?: any[];
  handleClickCellAction: (type: "done" | "remove", record: any) => void;
};

const today: number = Dayjs().get("date");

const DashboardTable = memo((props: DashboardTable) => {
  const { dataSource, columns, handleClickCellAction } = props;
  console.log({ dataSource, columns });

  return (
    <Table responsive="sm" bordered hover>
      <TableHead columns={columns} />
      <TableBody
        handleClickCellAction={handleClickCellAction}
        dataSource={dataSource}
      />
    </Table>
  );
});

function TableHead({ columns }: { columns?: ColumnType[] }) {
  return (
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
  );
}

function TableBody({ dataSource, handleClickCellAction }: DashboardTable) {
  return (
    <tbody>
      {dataSource?.length ? (
        dataSource.map((weekData, i) => {
          const entriesData: [string, ScheduleItemType][] =
            Object.entries(weekData);
          return (
            <tr key={i}>
              {entriesData.map((item, j) => {
                const value: ScheduleItemType | "" = item[1];
                if (!value) return <td className="max-w-[96px]" key={j}></td>;
                if (value?.type === "ADD") {
                  return (
                    <td key={j}>
                      <Button
                        onClick={() => handleClickCellAction("add", value)}
                        variant="warning"
                        className="bg-yellow-500 text-white font-semibold w-full"
                      >
                        Add+
                      </Button>
                    </td>
                  );
                }

                return (
                  <td
                    className="max-w-[96px] h-[56px] p-0"
                    key={value.title + j}
                  >
                    {value.status === "DOING" ? (
                      <div className="max-w-full flex justify-between items-center m-2">
                        <Button
                          className="font-semibold bg-blue-500 w-[64px]"
                          onClick={() => handleClickCellAction("done", value)}
                        >
                          Done
                        </Button>
                        <span className="mx-2">{value.title}</span>
                        <Button
                          variant="danger"
                          className="font-semibold bg-red-500 w-[64px]"
                          onClick={() => handleClickCellAction("remove", value)}
                        >
                          Del
                        </Button>
                      </div>
                    ) : (
                      <section className="max-w-full h-full flex items-center justify-center bg-green-500 text-white">
                        {value.title}
                      </section>
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
  );
}

export default DashboardTable;
