import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "./common/login-form";
import useDarkMode from "@/hooks/useDarkMode";
import { useTranslation } from "react-i18next";
import { useKeycloak } from "@/contexts/KeycloakContext";

// image import
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import Logo from "@/assets/images/logo/logo.svg";

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
    <div className="loginwrapper min-h-screen flex items-center justify-center bg-white dark:bg-slate-800">
      <div className="w-full max-w-md">
        <div className="inner-content flex flex-col bg-white dark:bg-slate-800">
          <div className="auth-box flex flex-col justify-center">
            <div className="logo text-center mb-6">
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
          <div className="auth-footer text-center mt-8">
            {t("common.copyright")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
