import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Icon from "@/components/ui/Icon";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

// import images
import post1Img from "@/assets/images/all-img/post-1.png";
import twitterImg from "@/assets/images/svg/tw.svg";
import facebookImg from "@/assets/images/svg/fb.svg";
import linkedInImg from "@/assets/images/svg/ln.svg";
import instagramImg from "@/assets/images/svg/ins.svg";
import comment1Img from "@/assets/images/post/c1.png";
import comment2Img from "@/assets/images/post/c2.png";
import comment3Img from "@/assets/images/post/c3.png";

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
];

const BlogDetailsPage = () => {
  return (
    <div>
      <div className="lg:flex flex-wrap blog-posts lg:space-x-5 space-y-5 lg:space-y-0 rtl:space-x-reverse">
        <div className="flex-none">
          <div className="lg:max-w-[360px]">
            <Card>
              <Sidebar />
            </Card>
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 gap-5">
            <Card>
              <div className=" h-[248px] w-full mb-6 ">
                <img
                  src={post1Img}
                  alt=""
                  className=" w-full h-full  object-cover"
                />
              </div>
              <div className="flex justify-between mb-4">
                <Link to="#">
                  <span className="inline-flex leading-5 text-slate-500 dark:text-slate-500 text-sm font-normal">
                    <Icon
                      icon="heroicons-outline:calendar"
                      className="text-slate-400 dark:text-slate-500 ltr:mr-2 rtl:ml-2 text-lg"
                    />
                    10/02/2021
                  </span>
                </Link>
                <div className="flex space-x-4 rtl:space-x-reverse">
                  <Link to="#">
                    <span className="inline-flex leading-5 text-slate-500 dark:text-slate-500 text-sm font-normal">
                      <Icon
                        icon="heroicons-outline:chat"
                        className="text-slate-400 dark:text-slate-500 ltr:mr-2 rtl:ml-2 text-lg"
                      />
                      3
                    </span>
                  </Link>
                  <Link to="#">
                    <span className="inline-flex leading-5 text-slate-500 dark:text-slate-500 text-sm font-normal">
                      <Icon
                        icon="heroicons-outline:share"
                        className="text-slate-400 dark:text-slate-500 ltr:mr-2 rtl:ml-2 text-lg"
                      />
                      4
                    </span>
                  </Link>
                </div>
              </div>
              <h5 className="card-title text-slate-900">
                <Link to="#">At Healthcare you will be treated by caring</Link>
              </h5>
              <div className="card-text dark:text-slate-300 mt-4 space-y-4 leading-5 text-slate-600 text-sm border-b border-slate-100 dark:border-slate-700 pb-6">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip.Lorem ipsum dolor sit amet,
                  consectetur adipiscing eli.
                </p>
                <p className="font-medium text-base">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum!
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididun ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ulla mco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehende rit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididun ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ulla mco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehende rit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididun ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </p>
              </div>
              <div className="mt-6">
                <ul className="flex items-center space-x-3 rtl:space-x-reverse">
                  <li className="dark:text-slate-300">share:</li>
                  <li>
                    <a href="#">
                      <img src={twitterImg} alt="" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={facebookImg} alt="" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={linkedInImg} alt="" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={instagramImg} alt="" />
                    </a>
                  </li>
                </ul>
                <ul className="lg:flex items-center lg:space-x-3 lg:rtl:space-x-reverse mt-4 border-b border-slate-100 dark:border-slate-700 pb-6">
                  <li className="dark:text-slate-300">Popular tags:</li>
                  {tags.map((item, i) => (
                    <li key={i}>
                      <Link
                        to="#"
                        className="text-xs font-normal text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-600 py-1 px-3 rounded-full hover:bg-slate-900 hover:text-white transition duration-150"
                      >
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="comments mt-6 space-y-4">
                  <li className="block">
                    <div className="flex">
                      <div className="flex-none">
                        <div className="h-[56px] w-[56px] rounded-full ltr:mr-6 rtl:ml-6">
                          <img
                            src={comment1Img}
                            alt=""
                            className="w-full block h-full object-contain rounded-full"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap justify-between mb-2">
                          <span className="text-slate-600 text-base dark:text-slate-300 font-normal">
                            Marvin McKinney
                          </span>

                          <span className="text-sm text-slate-500 dark:text-slate-500 flex space-x-1 rtl:space-x-reverse items-center">
                            <Icon
                              icon="heroicons:clock"
                              className="text-base"
                            />
                            <span>Oct 09, 2021</span>
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididun ut lab ore et
                          dolore magna aliqua.
                        </p>
                        <div className="mt-2">
                          <Link
                            to="#"
                            className="flex space-x-2 items-center dark:text-slate-500 text-xs font-medium rtl:space-x-reverse"
                          >
                            <span>Reply</span>
                            <Icon
                              icon="heroicons:arrow-right-20-solid"
                              className="text-lg"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <ul className="comments mt-4 pl-8">
                      <li className="block">
                        <div className="flex">
                          <div className="flex-none">
                            <div className="h-[56px] w-[56px] rounded-full ltr:mr-6 rtl:ml-6">
                              <img
                                src={comment2Img}
                                alt=""
                                className="w-full block h-full object-contain rounded-full"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap justify-between mb-2">
                              <span className="text-slate-600 text-base dark:text-slate-300 font-normal">
                                Marvin McKinney
                              </span>

                              <span className="text-sm text-slate-500 dark:text-slate-500 flex space-x-1 items-center rtl:space-x-reverse">
                                <Icon
                                  icon="heroicons:clock"
                                  className="text-base"
                                />

                                <span>Oct 09, 2021</span>
                              </span>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididun ut lab ore
                              et dolore magna aliqua.
                            </p>
                            <div className="mt-2">
                              <Link
                                to="#"
                                className="flex space-x-2 items-center dark:text-slate-500 text-xs font-medium rtl:space-x-reverse"
                              >
                                <span>Reply</span>
                                <Icon
                                  icon="heroicons:arrow-right-20-solid"
                                  className="text-lg"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="block">
                    <div className="flex">
                      <div className="flex-none">
                        <div className="h-[56px] w-[56px] rounded-full ltr:mr-6 rtl:ml-6">
                          <img
                            src={comment3Img}
                            alt=""
                            className="w-full block h-full object-contain rounded-full"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap justify-between mb-2">
                          <span className="text-slate-600 text-base dark:text-slate-300 font-normal">
                            Marvin McKinney
                          </span>

                          <span className="text-sm text-slate-500 dark:text-slate-500 flex space-x-1 items-center rtl:space-x-reverse">
                            <Icon
                              icon="heroicons:clock"
                              className="text-base"
                            />

                            <span>Oct 09, 2021</span>
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididun ut lab ore et
                          dolore magna aliqua.
                        </p>
                        <div className="mt-2">
                          <Link
                            to="#"
                            className="flex space-x-2 items-center dark:text-slate-500 text-xs font-medium rtl:space-x-reverse"
                          >
                            <span>Reply</span>
                            <Icon
                              icon="heroicons:arrow-right-20-solid"
                              className="text-lg"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="post-comments bg-slate-100 dark:bg-slate-900 p-6 rounded-md mt-6">
                  <h4 className="text-lg font-medium text-slate-500 dark:text-slate-100 mb-4">
                    Leave a comment
                  </h4>
                  <form action="#">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
                      <div className="lg:col-span-2">
                        <Textarea
                          label="Comment"
                          placeholder="writte your comment"
                        />
                      </div>
                      <Textinput
                        label="Full name"
                        placeholder="Full name"
                        type="text"
                      />
                      <Textinput
                        label="Email"
                        placeholder="Email Address"
                        type="email"
                      />
                    </div>
                    <div className="text-right">
                      <Button
                        text="Post comment"
                        type="submit"
                        className=" btn-dark mt-3 "
                      />
                    </div>
                  </form>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
