import React from "react";
import { useParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import GroupChart4 from "@/components/partials/widget/chart/group-chart-4";
import DonutChart from "@/components/partials/widget/chart/donut-chart";
import { meets, files } from "@/constant/data";
import SelectMonth from "@/components/partials/SelectMonth";
import TaskLists from "@/components/partials/widget/task-list";
import MessageList from "@/components/partials/widget/message-list";
import TrackingParcel from "@/components/partials/widget/activity";
import TeamTable from "@/components/partials/Table/team-table";
import CalendarView from "@/components/partials/widget/CalendarView";
const ProjectDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className=" space-y-5">
      <div className="grid grid-cols-12 gap-5">
        <Card className="xl:col-span-3 col-span-12 lg:col-span-5 h-full">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <GroupChart4 />
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-md p-4 mt-4">
            <span className="block dark:text-slate-400 text-sm text-slate-600">
              Progress
            </span>
            <DonutChart />
          </div>
        </Card>
        {/* end single column*/}
        <Card
          title="About project"
          className="xl:col-span-5 col-span-12 lg:col-span-7 h-full"
        >
          <div>
            <div className="text-base font-medium text-slate-800 dark:text-slate-100 mb-3">
              Background information
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              The Optimistic Website Company - Amet minim mollit non deserunt
              ullamco est sit aliqua dolor do amet sint. Velit officia consequat
              duis enim velit mollit. Exercita -tion veniam consequat sunt
              nostrud amet.
            </p>
            <br />
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint.The Optimistic Website Company - Amet minim mollit non
              deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
              consequat duis enim velit mollit. Exercita -tion veniam consequat
              sunt nostrud amet.
            </p>
            <div className="flex flex-wrap mt-8">
              <div className="xl:mr-8 mr-4 mb-3 space-y-1">
                <div className="font-semibold text-slate-500 dark:text-slate-400">
                  Existing website
                </div>
                <div className="flex items-center space-x-2 text-xs font-normal text-primary-600 dark:text-slate-300 rtl:space-x-reverse">
                  <Icon icon="heroicons:link" />
                  <a href="#">www.example.com</a>
                </div>
              </div>
              <div className="xl:mr-8 mr-4 mb-3 space-y-1">
                <div className="font-semibold text-slate-500 dark:text-slate-400">
                  Project brief
                </div>
                <div className="flex items-center space-x-2 text-xs font-normal text-primary-600 dark:text-slate-300 rtl:space-x-reverse">
                  <Icon icon="heroicons:link" />
                  <a href="#">www.example.com</a>
                </div>
              </div>
            </div>
            {/* end flex */}
            <div className="bg-slate-100 dark:bg-slate-700 rounded-sm px-4 pt-4 pb-1 flex flex-wrap justify-between mt-6">
              <div className="mr-3 mb-3 space-y-2">
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  Project owner
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  John Doe
                </div>
              </div>
              {/* end single */}
              <div className="mr-3 mb-3 space-y-2">
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  Budget
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  $75,800
                </div>
              </div>
              {/* end single */}
              <div className="mr-3 mb-3 space-y-2">
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  Start date
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  01/11/2021
                </div>
              </div>
              {/* end single */}
              <div className="mr-3 mb-3 space-y-2">
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  Deadline
                </div>
                <div className="text-xs text-warning-500">01/11/2021</div>
              </div>
              {/* end single */}
            </div>
          </div>
        </Card>
        <Card title="Notes" className="xl:col-span-4 col-span-12">
          <div className="-mx-6 custom-calender mb-6">
            <CalendarView />
          </div>
          <ul className="divide-y divide-slate-100 dark:divide-slate-700!">
            {meets.slice(0, 3).map((item, i) => (
              <li key={i} className="block py-[10px]">
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <div className="flex-1 flex space-x-2 rtl:space-x-reverse">
                    <div className="flex-none">
                      <div className="h-8 w-8">
                        <img
                          src={item.img}
                          alt=""
                          className="block w-full h-full object-cover rounded-full border hover:border-white border-transparent"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="block text-slate-600 text-sm dark:text-slate-300 mb-1 font-medium">
                        {item.title}
                      </span>
                      <span className="flex font-normal text-xs dark:text-slate-400 text-slate-500">
                        <span className="text-base inline-block mr-1">
                          <Icon icon="heroicons-outline:video-camera" />
                        </span>
                        {item.meet}
                      </span>
                    </div>
                  </div>
                  <div className="flex-none">
                    <span className="block text-xs text-slate-600 dark:text-slate-400">
                      {item.date}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <div className="grid xl:grid-cols-3 grid-cols-1 gap-5">
        <Card title="Task list" headerSlot={<SelectMonth />}>
          <TaskLists />
        </Card>
        <Card title="Messages" headerSlot={<SelectMonth />}>
          <MessageList />
        </Card>
        <Card title="Activity" headerSlot={<SelectMonth />}>
          <TrackingParcel />
        </Card>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="xl:col-span-8 lg:col-span-7 col-span-12">
          <Card title="Team members" noBorder>
            <TeamTable />
          </Card>
        </div>
        <div className="xl:col-span-4 lg:col-span-5 col-span-12">
          <Card title="Files" headerSlot={<SelectMonth />}>
            <ul className="divide-y divide-slate-100 dark:divide-slate-700!">
              {files.map((item, i) => (
                <li key={i} className="block py-[8px]">
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <div className="flex-1 flex space-x-2 rtl:space-x-reverse">
                      <div className="flex-none">
                        <div className="h-8 w-8">
                          <img
                            src={item.img}
                            alt=""
                            className="block w-full h-full object-cover rounded-full border hover:border-white border-transparent"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="block text-slate-600 text-sm dark:text-slate-300">
                          {item.title}
                        </span>
                        <span className="block font-normal text-xs text-slate-500 mt-1">
                          {item.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex-none">
                      <button
                        type="button"
                        className="text-xs text-slate-900 dark:text-white"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
