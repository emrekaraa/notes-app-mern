import React from "react";
import { useTranslation } from "react-i18next";
import { deleteNoteCall } from "../../../redux/api/notesApiCall";
import { useAppDispatch } from "../../../redux/store";
import moment from "moment";
import "moment/locale/tr";

interface IProps {
  title: string;
  description?: string;
  createdDate: string;
  _id: string;
}
const NoteCard: React.FC<IProps> = ({
  title = "",
  description = "",
  createdDate = "",
  _id = "",
}) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const deleteNote = () => {
    dispatch(deleteNoteCall(_id));
  };

  return (
    <div className="bg-white p-3 flex flex-col justify-between rounded border-[0.5px] border-headerBg min-h-[140px]">
      <div>
        <h3 className="text-mainBlue text-xl">{title}</h3>

        <p className="text-gray-600 mt-2 mb-1">{description}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-headerBg text-xs">
          {t("createdDate")}{" "}
          <span className="text-gray-400">{moment(new Date(createdDate)).fromNow()}</span>
        </p>

        <div className="flex items-center gap-2.5">
          <i className="fas fa-edit text-amber-300 hover:text-amber-400 cursor-pointer"></i>
          <i
            onClick={deleteNote}
            className="fas fa-trash text-red-300 hover:text-red-400 cursor-pointer"
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
