import React from "react";
import { useTranslation } from "react-i18next";
interface IProps {
  title: string;
  description?: string;
  createdDate: string;
}
const NoteCard: React.FC<IProps> = ({ title = "", description = "", createdDate = "" }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="bg-white p-3 flex flex-col justify-between rounded border-[0.5px] border-headerBg min-h-[140px]">
      <div>
        <h3 className="text-mainBlue text-xl">{title}</h3>

        <p className="text-gray-600 mt-2 mb-1">{description}</p>
      </div>
      <p className="text-headerBg text-xs">
        {t("createdDate")} {createdDate}
      </p>
    </div>
  );
};

export default NoteCard;
