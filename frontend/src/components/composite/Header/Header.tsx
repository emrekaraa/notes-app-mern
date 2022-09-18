import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TurkeyFlag, UsaFlag } from "../../../common/icons";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isActive, setIsActive] = useState(false);

  return (
    <header className="bg-headerBg">
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
            <li onClick={() => setIsActive(false)} className="lg:hover:text-gray-100 ">
              <Link to={"/login"}>{t("login")}</Link>
            </li>
            <li onClick={() => setIsActive(false)} className="lg:hover:text-gray-100">
              {" "}
              <Link to={"/register"}>{t("register")}</Link>
            </li>
          </ul>

          {/* Language Switcher */}
          <div
            className="flex items-center justify-center lg:justify-start my-7 lg:my-0 gap-2 cursor-pointer lg:hover:text-gray-100"
            onClick={() => {
              i18n.changeLanguage(i18n.language === "en" ? "tr" : "en");
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
