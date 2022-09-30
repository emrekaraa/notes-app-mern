import { useEffect } from "react";
import { MainButton, NoteCard } from "../components/ui";
import { AddNoteArea } from "../components/views";
import { getAllNotesCall } from "../redux/api/notesApiCall";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { NextIcon } from "../common/icons";
import PreviousIcon from "../common/icons/PrevIcon";
import ReactPaginate from "react-paginate";
import { setAllNotesFilterOptions } from "../redux/notesSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Note {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data, getAllNotesFilterOptions } = useAppSelector((state) => state.notes);
  const { authToken } = useAppSelector((state) => state.user);
  const { loading } = useAppSelector((state) => state.siteConfig);

  useEffect(() => {
    if (authToken) {
      dispatch(getAllNotesCall(getAllNotesFilterOptions));
    }
  }, [dispatch, getAllNotesFilterOptions, authToken]);

  return (
    <>
      {authToken ? (
        <section className="container">
          <AddNoteArea />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {data?.data.map((note: Note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                description={note.description}
                createdDate={note.createdAt}
                _id={note._id}
              />
            ))}
          </div>
          {data?.totalPages > 0 && (
            <div className="flex justify-center my-6">
              <ReactPaginate
                breakLabel="..."
                forcePage={getAllNotesFilterOptions.page - 1}
                breakClassName="flex mt-2 mx-2"
                disableInitialCallback={true}
                nextLabel={<NextIcon />}
                nextClassName={"flex items-center justify-center mr-2"}
                className={"flex h-12 font-medium rounded-full bg-fittyMain text-mainText"}
                onPageChange={(pageNumber) =>
                  dispatch(
                    setAllNotesFilterOptions({
                      ...getAllNotesFilterOptions,
                      page: pageNumber.selected + 1,
                    })
                  )
                }
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                pageCount={data?.totalPages > 0 ? data?.totalPages : 1}
                previousLabel={<PreviousIcon />}
                previousClassName={"flex items-center justify-center ml-1"}
                activeLinkClassName={"bg-white rounded-full text-mainBlue"}
                pageLinkClassName={
                  "w-12 flex justify-center items-center cursor-pointer transition duration-150 ease-in"
                }
                pageClassName={"flex"}
              />
            </div>
          )}
        </section>
      ) : (
        <div className="flex flex-col text-center justify-center items-center mt-10">
          <div className="max-w-md flex flex-col items-center justify-center gap-5">
            <h1>{t("pleaseLogin")}</h1>
            <MainButton
              onClick={() => navigate("/login")}
              text={t("login")}
              className="max-w-xs bg-mainBlue hover:bg-mainBlue/90 capitalize"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
