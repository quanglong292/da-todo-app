import { memo } from "react";

type Datepicker = {
  onChange: (e?: string) => void;
};

const Datepicker = memo((props: Datepicker): JSX.Element => {
  const { onChange } = props;
  return (
    <input
      onChange={(e) => onChange(e.target.value)}
      type="date"
      className="px-4 border-2 border-gray-500 rounded-xl font-semibold uppercase"
    />
  );
});

export default Datepicker;
