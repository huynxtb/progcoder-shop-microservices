import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
// import images
import post1Img from "@/assets/images/all-img/post-1.png";

const BlogPage = () => {
  return (
    <div className="lg:flex flex-wrap blog-posts lg:space-x-5 space-y-5 lg:space-y-0 rtl:space-x-reverse">
      <div className="flex-none">
        <div className="lg:max-w-[360px]">
          <Card>
            <Sidebar />
          </Card>
        </div>
      </div>
      <div className="flex-1">
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
          <div className="xl:col-span-2 col-span-1">
            <Card>
              <div className=" h-[248px] w-full mb-6 ">
                <img
                  src={post1Img}
                  alt=""
                  className=" w-full h-full  object-cover"
                />
              </div>
              <div className="flex justify-between mb-4">
                <Link to="/blog-details">
                  <span className="inline-flex leading-5 text-slate-500 dark:text-slate-400 text-sm font-normal">
                    <Icon
                      icon="heroicons-outline:calendar"
                      className="text-slate-400 dark:text-slate-400 ltr:mr-2 rtl:ml-2 text-lg"
                    />
                    10/02/2021
                  </span>
                </Link>
                <div className="flex space-x-4 rtl:space-x-reverse">
                  <Link to="#">
                    <span className="inline-flex leading-5 text-slate-500 dark:text-slate-400 text-sm font-normal">
                      <Icon
                        icon="heroicons-outline:chat"
                        className="text-slate-400 dark:text-slate-400 ltr:mr-2 rtl:ml-2 text-lg"
                      />
                      3
                    </span>
                  </Link>
                  <Link to="#">
                    <span className="inline-flex leading-5 text-slate-500 dark:text-slate-400 text-sm font-normal">
                      <Icon
                        icon="heroicons-outline:share"
                        className="text-slate-400 dark:text-slate-400 ltr:mr-2 rtl:ml-2 text-lg"
                      />
                      4
                    </span>
                  </Link>
                </div>
              </div>
              <h5 className="card-title text-slate-900">
                <Link to="/blog-details">
                  At Healthcare you will be treated by caring
                </Link>
              </h5>
              <div className="card-text dark:text-slate-300 mt-4 space-y-4">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip.Lorem ipsum dolor sit amet,
                  consectetur adipiscing eli.
                </p>
                <Button
                  className="btn-outline-dark"
                  text="Read more"
                  link="#"
                />
              </div>
            </Card>
          </div>
          <Card bodyClass="p-0">
            <div className=" h-[248px] w-full mb-6 ">
              <img
                src={post1Img}
                alt=""
                className=" w-full h-full  object-cover"
              />
            </div>
            <div className="px-6 pb-6">
              <div className="flex justify-between mb-4">
                <div>
                  <h5 className="card-title text-slate-900">
                    <Link to="#">Lorem ipsum</Link>
                  </h5>
                </div>
                <Link to="#">
                  <span className="inline-flex leading-5 text-slate-500 dark:text-slate-400 text-sm font-normal">
                    <Icon
                      icon="heroicons-outline:calendar"
                      className="text-slate-400 dark:text-slate-400 ltr:mr-2 rtl:ml-2 text-lg"
                    />
                    10/02/2021
                  </span>
                </Link>
              </div>

              <div className="card-text dark:text-slate-300 mt-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="mt-4 space-x-4 rtl:space-x-reverse">
                  <Link to="#" className="btn-link">
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </Card>
          <Card bodyClass="p-0">
            <div className=" h-[248px] w-full  ">
              <img
                src={post1Img}
                alt=""
                className=" w-full h-full  object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between mb-4">
                <div>
                  <h5 className="card-title text-slate-900">
                    <Link to="#">Lorem ipsum</Link>
                  </h5>
                </div>
                <Link to="#">
                  <span className="inline-flex leading-5 text-slate-500 dark:text-slate-400 text-sm font-normal">
                    <Icon
                      icon="heroicons-outline:calendar"
                      className="text-slate-400 dark:text-slate-400 ltr:mr-2 rtl:ml-2 text-lg"
                    />
                    10/02/2021
                  </span>
                </Link>
              </div>

              <div className="card-text dark:text-slate-300 mt-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="mt-4 space-x-4 rtl:space-x-reverse">
                  <Link to="#" className="btn-link">
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </Card>
          <Card bodyClass="p-0">
            <div className=" h-[248px] w-full mb-6 ">
              <img
                src={post1Img}
                alt=""
                className=" w-full h-full  object-cover"
              />
            </div>
            <div className="px-6 pb-6">
              <div className="flex justify-between mb-4">
                <div>
                  <h5 className="card-title text-slate-900">
                    <Link to="#">Lorem ipsum</Link>
                  </h5>
                </div>
                <Link to="#">
                  <span className="inline-flex leading-5 text-slate-500 dark:text-slate-400 text-sm font-normal">
                    <Icon
                      icon="heroicons-outline:calendar"
                      className="text-slate-400 dark:text-slate-400 ltr:mr-2 rtl:ml-2 text-lg"
                    />
                    10/02/2021
                  </span>
                </Link>
              </div>

              <div className="card-text dark:text-slate-300 mt-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="mt-4 space-x-4 rtl:space-x-reverse">
                  <Link to="#" className="btn-link">
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </Card>
          <Card bodyClass="p-0">
            <div className=" h-[248px] w-full  ">
              <img
                src={post1Img}
                alt=""
                className=" w-full h-full  object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between mb-4">
                <div>
                  <h5 className="card-title text-slate-900">
                    <Link to="#">Lorem ipsum</Link>
                  </h5>
                </div>
                <Link to="#">
                  <span className="inline-flex leading-5 text-slate-500 dark:text-slate-400 text-sm font-normal">
                    <Icon
                      icon="heroicons-outline:calendar"
                      className="text-slate-400 dark:text-slate-400 ltr:mr-2 rtl:ml-2 text-lg"
                    />
                    10/02/2021
                  </span>
                </Link>
              </div>

              <div className="card-text dark:text-slate-300 mt-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="mt-4 space-x-4 rtl:space-x-reverse">
                  <Link to="#" className="btn-link">
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
