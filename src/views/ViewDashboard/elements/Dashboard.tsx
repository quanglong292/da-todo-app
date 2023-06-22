import { memo, useEffect, useMemo, useState } from "react";
import "../../../assets/styles/dashboard.scss";
import {
  Dayjs,
  dateFormat,
  globalLocaleData,
} from "../../../utils/helpers/dayjs";
import { ScheduleType } from "../../../types/ScheduleType";
import DashboardTable from "../../../components/core/DashboardTable";

type DashboardProps = {
  selectedWeek: string;
  scheduleData: ScheduleType[];
  handleClickCellAction: (type: "done" | "remove", record: any) => void;
};

type WeekDayType = {
  name: string;
  day: number;
};

const Dashboard = memo((props: DashboardProps): JSX.Element => {
  const { selectedWeek, scheduleData, handleClickCellAction } = props;
  // Memos
  const weekDays: WeekDayType[] = useMemo(() => {
    return new Array(7).fill("").map((_, idx) => {
      const dayInWeek = Dayjs(selectedWeek, dateFormat).day(idx);
      return {
        name: globalLocaleData.weekdaysShort()[dayInWeek.get("day")],
        day: dayInWeek.get("date"),
      };
    });
  }, [selectedWeek]);

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
    const isExistDataForThisWeek = data
      .map((i) => i.date)
      .includes(Dayjs().format(dateFormat));

    // console.log({
    //   isExistDataForThisWeek: {
    //     data: data.map((i) => i.date),
    //     today: Dayjs().format(dateFormat),
    //   },
    // });

    if (!data.length) {
      setColumns(columns);
      setDataSource([]);
      return;
    }

    const longestItemOfADay = Math.max(
      ...data.map(({ items }: ScheduleType) => items.length)
    );
    const dataSource: any[] = new Array(longestItemOfADay + 1)
      .fill("")
      .map((_, i) => {
        const eachRowObj = columns
          .map((i) => i.dataIndex)
          .reduce((a, v) => ({ ...a, [v]: v }), {});

        weekDays.forEach((_, jindex) => {
          const day = Dayjs(selectedWeek, dateFormat)
            .day(jindex)
            .format(dateFormat);

          const foundData = data.find((schedule) => schedule.date === day)
            ?.items?.[i];
          eachRowObj[weekDays[jindex].name] = foundData
            ? { ...foundData, date: day }
            : "";
          const isSameOrAfterToday = Dayjs(day, dateFormat).isSameOrAfter(
            Dayjs(),
            "D"
          );

          if (i === longestItemOfADay && isSameOrAfterToday) {
            eachRowObj[weekDays[jindex].name] = { type: "ADD", date: day };
          }
        });

        return eachRowObj;
      });

    setColumns(columns);
    setDataSource(dataSource);
  }

  useEffect(() => {
    handleInitScheduleData(scheduleData);
  }, [scheduleData, weekDays]);

  return (
    <>
      <div></div>
      <DashboardTable
        handleClickCellAction={handleClickCellAction}
        dataSource={dataSource}
        columns={columns}
      />
    </>
  );
});

export default Dashboard;
