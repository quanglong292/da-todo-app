import Dashboard from "./elements/Dashboard";

// Mock
import mockDashboardData from "../../constants/dashboardData.json";
import { useState } from "react";
import { ScheduleItemType, ScheduleType } from "../../types/ScheduleType";
import DashboardNavigator from "./elements/DashboardNavigator";
import { Dayjs } from "../../utils/helpers/dayjs";
import AddNewForm from "./elements/AddNewForm";

function ViewDashboard() {
  // States
  const [schedule, setSchedule] = useState<ScheduleType[]>(
    mockDashboardData as ScheduleType[]
  );
  const [selectedWeek, setSelectedWeek] = useState<string>(
    Dayjs().format("DD/MM/YYYY")
  );
  const [showForm, setShowForm] = useState<boolean>(false);
  const [addForm, setAddForm] = useState<ScheduleType | null>(null);

  // Function
  const handleClickCellAction = (
    type: "done" | "remove" | "add",
    record: any
  ): void => {
    console.log("handleClickCellAction", { type, record });
    if (type === "add") {
      handleToggleForm();
      setAddForm({
        date: record.date,
        items: [],
      });
    } else if (["done", "remove"].includes(type)) {
      const newList: ScheduleType[] = schedule.map((item) => {
        if (item.date === record.date) {
          if (type === "done") {
            return {
              ...item,
              items: item.items.map((j) =>
                j.id === record.id ? { ...j, status: "DONE" } : j
              ),
            };
          } else {
            return {
              ...item,
              items: item.items.filter((j) => j.id !== record.id),
            };
          }
        }

        return item;
      });
      setSchedule(newList);
    }
  };

  const handleSelectWeek = (date: string): void => {
    setSelectedWeek(date);
  };

  const handleToggleForm = () => setShowForm(!showForm);

  const handleSaveForm = ({ title, dateInput = "" }: any) => {
    const newItem: ScheduleType = {
      date: dateInput || addForm?.date || "",
      items: [{ title, status: "DOING", id: "1" }],
    };
    const isExistData = schedule.find((item) => item.date === newItem.date);

    // Set
    setSchedule(
      isExistData
        ? schedule.map((item) => {
            if (item.date === isExistData.date) {
              return {
                ...item,
                items: [
                  ...item.items,
                  { title, status: "DOING", id: `${item.items.length + 1}` },
                ],
              };
            } else return item;
          })
        : [...schedule, newItem]
    );
    setAddForm(null);
    handleToggleForm();
  };

  return (
    <div>
      <DashboardNavigator
        selectedWeek={selectedWeek}
        onSelect={handleSelectWeek}
      />
      <Dashboard
        selectedWeek={selectedWeek}
        handleClickCellAction={handleClickCellAction}
        scheduleData={schedule}
      />
      {/* MODAL */}
      <AddNewForm
        show={showForm}
        date={addForm?.date}
        onClose={handleToggleForm}
        onSave={handleSaveForm}
      />
    </div>
  );
}

export default ViewDashboard;
