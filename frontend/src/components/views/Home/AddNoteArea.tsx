import React from "react";
import { useTranslation } from "react-i18next";
import { MainButton, MainTextInput } from "../../ui";

const AddNoteArea: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="mb-6">
      <h2 className="mt-8 mb-6 text-lg">{t("addNewNote")}</h2>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <p className="mb-2">{t("noteTitle")}</p>
          <MainTextInput placeholder={t("pleaseEnterTitle")} />
        </div>

        <div className="flex-1">
          <p className="mb-2">{t("noteDescription")}</p>
          <MainTextInput placeholder={t("pleaseEnterDescription")} />
        </div>
      </div>
      <div className="mt-4">
        <MainButton text={t("addNote")} />
      </div>
    </div>
  );
};

export default AddNoteArea;
