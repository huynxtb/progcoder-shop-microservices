import React from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Link } from "react-router-dom";
import useDarkMode from "@/hooks/useDarkMode";

import LogoWhite from "@/assets/images/logo/logo-white.svg";
import Logo from "@/assets/images/logo/logo.svg";
import SvgImage from "@/assets/images/svg/img-2.svg";

const UnderConstructionPage = () => {
  const [isDark] = useDarkMode();
  return (
    <div className="min-h-screen">
      <div className="absolute left-0 top-0 w-full">
        <div className="flex flex-wrap justify-between items-center py-6 container">
          <div>
            <Link to="/">
              <img src={isDark ? LogoWhite : Logo} alt="" />
            </Link>
          </div>
          <div>
            <Button text="Contact us" btnclassName=" btn-outline-dark btn-sm" />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="flex justify-center flex-wrap items-center min-h-screen flex-col text-center">
          <img src={SvgImage} alt="" />
          <h4 className="text-3xl font-medium text-slate-900 dark:text-white mb-2">
            We are under maintenance.
          </h4>
          <p className="font-normal text-base text-slate-500 dark:text-slate-300">
            We’re making the system more awesome. <br />
            We’ll be back shortly.
          </p>
        </div>
      </div>
      <div className="fixed bottom-0 w-full">
        <div className="container">
          <div className="md:flex justify-between items-center flex-wrap space-y-4 py-6">
            <div>
              <ul className="flex md:justify-start justify-center space-x-3">
                <li>
                  <a href="#" className="social-link">
                    <Icon icon="icomoon-free:facebook" />
                  </a>
                </li>
                <li>
                  <a href="#" className="social-link">
                    <Icon icon="icomoon-free:twitter" />
                  </a>
                </li>
                <li>
                  <a href="#" className="social-link">
                    <Icon icon="icomoon-free:linkedin2" />
                  </a>
                </li>
                <li>
                  <a href="#" className="social-link">
                    <Icon icon="icomoon-free:google" />
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <ul className="flex md:justify-start justify-center space-x-3">
                <li>
                  <a
                    href="#"
                    className="text-slate-500 dark:text-slate-400 text-sm transition duration-150 hover:text-slate-900"
                  >
                    Privacy policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 dark:text-slate-400 text-sm transition duration-150 hover:text-slate-900"
                  >
                    Faq
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 dark:text-slate-400 text-sm transition duration-150 hover:text-slate-900"
                  >
                    Email us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstructionPage;
