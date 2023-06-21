import Dashboard from "./elements/Dashboard";

// Mock
import mockDashboardData from "../../utils/constants/dashboardData.json";
import { useState, useEffect } from "react";
import { ScheduleItemType, ScheduleType } from "../../types/ScheduleType";

const mock = [
  {
    date: "18",
    count: 0,
    items: [
      {
        title: "asd",
        status: "DONE",
      },
    ],
  },
];

function ViewDashboard() {
  const [schedule, setSchedule] = useState<{
    row: number;
    items: ScheduleType[];
  } | null>(null);

  // Functions
  function handleInitScheduleData() {
    const mock: ScheduleType[] = JSON.parse(mockDashboardData);
    const longestItemOfADay = Math.max(
      ...mock.map(({ items }: ScheduleType) => items.length)
    );
    setSchedule({
      row: longestItemOfADay,
      items: mock,
    });
  }

  useEffect(() => {
    handleInitScheduleData();
  }, []);

  return (
    <div>
      <Dashboard scheduleData={schedule} />
    </div>
  );
}

export default ViewDashboard;
