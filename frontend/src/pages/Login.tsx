import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MainButton, MainTextInput } from "../components/ui";
import { loginCall } from "../redux/api/authApiCall";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { validateEmail } from "../utils/methods";

const Login = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validateEmail(email)) return toast.error(t("invalidEmail"));
    if (password.length < 6) return toast.error(t("passwordMustBe6Char"));

    dispatch(loginCall({ email, password })).then((res) => {
      if (res.payload) {
        navigate("/");
      }
    });
  };

  return (
    <section className="container flex items-center justify-center h-[85vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-headerBg/50 min-w-[300px] md:min-w-[500px] rounded p-4"
      >
        <h2 className="text-center text-3xl uppercase mb-4">{t("loginUpper")}</h2>

        <div className="mb-3">
          <p>{t("email")}:</p>
          <MainTextInput
            placeholder={t("pleaseEnterEmail")}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <p>{t("password")}:</p>
          <MainTextInput
            placeholder={t("pleaseEnterPassword")}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mt-5 ">
          <MainButton type="submit" text={t("loginUpper")} />
        </div>
      </form>
    </section>
  );
};

export default Login;
