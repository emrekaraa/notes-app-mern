import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MainButton, MainTextInput } from "../components/ui";
import UploadPhoto from "../common/images/1.png";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { registerCall } from "../redux/api/authApiCall";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../utils/methods";

const Register = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  interface RegisterForm {
    fullName: string;
    email: string;
    password: string;
    rePassword: string;
    profileImageFile: string;
    profileImagePreview: string;
  }

  const formInitialState = {
    fullName: "",
    email: "",
    password: "",
    rePassword: "",
    profileImageFile: "",
    profileImagePreview: "",
  };

  const [registerForm, setRegisterForm] = useState<RegisterForm>(formInitialState);

  const handleFormChange = (e: any) => {
    if (e.target.type === "file") {
      setRegisterForm({
        ...registerForm,
        [e.target.name]: e.target.files[0],
        profileImagePreview: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    }
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (!registerForm.fullName) return toast.error(t("fillAllFields"));
    if (!validateEmail(registerForm.email)) return toast.error(t("invalidEmail"));
    if (registerForm.password.length < 6) return toast.error(t("passwordMustBe6Char"));
    if (registerForm.password !== registerForm.rePassword)
      return toast.error(t("passwordsNotMatch"));

    dispatch(
      registerCall({
        fullName: registerForm.fullName,
        email: registerForm.email,
        password: registerForm.password,
        rePassword: registerForm.rePassword,
        profileImageFile: registerForm.profileImageFile,
      })
    ).then((res) => {
      if (res.payload) {
        setRegisterForm(formInitialState);
        navigate("/login");
      }
    });
  };

  return (
    <section className="container flex items-center justify-center py-10 min-h-[85vh]">
      <form
        onSubmit={handleFormSubmit}
        className="bg-headerBg/50 min-w-[300px] md:min-w-[500px] rounded p-4 min-h-[400px]"
      >
        <h2 className="text-center text-3xl uppercase mb-4">{t("register")}</h2>

        <div className="relative p-1 mb-3 border-[2.5px] border-dashed rounded w-[120px] h-[140px] mx-auto overflow-hidden flex flex-col justify-between items-center">
          {registerForm.profileImagePreview ? (
            <>
              <img src={registerForm?.profileImagePreview} />
            </>
          ) : (
            <img className="ml-3" src={UploadPhoto} />
          )}
          <input
            onChange={handleFormChange}
            name="profileImageFile"
            type="file"
            accept="image/png, image/jpeg, image/webp, image/jpg"
            className="h-full w-full bg-red-500 absolute top-0 left-0 opacity-0"
          />
          <p className="text-xs text-mainText/60">{t("profileImage")}</p>
        </div>

        <div className="mb-3">
          <p>{t("nameSurname")}:</p>
          <MainTextInput
            onChange={handleFormChange}
            name="fullName"
            value={registerForm.fullName}
            placeholder={t("pleaseEnterNameAndSurname")}
            type="text"
          />
        </div>

        <div className="mb-3">
          <p>{t("email")}:</p>
          <MainTextInput
            onChange={handleFormChange}
            name="email"
            value={registerForm.email}
            placeholder={t("pleaseEnterEmail")}
            type="email"
          />
        </div>

        <div className="mb-3">
          <p>{t("password")}:</p>
          <MainTextInput
            onChange={handleFormChange}
            name="password"
            value={registerForm.password}
            placeholder={t("pleaseEnterPassword")}
            type="password"
          />
        </div>
        <div className="mb-3">
          <p>{t("rePassword")}:</p>
          <MainTextInput
            onChange={handleFormChange}
            name="rePassword"
            value={registerForm.rePassword}
            placeholder={t("pleaseEnterRePassword")}
            type="password"
          />
        </div>

        <div className="mt-5 ">
          <MainButton type="submit" text={t("register")} />
        </div>
      </form>
    </section>
  );
};

export default Register;
