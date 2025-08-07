import React from "react";
import { Link } from "react-router-dom";
import InputGroup from "@/components/ui/InputGroup";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

// import images
import t1Img from "@/assets/images/post/t-1.png";
import t2Img from "@/assets/images/post/t-2.png";
import t3Img from "@/assets/images/post/t-3.png";

const category = [
  {
    cta: "Graphic Designer (214) ",
  },
  {
    cta: "Engineering Jobs (514) ",
  },
  {
    cta: "Mainframe Jobs (554)",
  },
  {
    cta: "Legal Jobs (457)",
  },
  {
    cta: "IT Jobs (1254) ",
  },
  {
    cta: "R&D Jobs (554) ",
  },
  {
    cta: "Government Jobs (350) ",
  },
  {
    cta: "PSL Jobs (221)",
  },
];
const posts = [
  {
    img: t1Img,
  },
  {
    img: t2Img,
  },
  {
    img: t3Img,
  },
];
const tags = [
  {
    title: "Business",
    link: "#",
  },
  {
    title: "Consulting",
    link: "#",
  },
  {
    title: "Photographic",
    link: "#",
  },
  {
    title: "Investment",
    link: "#",
  },
  {
    title: "Camera",
    link: "#",
  },
  {
    title: "Assurance",
    link: "#",
  },
  {
    title: "Secutity",
    link: "#",
  },
];
const Sidebar = () => {
  return (
    <div className="space-y-1 divide-y divide-slate-100 dark:divide-slate-700! -mx-6">
      <div className="p-6 pt-0!">
        <InputGroup
          type="text"
          placeholder="Search...."
          append={
            <Button
              icon="heroicons-outline:search"
              className="btn-dark dark:bg-slate-600"
            />
          }
        />
      </div>
      <div className="py-4 px-6">
        <h4 className="text-slate-600 dark:text-slate-300 text-xl font-medium mb-4">
          Latest Blogs Post
        </h4>
        <ul className="list-item space-y-4">
          {posts.map((item, i) => (
            <li key={i}>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <div className="flex-none">
                  <div className="h-20 w-20">
                    <img
                      src={item.img}
                      alt=""
                      className="block w-full h-full"
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <h4 className="text-sm text-slate-600 font-regular leading-5 mb-4">
                    <Link to="#">
                      Lorem ipsum dolor sit amet consectetur adipiscing
                    </Link>
                    .
                  </h4>
                  <span className="text-xs text-slate-400">
                    <Link to="#">Oct 09, 2021</Link>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-4 px-6">
        <h4 className="text-slate-600 dark:text-slate-300 text-xl font-medium mb-4">
          Category
        </h4>
        <ul className="list-item space-y-6">
          {category.map((item, i) => (
            <li key={i}>
              <Link
                to="#"
                className="flex space-x-1 items-start leading-none text-sm text-slate-500 dark:text-slate-300 hover:text-slate-900 transition duration-150 rtl:space-x-reverse"
              >
                <span className="text-sm">
                  <Icon icon="heroicons:chevron-right-solid" />
                </span>
                <span>{item.cta}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-4 px-6">
        <h4 className="text-slate-600 dark:text-slate-300 text-xl font-medium mb-4">
          Popular tags
        </h4>
        <ul className="flex flex-wrap">
          {tags.map((item, i) => (
            <li key={i} className="mr-2 mb-2">
              <Link
                to={item.link}
                className="text-xs font-normal text-slate-600 bg-slate-100 dark:bg-slate-600 dark:text-slate-300 py-1 px-3 rounded-full hover:bg-slate-900 hover:text-white transition duration-150"
              >
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-6 mt-4 bg-slate-900 dark:bg-slate-900 text-white rounded-xl p-6 space-y-4">
        <h4 className="text-xl font-medium text-white">
          Subscribe to our blog
        </h4>
        <div className="text-sm">
          Lorem ipsum dolor sit amet, consectet ur adipiscing elit.
        </div>
        <form action="#" className="space-y-4">
          <input
            type="text"
            placeholder="Enter your email"
            className="form-control py-2 bg-transparent border-secondary-500 text-white placeholder:text-slate-400"
          />
          <button type="button" className="btn btn-light btn-sm w-full">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
