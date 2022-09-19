import React from "react";
interface IProps {
  message?: string;
  type?: "success" | "error";
}
const AlertBox: React.FC<IProps> = ({ message = "Error !", type = "error" }) => {
  return (
    <div
      className={` border-l-4 ${
        type === "success" ? "bg-lime-50 border-lime-400" : "bg-red-50 border-red-400"
      }  p-4`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {type === "success" ? (
            <i className="fa-regular fa-circle-check text-lime-500" />
          ) : (
            <i className="fa-solid fa-triangle-exclamation text-red-500" />
          )}
        </div>
        <div className="ml-3">
          <p className={`text-sm ${type === "success" ? "text-lime-700" : " text-red-700"}`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlertBox;
