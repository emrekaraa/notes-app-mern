import React from "react";
interface IProps {
  text?: string;
}
const MainTextInput: React.FC<IProps> = ({ text = "button" }) => {
  return (
    <button className="w-full rounded min-h-[40px] bg-mainBlue/90 hover:bg-mainBlue text-white uppercase">
      {text}
    </button>
  );
};

export default MainTextInput;
