import React from "react";

type Props = {
  value: string;
  label: string;
  onChange: () => void;
  checked: boolean;
};

const Checkbox = ({ label, value, onChange, checked }: Props) => {
  console.log(checked);

  return (
    <label>
      <input
        className="mx-3 checked:bg-primary rounded-sm"
        type="checkbox"
        value={value}
        onChange={onChange}
        checked={checked}
      />
      {label}
    </label>
  );
};

export default Checkbox;
