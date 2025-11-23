import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "./common/login-form";
import Social from "./common/social";
import useDarkMode from "@/hooks/useDarkMode";
import { useTranslation } from "react-i18next";
import { useKeycloak } from "@/contexts/KeycloakContext";

// image import
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import Logo from "@/assets/images/logo/logo.svg";
import Illustration from "@/assets/images/auth/ils1.svg";

const login = () => {
  const [isDark] = useDarkMode();
  const { t } = useTranslation();
  const { authenticated, keycloakReady } = useKeycloak();
  const navigate = useNavigate();

  useEffect(() => {
    // If already authenticated, redirect to / (root - ecommerce page)
    if (keycloakReady && authenticated) {
      navigate("/", { replace: true });
    }
  }, [authenticated, keycloakReady, navigate]);

  return (
    <div className="loginwrapper">
      <div className="lg-inner-column">
        <div className="left-column relative z-1">
          <div className="max-w-[520px] pt-20 ltr:pl-20 rtl:pr-20">
            <Link to="/">
              <img src={isDark ? LogoWhite : Logo} alt="" className="mb-10" />
            </Link>
            <h4>
              {t("auth.unlockProject")}{" "}
              <span className="text-slate-800 dark:text-slate-400 font-bold">
                {t("auth.performance")}
              </span>
            </h4>
          </div>
          <div className="absolute left-0 2xl:bottom-[-160px] bottom-[-130px] h-full w-full z-[-1]">
            <img
              src={Illustration}
              alt=""
              className="h-full w-full object-contain"
            />
          </div>
        </div>
        <div className="right-column relative">
          <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
            <div className="auth-box h-full flex flex-col justify-center">
              <div className="mobile-logo text-center mb-6 lg:hidden block">
                <Link to="/">
                  <img
                    src={isDark ? LogoWhite : Logo}
                    alt=""
                    className="mx-auto"
                  />
                </Link>
              </div>
              <div className="text-center 2xl:mb-10 mb-4">
                <h4 className="font-medium">{t("auth.signIn")}</h4>
                <div className="text-slate-500 text-base">
                  {t("auth.signInToAccount")}
                </div>
              </div>
              <LoginForm />
              <div className="relative border-b-[#9AA2AF]/15 border-b pt-6">
                <div className="absolute inline-block bg-white dark:bg-slate-800 dark:text-slate-400 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm text-slate-500 font-normal">
                  {t("common.orContinueWith")}
                </div>
              </div>
              <div className="max-w-[242px] mx-auto mt-8 w-full">
                <Social />
              </div>
              <div className="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 mt-12 uppercase text-sm">
                {t("common.dontHaveAccount")}{" "}
                <Link
                  to="/register"
                  className="text-slate-900 dark:text-white font-medium hover:underline"
                >
                  {t("common.signUp")}
                </Link>
              </div>
            </div>
            <div className="auth-footer text-center">
              {t("common.copyright")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
