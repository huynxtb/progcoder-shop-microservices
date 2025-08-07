import clsx from "clsx";
const ExternalDraggingevent = ({ event }) => {
  const { title, id, tag } = event;
  return (
    <div
      title={title}
      data={id}
      className={clsx(
        " fc-event  px-4 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-sm text-sm flex space-x-2 items-center rtl:space-x-reverse shadow-xs  cursor-move "
      )}
    >
      <span
        className={clsx("h-2 w-2 rounded-full", {
          "bg-primary-500": tag === "business",
          "bg-warning-500": tag === "meeting",
          "bg-danger-500": tag === "holiday",
          "bg-info-500": tag === "etc",
        })}
      ></span>
      <span> {title}</span>
    </div>
  );
};

export default ExternalDraggingevent;
