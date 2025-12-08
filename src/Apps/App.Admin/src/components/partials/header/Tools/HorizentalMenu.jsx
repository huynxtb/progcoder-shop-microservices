import React from "react";
import useMenuTranslation from "@/hooks/useMenuTranslation";
import Icon from "@/components/ui/Icon";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const HorizentalMenu = () => {
  const { topMenu } = useMenuTranslation();
  return (
    <div className="main-menu">
      <ul>
        {topMenu?.map((item, i) => (
          <li
            key={i}
            className={
              item.child
                ? "menu-item-has-children"
                : "" || item.megamenu
                ? "menu-item-has-children has-megamenu"
                : ""
            }
          >
            {/* Single menu*/}
            {!item.child && !item.megamenu && (
              <Link to={item.link}>
                <div className="flex flex-1 items-center space-x-[6px] rtl:space-x-reverse">
                  <span className="icon-box">
                    <Icon icon={item.icon} />
                  </span>
                  <div className="text-box">{item.title}</div>
                </div>
              </Link>
            )}
            {/* has dropdown*/}
            {(item.child || item.megamenu) && (
              <a href="#">
                <div className="flex flex-1 items-center space-x-[6px] rtl:space-x-reverse">
                  <span className="icon-box">
                    <Icon icon={item.icon} />
                  </span>
                  <div className="text-box">{item.title}</div>
                </div>
                <div className="flex-none text-sm ltr:ml-3 rtl:mr-3 leading-none relative top-1">
                  <Icon icon="heroicons-outline:chevron-down" />
                </div>
              </a>
            )}
            {/* Dropdown menu*/}
            {item.child && (
              <ul className="sub-menu">
                {item.child.map((childitem, index) => (
                  <li key={index}>
                    {childitem.isExternal || childitem.isBlank ? (
                      <a
                        href={childitem.childlink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="flex space-x-2 items-start rtl:space-x-reverse">
                          <Icon
                            icon={childitem.childicon}
                            className="leading-none text-base"
                          />
                          <span className="leading-none">
                            {childitem.childtitle}
                          </span>
                          <Icon icon="heroicons:arrow-top-right-on-square" className="w-4 h-4" />
                        </div>
                      </a>
                    ) : (
                      <Link to={childitem.childlink}>
                        <div className="flex space-x-2 items-start rtl:space-x-reverse">
                          <Icon
                            icon={childitem.childicon}
                            className="leading-none text-base"
                          />
                          <span className="leading-none">
                            {childitem.childtitle}
                          </span>
                        </div>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {/* Megamenu*/}
            {item.megamenu && (
              <div className="rt-mega-menu">
                <div className="flex flex-wrap space-x-8 justify-between rtl:space-x-reverse">
                  {item.megamenu.map((m_item, m_i) => (
                    <div key={m_i}>
                      {/* mega menu title*/}
                      <div className="text-sm font-medium text-slate-900 dark:text-white mb-2 flex space-x-1 items-center">
                        {/* <Icon icon={m_item.megamenuicon} /> */}
                        <span> {m_item.megamenutitle}</span>
                      </div>
                      {/* single menu item*/}
                      {m_item.singleMegamenu.map((ms_item, ms_i) => (
                        <NavLink to={ms_item.m_childlink} key={ms_i}>
                          {({ isActive }) => (
                            <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                              <span
                                className={`h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none ${
                                  isActive ? " bg-slate-900 dark:bg-white" : ""
                                }`}
                              ></span>
                              <span
                                className={`capitalize ${
                                  isActive
                                    ? " text-slate-900 dark:text-white font-medium"
                                    : "text-slate-600 dark:text-slate-300"
                                }`}
                              >
                                {ms_item.m_childtitle}
                              </span>
                            </div>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HorizentalMenu;
