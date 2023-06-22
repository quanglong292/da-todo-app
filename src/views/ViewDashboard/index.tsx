import Dashboard from "./elements/Dashboard";

// Mock
import mockDashboardData from "../../utils/constants/dashboardData.json";
import { useState, useEffect } from "react";
import { ScheduleItemType, ScheduleType } from "../../types/ScheduleType";
import DashboardNavigator from "./elements/DashboardNavigator";
import { Dayjs } from "../../utils/helpers/dayjs";

function ViewDashboard() {
  const [schedule, setSchedule] = useState<ScheduleType[]>(
    mockDashboardData as ScheduleType[]
  );
  const [selectedWeek, setSelectedWeek] = useState<string>(
    Dayjs().format("DD/MM/YYYY")
  );

  // Function
  const handleClickCellAction = (
    type: "done" | "remove",
    record: any
  ): void => {
    console.log("handleClickCellAction", { type, record });
    setSchedule([]);
  };

  const handleSelectWeek = (date: string): void => {
    setSelectedWeek(date);
  };

  return (
    <div>
      <DashboardNavigator selectedWeek={selectedWeek} onSelect={handleSelectWeek} />
      <Dashboard
        selectedWeek={selectedWeek}
        handleClickCellAction={handleClickCellAction}
        scheduleData={schedule}
      />
    </div>
  );
}

export default ViewDashboard;
