import { useTranslation } from "react-i18next";
import { MainButton, MainTextInput } from "../components/ui";

const Login = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="container flex items-center justify-center h-[85vh]">
      <form className="bg-headerBg/50 min-w-[300px] md:min-w-[500px] rounded p-4">
        <h2 className="text-center text-3xl uppercase mb-4">{t("loginUpper")}</h2>

        <div className="mb-3">
          <p>{t("email")}:</p>
          <MainTextInput placeholder={t("pleaseEnterEmail")} type="email" />
        </div>

        <div className="mb-3">
          <p>{t("password")}:</p>
          <MainTextInput placeholder={t("pleaseEnterPassword")} type="password" />
        </div>

        <div className="mt-5 ">
          <MainButton type="submit" text={t("loginUpper")} />
        </div>
      </form>
    </section>
  );
};

export default Login;
