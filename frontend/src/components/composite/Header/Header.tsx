import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TurkeyFlag, UsaFlag } from "../../../common/icons";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { MainButton } from "../../ui";
import { logOut } from "../../../redux/userSlice";
import Cookies from "js-cookie";
import moment from "moment";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  const { authToken, userInfo } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <header className="bg-headerBg relative z-10">
      <div className="container flex justify-between py-7 lg:py-8 text-xl">
        {/* Title */}
        <div>
          <Link to={"/"}>
            <h1 className="text-[30px] lg:hover:text-gray-100">{t("notesApp")}</h1>
          </Link>
        </div>

        <div
          className={`${
            isActive ? "left-0" : "-left-[1024px]"
          } absolute top-[89px] transition-all duration-400 lg:static border-2 lg:border-none bg-white lg:bg-transparent w-full lg:w-auto lg:h-auto  lg:flex gap-5 items-center `}
        >
          {/* Nav links */}
          <ul className="flex flex-col lg:flex-row items-center lg:items-start mt-7 lg:mt-0 lg:gap-5 gap-y-7 lg:mr-5">
            {authToken ? (
              <div className="flex items-center justify-center text-[16px] gap-2">
                <li className="cursor-default flex items-center gap-2">
                  <img
                    alt="user avatar"
                    className="w-[30px] rounded-full"
                    src={
                      userInfo?.profileImage
                        ? userInfo?.profileImage
                        : "https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360"
                    }
                  />
                  <p className="">{userInfo.email}</p>
                </li>
                <li>
                  <MainButton
                    onClick={() => {
                      dispatch(logOut());
                      Cookies.remove("authToken");
                      navigate("/login");
                    }}
                    className=" bg-red-500 rounded-[1000px] p-0"
                    fontAwesomeIconClass="fa-solid fa-right-from-bracket"
                  />
                </li>
              </div>
            ) : (
              <>
                {" "}
                <li onClick={() => setIsActive(false)} className="lg:hover:text-gray-100 ">
                  <Link to={"/login"}>{t("login")}</Link>
                </li>
                <li onClick={() => setIsActive(false)} className="lg:hover:text-gray-100">
                  {" "}
                  <Link to={"/register"}>{t("register")}</Link>
                </li>
              </>
            )}
          </ul>

          {/* Language Switcher */}
          <div
            className="flex items-center justify-center lg:justify-start my-7 lg:my-0 gap-2 cursor-pointer lg:hover:text-gray-100"
            onClick={() => {
              i18n.changeLanguage(i18n.language === "en" ? "tr" : "en");
              moment.locale(i18n.language === "en" ? "en" : "tr");
            }}
          >
            <div>
              {i18n.language === "en" ? <UsaFlag width={"35"} /> : <TurkeyFlag width={"35"} />}
            </div>
            <p className=" ">{i18n.language === "en" ? "EN" : "TR"}</p>
          </div>
        </div>

        {/* Hamburger Menu */}
        <div className="lg:hidden" onClick={() => setIsActive(!isActive)}>
          <i className="fa-solid fa-bars-staggered text-[30px]"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
