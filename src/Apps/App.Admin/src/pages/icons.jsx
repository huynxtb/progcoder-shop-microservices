import React from "react";
import Tooltip from "@/components/ui/Tooltip";
import Icon from "@/components/ui/Icon";
import useSkin from "@/hooks/useSkin";
const icons = [
  {
    name: "heroicons:academic-cap",
  },
  {
    name: "heroicons:adjustments-horizontal",
  },
  {
    name: "heroicons:adjustments-vertical",
  },
  {
    name: "heroicons:archive-box",
  },
  {
    name: "heroicons:archive-box-arrow-down",
  },
  {
    name: "heroicons:archive-box-x-mark",
  },
  {
    name: "heroicons:arrow-down",
  },
  {
    name: "heroicons:arrow-down-circle",
  },
  {
    name: "heroicons:arrow-down-left",
  },
  {
    name: "heroicons:arrow-down-on-square",
  },
  {
    name: "heroicons:arrow-up-tray",
  },
  {
    name: "heroicons:arrows-pointing-in",
  },
  {
    name: "heroicons:cloud",
  },
  {
    name: "heroicons:cog",
  },
  {
    name: "heroicons:command-line",
  },
  {
    name: "heroicons:computer-desktop",
  },
  {
    name: "heroicons:cpu-chip",
  },
  {
    name: "heroicons:document-arrow-down",
  },
  {
    name: "heroicons:envelope",
  },
  {
    name: "heroicons:envelope-open",
  },
  {
    name: "heroicons:exclamation-circle",
  },
  {
    name: "heroicons:exclamation-triangle",
  },
  {
    name: "heroicons:eye",
  },
  {
    name: "heroicons:eye-dropper",
  },
  {
    name: "heroicons:film",
  },
  {
    name: "heroicons:heart",
  },
  {
    name: "heroicons:inbox",
  },
  {
    name: "heroicons:inbox",
  },
  {
    name: "heroicons:information-circle",
  },
  {
    name: "heroicons:lifebuoy",
  },
  {
    name: "heroicons:identification",
  },
  {
    name: "heroicons:key",
  },
  {
    name: "heroicons:link",
  },
  {
    name: "heroicons:pencil-square",
  },
  { name: "heroicons:rectangle-stack" },
  { name: "heroicons:rocket-launch" },
  { name: "heroicons:window" },
  { name: "heroicons:wifi" },
  { name: "heroicons:wallet" },
  { name: "heroicons:variable" },
  { name: "heroicons:users" },
  { name: "heroicons:user-plus" },
  { name: "heroicons:user-minus" },
  { name: "heroicons:user-group" },
  { name: "heroicons:user-circle" },
  { name: "heroicons:user" },
  { name: "heroicons:square-2-stack" },
  { name: "heroicons:shopping-bag" },
  { name: "heroicons:shield-check" },
  { name: "heroicons:share" },
  { name: "heroicons:wrench" },
];
const IconPage = () => {
  const [skin] = useSkin();
  return (
    <ul className="flex icon-lists flex-wrap">
      {icons.map((item, i) => (
        <li key={i}>
          <Tooltip placement="top" arrow content={item.name}>
            <div
              className={`rounded-md bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xl  py-3 px-4 ${
                skin === "bordered"
                  ? " border border-gray-5002 dark:border-slate-700"
                  : "shadow-base"
              }`}
            >
              <Icon icon={item.name} />
            </div>
          </Tooltip>
        </li>
      ))}
      <li className="text-center block w-full mt-6">
        <a
          href="https://icon-sets.iconify.design"
          target="_blank"
          className="btn btn-dark dark:bg-slate-700"
        >
          View All iconify Icons
        </a>
      </li>
    </ul>
  );
};

export default IconPage;
