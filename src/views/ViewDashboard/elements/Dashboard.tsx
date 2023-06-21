import { memo, useEffect, useState } from "react";
import "../../../assets/styles/dashboard.scss";

import { myDayjs, globalLocaleData } from "../../../utils/helpers/useDayjs";
import DashboardCell from "./DashboardCell";
import { ScheduleItemType, ScheduleType } from "../../../types/ScheduleType";
import DashboardTable from "../../../components/core/DashboardTable";

type DashboardProps = {
  scheduleData: ScheduleType[];
  handleClickCellAction: (type: "done" | "remove", record: any) => void;
};

type WeekDayType = {
  name: string;
  day: number;
};

const weekDays: WeekDayType[] = new Array(7).fill("").map((_, idx) => {
  const dayInWeek = myDayjs().day(idx);
  return {
    name: globalLocaleData.weekdaysShort()[dayInWeek.get("day")],
    day: dayInWeek.get("date"),
  };
});

const Dashboard = memo((props: DashboardProps): JSX.Element => {
  const { scheduleData, handleClickCellAction } = props;
  // State
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  // Functions
  function handleInitScheduleData(data: ScheduleType[]) {
    const columns: any[] = weekDays.map((item) => {
      return {
        title: item,
        dataIndex: item.name,
        key: item.name,
      };
    });

    if (!data.length) {
      setColumns(columns);
      setDataSource([]);
      return;
    }

    const longestItemOfADay = Math.max(
      ...data.map(({ items }: ScheduleType) => items.length)
    );
    const dataSource: any[] = new Array(longestItemOfADay)
      .fill("")
      .map((_, i) => {
        const eachRowObj = columns
          .map((i) => i.dataIndex)
          .reduce((a, v) => ({ ...a, [v]: v }), {});

        weekDays.forEach((_, jindex) => {
          const day = myDayjs().day(jindex).format("DD/MM/YYYY");
          const foundData = data.find((schedule) => schedule.date === day)
            ?.items?.[i];
          eachRowObj[weekDays[jindex].name] = foundData
            ? { ...foundData, date: day }
            : "";
        });

        return eachRowObj;
      });

    setColumns(columns);
    setDataSource(dataSource);
  }

  useEffect(() => {
    handleInitScheduleData(scheduleData);
  }, [scheduleData]);

  return (
    <DashboardTable
      handleClickCellAction={handleClickCellAction}
      dataSource={dataSource}
      columns={columns}
    />
  );
});

export default Dashboard;
