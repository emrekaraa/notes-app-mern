import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AlertBox, NoteCard } from "../components/ui";
import { AddNoteArea } from "../components/views";
import { getAllNotesCall } from "../redux/api/notesApiCall";

import { setLoading } from "../redux/siteConfigSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { convertDateTimeFormat } from "../utils/methods";

interface Note {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const Home = () => {
  const { t, i18n } = useTranslation();

  const dispatch = useAppDispatch();
  const allNotes = useAppSelector((state) => state.notes);

  useEffect(() => {
    dispatch(getAllNotesCall({ direction: "DESC" }));
  }, [dispatch]);

  return (
    <section className="container">
      <AddNoteArea />

      {/* <AlertBox message="Not Başarıyla Eklendi!" type="success" /> */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20 mt-12">
        {allNotes?.data?.notes.map((note: Note) => (
          <NoteCard
            key={note._id}
            title={note.title}
            description={note.description}
            createdDate={convertDateTimeFormat(note.createdAt)}
            _id={note._id}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;
