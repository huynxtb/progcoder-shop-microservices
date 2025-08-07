import React from "react";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import { toggleSingleModal } from "./store";
import { useDispatch, useSelector } from "react-redux";

// import images

import InboxImage1 from "@/assets/images/all-img/inbox-1.png";
import InboxImage2 from "@/assets/images/all-img/inbox-2.png";
import InboxImage3 from "@/assets/images/all-img/inbox-3.png";

const EmailDetails = () => {
  const dispatch = useDispatch();
  const { singleEmail } = useSelector((state) => state.email);
  return (
    <div className="absolute left-0 top-0 w-full h-full bg-white dark:bg-slate-800 z-55 rounded-md p-6 overflow-y-auto">
      <div className="flex items-center border-b border-slate-100 dark:border-slate-700 -mx-6 pb-6 mb-6 px-6">
        <div className="flex-1">
          <Tooltip content="Back" placement="top" arrow>
            <button
              className="email-icon"
              type="button"
              onClick={() => {
                dispatch(toggleSingleModal());
              }}
            >
              <Icon icon="heroicons-outline:arrow-left" />
            </button>
          </Tooltip>
        </div>
        <div className="flex-none flex items-center space-x-4 rtl:space-x-reverse">
          <Tooltip placement="top" arrow content="Forward">
            <button className="email-icon" type="button">
              <Icon icon="heroicons-outline:logout" />
            </button>
          </Tooltip>
          <Tooltip placement="top" arrow content="Favorite">
            <button className="email-icon">
              <Icon icon="heroicons-outline:star" />
            </button>
          </Tooltip>
          <Tooltip placement="top" arrow content="Archive">
            <button className="email-icon">
              <Icon icon="heroicons-outline:archive" />
            </button>
          </Tooltip>
          <Tooltip placement="top" arrow content="Print">
            <button className="email-icon">
              <Icon icon="heroicons-outline:printer" />
            </button>
          </Tooltip>
          <Tooltip placement="top" arrow content="Delete">
            <button className="email-icon">
              <Icon icon="heroicons-outline:trash" />
            </button>
          </Tooltip>
          <Tooltip placement="top" arrow content="Action">
            <button className="email-icon">
              <Icon icon="heroicons-outline:dots-horizontal" />
            </button>
          </Tooltip>
        </div>
      </div>

      <div>
        <div className="text-lg font-medium text-slate-600 dark:text-slate-300">
          Pay bills & win up to 600$ Cashback!
        </div>
        <div className="flex space-x-3 pt-4 pb-6 items-start rtl:space-x-reverse">
          <div className="flex-none">
            <div className="h-8 w-8 rounded-full text-white">
              <img
                src={singleEmail.image}
                alt=""
                className="block w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <span className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-4">
              Esther Howard
            </span>
          </div>
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-300 font-normal">
          Hi Jane Cooper,
          <br />
          <br />
          Jornalists call this critical, introductory section the "Lede," and
          when bridge properly executed, it's the that carries your reader from
          an headine try at attention-grabbing to the body of your blog post, if
          you want to get it right on of these 10 clever ways to omen your next
          blog
          <br />
          <br />
          posr with a bang With resrpect, i must disagree with Mr.Zinsser. We
          all know the most part of important part of any article is the
          title.Without a compelleing title, your reader won't even get to the
          first sentence.After the title, however, the first few sentences of
          your article are certainly the most important part.
          <br />
          <br />
          Best regards, <br />
          Esther Howard
        </div>
        <div className="border-t border-b py-4 my-6 border-slate-100 dark:border-slate-700 flex flex-wrap space-x-5 rtl:space-x-reverse">
          <div className="text-center">
            <div className="h-[95px] w-[150px] rounded-sm">
              <img
                src={InboxImage1}
                alt=""
                className="block w-full h-full object-cover"
              />
            </div>
            <button className="text-sm text-primary-500 mt-2" type="button">
              Download
            </button>
          </div>

          <div className="text-center">
            <div className="h-[95px] w-[150px] rounded-sm">
              <img
                src={InboxImage2}
                alt=""
                className="block w-full h-full object-cover"
              />
            </div>
            <button className="text-sm text-primary-500 mt-2" type="button">
              Download
            </button>
          </div>

          <div className="text-center">
            <div className="h-[95px] w-[150px] rounded-sm">
              <img
                src={InboxImage3}
                alt=""
                className="block w-full h-full object-cover"
              />
            </div>
            <button className="text-sm text-primary-500 mt-2" type="button">
              Download
            </button>
          </div>
        </div>

        <div>
          <Button
            icon="heroicons-outline:chat-alt-2"
            text="Reply"
            className="bg-slate-100 text-slate-900 dark:text-slate-300 hover:bg-slate-300 dark:bg-slate-900 btn-sm "
          />
        </div>
      </div>
    </div>
  );
};

export default EmailDetails;
