import { memo } from "react";
import { Button } from "react-bootstrap";

const DashboardNavigator = memo(() => {
  return (
    <div className="bg-blue-950 px-4 pt-4 pb-8 flex flex-col gap-4">
      <p className="text-white font-semibold text-center text-2xl">Routing your week</p>
      <div className="flex justify-between">
        <Button className="w-[84px] bg-blue-500 text-white">Previous</Button>
        <input
          type="date"
          className="px-4 border-2 border-gray-500 rounded-xl font-semibold uppercase"
        />
        <Button className="w-[84px] bg-blue-500 text-white">Next</Button>
      </div>
    </div>
  );
});

export default DashboardNavigator;
