import React from "react";
interface IProps {
  text?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const MainTextInput: React.FC<IProps> = ({ text = "button", type = "button", onClick }) => {
  return (
    <button
      onClick={onClick && onClick}
      type={type}
      className="w-full rounded min-h-[40px] bg-mainBlue/90 hover:bg-mainBlue text-white uppercase"
    >
      {text}
    </button>
  );
};

export default MainTextInput;
