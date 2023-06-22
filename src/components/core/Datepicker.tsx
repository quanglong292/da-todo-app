import { memo } from "react";

type Datepicker = {
  onChange: (e?: string) => void;
};

const Datepicker = memo((props: Datepicker): JSX.Element => {
  const { onChange, ...others } = props;
  return (
    <input
      {...others}
      onChange={(e) => onChange(e.target.value)}
      type="date"
      className="px-4 border-2 border-gray-500 rounded-xl font-semibold uppercase"
    />
  );
});

export default Datepicker;
