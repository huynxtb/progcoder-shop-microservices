import React from "react";

import { Link } from "react-router-dom";
import ForgotPass from "./common/forgot-pass";
import useDarkMode from "@/hooks/useDarkMode";

import LogoWhite from "@/assets/images/logo/logo-white.svg";
import Logo from "@/assets/images/logo/logo.svg";
import bgImage from "@/assets/images/all-img/login-bg.png";
const ForgotPass2 = () => {
  const [isDark] = useDarkMode();
  return (
    <div className="loginwrapper">
      <div className="lg-inner-column">
        <div className="right-column relative">
          <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
            <div className="auth-box2 flex flex-col justify-center h-full">
              <div className="mobile-logo text-center mb-6 lg:hidden block">
                <Link to="/">
                  <img
                    src={isDark ? LogoWhite : Logo}
                    alt=""
                    className="mx-auto"
                  />
                </Link>
              </div>
              <div className="text-center 2xl:mb-10 mb-5">
                <h4 className="font-medium mb-4">Forgot Your Password?</h4>
                <div className="text-slate-500 dark:text-slate-400 text-base">
                  Reset Password with progcoder.
                </div>
              </div>
              <div className="font-normal text-base text-slate-500 dark:text-slate-400 text-center px-2 bg-slate-100 dark:bg-slate-600 rounded-sm py-3 mb-4 mt-10">
                Enter your Email and instructions will be sent to you!
              </div>

              <ForgotPass />
              <div className="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-8 uppercase text-sm">
                Forget It,
                <Link
                  to="/"
                  className="text-slate-900 dark:text-white font-medium hover:underline"
                >
                  Send me Back
                </Link>
                to The Sign In
              </div>
            </div>
            <div className="auth-footer text-center">
              Copyright 2021, progcoder All Rights Reserved.
            </div>
          </div>
        </div>
        <div
          className="left-column bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        >
          <div className="flex flex-col h-full justify-center">
            <div className="flex-1 flex flex-col justify-center items-center">
              <Link to="/">
                <img src={LogoWhite} alt="" className="mb-10" />
              </Link>
            </div>
            <div>
              <div className="black-500-title max-w-[525px] mx-auto pb-20 text-center">
                Unlock your Project
                <span className="text-white font-bold">performance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass2;
