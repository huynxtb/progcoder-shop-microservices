import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { reportService } from "@/services/reportService";
import { useTranslation } from "react-i18next";

const GroupChart2 = () => {
  const { t } = useTranslation();
  const [statistics, setStatistics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStatistics = async () => {
      try {
        setIsLoading(true);
        const response = await reportService.getDashboardStatistics();
        
        // API returns { result: { items: [...] } }
        if (response?.result?.items) {
          setStatistics(response.result.items);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard statistics:", error);
        // Set empty array on error to prevent UI breaks
        setStatistics([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStatistics();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <Card bodyClass="pt-4 pb-3 px-4">
              <div className="flex space-x-3 rtl:space-x-reverse animate-pulse">
                <div className="flex-none">
                  <div className="bg-slate-200 dark:bg-slate-700 h-12 w-12 rounded-full"></div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                  <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {statistics.map((item, i) => (
        <div key={item.id || i}>
          <Card bodyClass="pt-4 pb-3 px-4">
            <div className="flex space-x-3 rtl:space-x-reverse">
              <div className="flex-none">
                <div
                  className={`${item.bg} ${item.text} h-12 w-12 rounded-full flex flex-col items-center justify-center text-2xl`}
                >
                  <Icon icon={item.icon} />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-slate-600 dark:text-slate-300 text-sm mb-1 font-medium">
                  {item.title}
                </div>
                <div className="text-slate-900 dark:text-white text-lg font-medium">
                  {item.count}
                </div>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </>
  );
};

export default GroupChart2;
