import { memo } from "react";
import { Button } from "react-bootstrap";
import { Dayjs, dateFormat } from "../../../utils/helpers/dayjs";

type DashboardNavigatorProps = {
  selectedWeek: string;
  onSelect: (date: string) => void;
};

const DashboardNavigator = memo(
  (props: DashboardNavigatorProps): JSX.Element => {
    const { selectedWeek, onSelect } = props;

    // Function
    const handleClickRouteWeek = (
      routeType: "PRE" | "NEXT" | "SELECT",
      value?: string
    ) => {
      let selectedDate: any = Dayjs(selectedWeek, dateFormat);
      if (routeType === "PRE") {
        selectedDate = selectedDate.subtract(7, "day");
      } else if (routeType === "NEXT") {
        selectedDate = selectedDate.add(7, "day");
      } else {
        selectedDate = Dayjs(value, "YYYY-MM-DD");
      }

      onSelect(selectedDate.format(dateFormat));
    };

    return (
      <div className="bg-blue-950 px-4 pt-4 pb-8 flex flex-col gap-4">
        <p className="text-white font-semibold text-center text-2xl">
          Routing your week
        </p>
        <div className="flex justify-between">
          <Button
            onClick={() => handleClickRouteWeek("PRE")}
            className="w-[84px] bg-blue-500 text-white"
          >
            Previous
          </Button>
          <input
            onChange={(e) => handleClickRouteWeek("SELECT", e.target.value)}
            type="date"
            className="px-4 border-2 border-gray-500 rounded-xl font-semibold uppercase"
          />
          <Button
            onClick={() => handleClickRouteWeek("NEXT")}
            className="w-[84px] bg-blue-500 text-white"
          >
            Next
          </Button>
        </div>
      </div>
    );
  }
);

export default DashboardNavigator;
