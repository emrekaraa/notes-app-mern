import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./loading.module.scss";

interface IProps {
  fade?: boolean;
}
const MainLoading: React.FC<IProps> = ({ fade = false }) => {
  const { t, i18n } = useTranslation();

  return (
    <div
      className={`bg-[rgba(45,45,45,0.7)] z-[99999] flex items-center bg-opacity-40 bg-gray-700 justify-center fixed top-0 left-0 w-screen h-screen transition-all ${
        fade ? "opacity-100 block" : "opacity-0 hidden"
      }`}
    >
      <div className={"fixed top-0 left-0 w-screen h-screen"}></div>
      {fade ? (
        <div className={"z-50 max-w-md w-full rounded-3xl flex flex-col mx-4"}>
          <div className={"justify-center flex"}>
            <div className={`loadingModal relative flex justify-center items-center`}>
              <div className={`loader`}></div>
              <div className={`loader2`}></div>
              <div className={"flex justify-center items-center rounded-full"}>
                <h2 className="text-3xl text-center  ">{t("loading")}</h2>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MainLoading;
