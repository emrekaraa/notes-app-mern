import React from "react";
interface IProps {
  text?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  fontAwesomeIconClass?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const MainTextInput: React.FC<IProps> = ({
  text = "",
  type = "button",
  className = "",
  fontAwesomeIconClass = "",
  onClick,
}) => {
  return (
    <button
      onClick={onClick && onClick}
      type={type}
      className={`w-full rounded min-h-[40px] px-3 text-white uppercase ${
        className ? className : "bg-mainBlue/90 hover:bg-mainBlue "
      }`}
    >
      {fontAwesomeIconClass && <i className={fontAwesomeIconClass}></i>}
      {text}
    </button>
  );
};

export default MainTextInput;
