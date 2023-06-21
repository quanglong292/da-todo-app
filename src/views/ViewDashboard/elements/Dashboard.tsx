import { memo } from "react";
import "../../../assets/styles/dashboard.scss";
import Table from "react-bootstrap/Table";
import { myDayjs, globalLocaleData } from "../../../utils/helpers/useDayjs";
import DashboardCell from "./DashboardCell";
import { ScheduleItemType, ScheduleType } from "../../../types/ScheduleType";

type DashboardProps = {
  scheduleData: {
    row: number;
    items: ScheduleType[];
  };
};

type WeekDayType = {
  name: string;
  day: number;
};

const weekDays: WeekDayType[] = new Array(6).fill("").map((_, idx) => {
  const dayInWeek = myDayjs().day(idx);
  return {
    name: globalLocaleData.weekdaysShort()[dayInWeek.get("day")],
    day: dayInWeek.get("date"),
  };
});

const today: number = myDayjs().get("date");

const Dashboard = memo((props: DashboardProps): JSX.Element => {
  const { scheduleData } = props;
  console.log({ scheduleData });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {weekDays.map(({ day, name }: WeekDayType, i) => {
            const isActiveDay: boolean = day === today;
            return (
              <th
                key={i}
                className={
                  "gap-4 text-center " + (isActiveDay ? "activeDay" : "")
                }
              >
                <p className="text-sm h-fit">{name}</p>
                <div className="h-[58px] w-[58px] m-auto flex justify-center items-center">
                  <span className="text-2xl font-semibold">{day}</span>
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {new Array(scheduleData?.row)?.fill("")?.map((_, i) => {
          return (
            <tr key={i}>
              {scheduleData?.items?.map((jtem, j) => {
                console.log({ jtem });

                return <td key={i}>{i}</td>;
              })}
            </tr>
          );
        })}
        {/* <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr> */}
      </tbody>
    </Table>
  );
});

export default Dashboard;
