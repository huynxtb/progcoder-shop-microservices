import React from "react";
import Lock from "./common/lock";
import { Link } from "react-router-dom";
import useDarkMode from "@/hooks/useDarkMode";
// image import
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import Logo from "@/assets/images/logo/logo.svg";
import bgImage from "@/assets/images/all-img/login-bg.png";
import UserImage from "@/assets/images/all-img/user-big.png";
const LockScreen3 = () => {
  const [isDark] = useDarkMode();
  return (
    <div
      className="loginwrapper bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="lg-inner-column">
        <div className="left-columns lg:w-1/2 lg:block hidden">
          <div className="logo-box-3">
            <Link to="/" className="">
              <img src={LogoWhite} alt="" className="mb-10" />
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex flex-col items-center justify-center">
          <div className="auth-box-3">
            <div className="mobile-logo text-center mb-6 lg:hidden block">
              <Link to="/">
                <img
                  src={isDark ? LogoWhite : Logo}
                  alt=""
                  className="mx-auto"
                />
              </Link>
            </div>
            <div className="text-center mb-10">
              <h4 className="font-medium mb-4">Lock Screen</h4>
              <div className="text-slate-500 dark:text-slate-400 text-base">
                Enter your password to unlock the screen!
              </div>
            </div>
            <div className="author-bio text-center mt-10 mb-8">
              <div className="h-14 w-14 mx-auto rounded-full">
                <img
                  src={UserImage}
                  alt=""
                  className="w-full h-full object-cover block"
                />
              </div>
              <div className="text-slate-900 dark:text-white text-base font-medium mt-4">
                Kathryn Murphy
              </div>
            </div>
            <Lock />

            <div className="text-sm mx-auto w-full text-center font-normal text-slate-500 dark:text-slate-400 mt-12 uppercase">
              Not you ? return
              <Link
                to="/"
                className="text-slate-900 dark:text-white font-medium hover:underline"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
        <div className="auth-footer3 text-white py-5 px-5 text-xl w-full">
          Unlock your Project performance
        </div>
      </div>
    </div>
  );
};

export default LockScreen3;
