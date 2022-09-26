import { useEffect } from "react";
import { NoteCard } from "../components/ui";
import { AddNoteArea } from "../components/views";
import { getAllNotesCall } from "../redux/api/notesApiCall";

import { useAppDispatch, useAppSelector } from "../redux/store";
import { convertDateTimeFormat } from "../utils/methods";
import { NextIcon } from "../common/icons";
import PreviousIcon from "../common/icons/PrevIcon";
import ReactPaginate from "react-paginate";
import { setAllNotesFilterOptions } from "../redux/notesSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../redux/userSlice";
import { getMeCall } from "../redux/api/authApiCall";

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
  const { data, getAllNotesFilterOptions } = useAppSelector((state) => state.notes);
  const { authToken } = useAppSelector((state) => state.user);

  useEffect(() => {
    //TODO: logic düzgün çalışıyor fakat istekler 2 kere gidiyor ve her sayfa değiştiğinde getMe çalışıyor. Loading'ler de üst üste çalışıyor.
    const cookiesAuthToken = Cookies.get("authToken");
    if (cookiesAuthToken) {
      dispatch(getMeCall({ authToken: cookiesAuthToken })).then((res) => {
        if (res.payload) {
          dispatch(setAuthToken(cookiesAuthToken));
          dispatch(getAllNotesCall(getAllNotesFilterOptions));
        } else {
          Cookies.remove("authToken");
          dispatch(setAuthToken(""));
          navigate("/login");
        }
      });
    } else {
      return navigate("/login");
    }
  }, [dispatch, getAllNotesFilterOptions]);

  return (
    <>
      {authToken && (
        <section className="container">
          <AddNoteArea />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {data?.data.map((note: Note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                description={note.description}
                createdDate={convertDateTimeFormat(note.createdAt)}
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
      )}
    </>
  );
};

export default Home;
