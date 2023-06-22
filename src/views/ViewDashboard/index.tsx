import Dashboard from "./elements/Dashboard";

// Mock
import mockDashboardData from "../../utils/constants/dashboardData.json";
import { useState, useEffect } from "react";
import { ScheduleItemType, ScheduleType } from "../../types/ScheduleType";
import DashboardNavigator from "./elements/DashboardNavigator";

function ViewDashboard() {
  const [schedule, setSchedule] = useState<ScheduleType[]>(
    mockDashboardData as ScheduleType[]
  );

  // Function
  const handleClickCellAction = (
    type: "done" | "remove",
    record: any
  ): void => {
    console.log("handleClickCellAction", { type, record });
    setSchedule([]);
  };

  return (
    <div>
      <DashboardNavigator />
      <Dashboard
        handleClickCellAction={handleClickCellAction}
        scheduleData={schedule}
      />
    </div>
  );
}

export default ViewDashboard;
