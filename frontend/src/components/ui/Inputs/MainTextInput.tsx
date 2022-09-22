import React from "react";
interface IProps {
  placeholder?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  name?: string;
}
const MainTextInput: React.FC<IProps> = ({
  placeholder = "",
  type = "text",
  onChange,
  value,
  name = "",
}) => {
  return (
    <input
      onChange={onChange && onChange}
      value={value}
      name={name}
      className="w-full rounded min-h-[40px] indent-2 text-sm outline-none text-gray-600 placeholder:text-gray-200"
      type={type}
      placeholder={placeholder}
    />
  );
};

export default MainTextInput;
