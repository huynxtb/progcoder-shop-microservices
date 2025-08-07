import React from "react";
import Card from "./ui/Card";

const LoaderCircle = () => {
  return (
    <Card className="app_height flex flex-col items-center justify-center">
      <div
        className="w-12 h-12 rounded-full animate-spin
                    border-2 border-solid border-slate-900 dark:border-slate-200 border-t-transparent"
      ></div>
    </Card>
  );
};

export default LoaderCircle;
