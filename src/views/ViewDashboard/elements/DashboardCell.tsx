import { memo } from "react";
import { ScheduleType } from "../../../types/ScheduleType";

interface DashboardCellPropType extends ScheduleType {
  onClick: (type: string, e: Event) => void;
}

const DashboardCell = memo((props: DashboardCellPropType): JSX.Element => {
  const {} = props;
  return <div>DashboardCell</div>;
});

export default DashboardCell;
