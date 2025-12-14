import React from "react";
import { Link } from "react-router-dom";
import RegForm from "./common/reg-from";
import Social from "./common/social";
import { ToastContainer } from "react-toastify";
import useDarkMode from "@/hooks/useDarkMode";
// image import
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import Logo from "@/assets/images/logo/logo.png";
import bgImage from "@/assets/images/all-img/login-bg.png";
const register3 = () => {
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
            <div className="text-center 2xl:mb-10 mb-5">
              <h4 className="font-medium text-2xl text-slate-900 dark:text-white mb-3">
                Sign up
              </h4>
              <div className="text-slate-500 dark:text-slate-400 text-base">
                Create an account to start using progcoder
              </div>
            </div>
            <RegForm />
            <div className=" relative border-b-[#9AA2AF]/15 border-b pt-6">
              <div className=" absolute inline-block  bg-white dark:bg-slate-800 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm  text-slate-500  dark:text-slate-400font-normal ">
                Or continue with
              </div>
            </div>
            <div className="max-w-[242px] mx-auto mt-8 w-full">
              <Social />
            </div>
            <div className="max-w-[215px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-6 uppercase text-sm">
              Already registered?
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

export default register3;
