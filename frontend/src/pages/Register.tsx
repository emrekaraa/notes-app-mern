import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MainButton, MainTextInput } from "../components/ui";

const Register = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="container flex items-center justify-center h-[85vh]">
      <form className="bg-headerBg/50 min-w-[300px] md:min-w-[500px] rounded p-4 min-h-[400px]">
        <h2 className="text-center text-3xl uppercase mb-4">{t("register")}</h2>

        <div className="mb-3">
          <p>{t("nameSurname")}:</p>
          <MainTextInput type="text" />
        </div>

        <div className="mb-3">
          <p>{t("email")}:</p>
          <MainTextInput type="email" />
        </div>

        <div className="mb-3">
          <p>{t("password")}:</p>
          <MainTextInput type="password" />
        </div>
        <div className="mb-3">
          <p>{t("rePassword")}:</p>
          <MainTextInput type="password" />
        </div>

        <div className="mt-5 ">
          <MainButton type="submit" text={t("register")} />
        </div>
      </form>
    </section>
  );
};

export default Register;
