import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { deleteNoteCall, updateNoteCall } from "../../../redux/api/notesApiCall";
import { useAppDispatch } from "../../../redux/store";
import moment from "moment";
import "moment/locale/tr";
import MainButton from "../Buttons/MainButton";

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

  const [editable, setEditable] = useState(false);
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteDescription, setNoteDescription] = useState(description);

  return (
    <div className="bg-white p-3 flex flex-col justify-between rounded border-[0.5px] border-headerBg min-h-[160px]">
      <div>
        {editable ? (
          <>
            <textarea
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="text-mainBlue text-xl focus:outline-none border break-words w-full"
              rows={1}
            />
            <textarea
              value={noteDescription}
              onChange={(e) => setNoteDescription(e.target.value)}
              className="text-gray-600 focus:outline-none border break-words w-full"
              rows={3}
            />
          </>
        ) : (
          <>
            <h3 className="py-[1px] text-mainBlue text-xl break-words">{title}</h3>
            <p className="py-[1px] text-gray-600 mt-2 mb-1 break-words">{description}</p>
          </>
        )}
      </div>
      <div className="flex justify-between">
        <p className="text-headerBg text-xs">
          {t("createdDate")}{" "}
          <span className="text-gray-400">{moment(new Date(createdDate)).fromNow()}</span>
        </p>

        <div className="flex items-center gap-2.5">
          {editable ? (
            <div className="flex items-center gap-2 mr-[2px]">
              <i
                onClick={() => {
                  dispatch(
                    updateNoteCall({ id: _id, title: noteTitle, description: noteDescription })
                  );
                  setEditable(false);
                }}
                className="fa fa-check-double text-green-400 hover:text-green-500 cursor-pointer"
              />
              <i
                onClick={() => {
                  setEditable(false);
                  setNoteTitle(title);
                  setNoteDescription(description);
                }}
                className="fa-solid fa-xmark text-yellow-400 hover:text-yellow-500 cursor-pointer"
              />
            </div>
          ) : (
            <i
              onClick={() => setEditable(true)}
              className="fas fa-edit text-amber-300 hover:text-amber-400 cursor-pointer"
            />
          )}
          <i
            onClick={() => {
              dispatch(deleteNoteCall(_id));
            }}
            className="fas fa-trash text-red-300 hover:text-red-400 cursor-pointer"
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
