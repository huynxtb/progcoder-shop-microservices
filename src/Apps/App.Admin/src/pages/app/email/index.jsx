import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import SimpleBar from "simplebar-react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleMobileEmailSidebar,
  toggleEmailModal,
  setFilter,
  setSearch,
} from "./store";
import { ToastContainer } from "react-toastify";
import Badge from "@/components/ui/Badge";
import useWidth from "@/hooks/useWidth";
import ComposeEmail from "./ComposeEmail";
import Emails from "./Emails";
import ListLoading from "@/components/skeleton/ListLoading";
import { topFilterLists, bottomFilterLists } from "@/constant/data";
import Topfilter from "./Topfilter";
import BottomFilter from "./BottomFilter";
import EmailHeader from "./EmailHeader";
import EmailDetails from "./EmailDetails";
const EmailPage = () => {
  const { width, breakpoints } = useWidth();
  const dispatch = useDispatch();

  const { mobileEmailSidebar, emails, search, filter, singleModal } =
    useSelector((state) => state.email);

  const [isLoading, setLoading] = useState(false);
  const filteredEmails = emails
    .filter((email) => {
      if (search) {
        return email.title.toLowerCase().includes(search.toLowerCase());
      }
      return true;
    })
    .filter((email) => {
      if (filter === "all") {
        return email;
      } else if (filter === "fav") {
        return email.isfav;
      } else if (filter === "sent") {
        return email.sent;
      } else if (filter === "personal") {
        return email.personal;
      } else if (filter === "business") {
        return email.business;
      } else if (filter === "drafts") {
        return email.draft;
      } else if (
        filter === "spam" ||
        filter === "social" ||
        filter === "promotions"
      ) {
        return email.isspam;
      } else if (filter === "trash") {
        return email.isdelate;
      }
    });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    if (width < breakpoints.lg && mobileEmailSidebar) {
      dispatch(toggleMobileEmailSidebar(false));
    }
  }, [filter]);

  const handleFilter = (filter) => {
    dispatch(setFilter(filter));
  };

  return (
    <>
      <ToastContainer />

      <div className="flex md:space-x-5 app_height overflow-hidden relative rtl:space-x-reverse">
        <div
          className={`transition-all duration-150 flex-none min-w-[260px] 
        ${
          width < breakpoints.lg
            ? "absolute h-full top-0 md:w-[260px] w-[200px] z-999"
            : "flex-none min-w-[260px]"
        }
        ${
          width < breakpoints.lg && mobileEmailSidebar
            ? "left-0 "
            : "-left-full "
        }
        `}
        >
          <Card bodyClass=" py-6 h-full flex flex-col" className="h-full">
            <div className="flex-1 h-full px-6">
              <Button
                icon="heroicons-outline:plus"
                text="Compose"
                className="btn-dark w-full block  "
                onClick={() => dispatch(toggleEmailModal(true))}
              />
            </div>

            <SimpleBar className="h-full px-6 ">
              <ul className="list mt-6">
                {topFilterLists?.map((item, i) => (
                  <Topfilter
                    item={item}
                    key={i}
                    filter={filter}
                    onClick={() => handleFilter(item.value)}
                  />
                ))}
              </ul>
              <div className="block py-4 text-slate-800 dark:text-slate-400 font-semibold text-xs uppercase">
                Tags
              </div>
              <ul>
                {bottomFilterLists?.map((item, i) => (
                  <BottomFilter
                    item={item}
                    key={i}
                    filter={filter}
                    onClick={() => handleFilter(item.value)}
                  />
                ))}
              </ul>
            </SimpleBar>
          </Card>
        </div>
        {/* overlay */}
        {width < breakpoints.lg && mobileEmailSidebar && (
          <div
            className="overlay bg-slate-900 dark:bg-slate-900 dark:bg-opacity-60 bg-opacity-60 backdrop-filter
         backdrop-blur-xs absolute w-full flex-1 inset-0 z-99 rounded-md"
          ></div>
        )}
        <div className="flex-1 md:w-[calc(100%-320px)]">
          <Card bodyClass="p-0  h-full relative" className="h-full">
            <EmailHeader
              onChange={(e) => dispatch(setSearch(e.target.value))}
              emails={filteredEmails}
            />
            <SimpleBar className="h-full all-todos overflow-x-hidden">
              {isLoading && <ListLoading count={filteredEmails.length} />}
              {!isLoading && (
                <ul className="divide-y divide-slate-100 dark:divide-slate-700! -mb-6 h-full">
                  {filteredEmails.map((email, i) => (
                    <Emails email={email} key={i} />
                  ))}
                  {filteredEmails.length === 0 && (
                    <li className="mx-6 mt-6">
                      <Badge
                        label="No Result Found"
                        className="bg-danger-500 text-white w-full block text-start"
                      />
                    </li>
                  )}
                </ul>
              )}
            </SimpleBar>
            {singleModal && <EmailDetails />}
          </Card>
        </div>
      </div>
      <ComposeEmail />
    </>
  );
};

export default EmailPage;
