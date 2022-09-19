import React from "react";
import { useTranslation } from "react-i18next";
import { AlertBox, NoteCard } from "../components/ui";
import { AddNoteArea } from "../components/views";

const Home = () => {
  const { t, i18n } = useTranslation();
  return (
    <section className="container">
      <AddNoteArea />

      <AlertBox message="Not Başarıyla Eklendi!" type="success" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20 mt-12">
        <NoteCard
          title="Title"
          description="Burası description alanı olacak."
          createdDate="01.11.1990"
        />
        <NoteCard
          title="Title"
          description="Burası description alanı olacak. Burası description alanı olacak."
          createdDate="01.11.1990"
        />
      </div>
    </section>
  );
};

export default Home;
