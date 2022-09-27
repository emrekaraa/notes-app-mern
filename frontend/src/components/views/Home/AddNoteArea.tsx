import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { addNewNoteCall } from "../../../redux/api/notesApiCall";
import { useAppDispatch } from "../../../redux/store";
import { MainButton, MainTextInput } from "../../ui";
import { toast } from "react-toastify";

const AddNoteArea: React.FC = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useAppDispatch();

  const addNote = () => {
    if (title === "" || description === "") {
      return toast.error(t("pleaseAllFields"));
    }
    try {
      const data = {
        title,
        description,
      };

      dispatch(addNewNoteCall(data));
      setTitle("");
      setDescription("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="mt-8 mb-6 text-lg">{t("addNewNote")}</h2>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <p className="mb-2">{t("noteTitle")}</p>
          <MainTextInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("pleaseEnterTitle")}
          />
        </div>

        <div className="flex-1">
          <p className="mb-2">{t("noteDescription")}</p>
          <MainTextInput
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t("pleaseEnterDescription")}
          />
        </div>
      </div>
      <div className="mt-3.5">
        <MainButton onClick={addNote} text={t("addNote")} />
      </div>
    </div>
  );
};

export default AddNoteArea;
