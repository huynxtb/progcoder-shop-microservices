import React from "react";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import Checkbox from "@/components/ui/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, editTodo, isCheck, isFaveCheck } from "./store";

const Tasks = ({ todo }) => {
  const { id, title, image, isDone, category, isfav } = todo;
  const { editModal } = useSelector((state) => state.todo);
  const [checked, setChecked] = React.useState(isDone);
  const [fav, setFav] = React.useState(isfav);
  const handleCheck = (id) => {
    return (event) => {
      setChecked(event.target.checked);
      dispatch(isCheck(id));
    };
  };

  const handleFav = (id) => {
    return (event) => {
      setFav(event.target.checked);
      dispatch(isFaveCheck(id));
    };
  };

  const dispatch = useDispatch();
  return (
    <>
      <li className="flex items-center px-6 space-x-4 py-6 hover:-translate-y-1 hover:shadow-todo transition-all duration-200 rtl:space-x-reverse">
        <div>
          <Checkbox value={checked} onChange={handleCheck(id)} />
        </div>

        <label>
          <input
            type="checkbox"
            className="hidden"
            checked={fav}
            onChange={handleFav(id)}
          />
          {isfav ? (
            <Icon
              icon="heroicons:star-20-solid"
              className="text-xl leading-none cursor-pointer text-[#FFCE30]"
            />
          ) : (
            <Icon
              icon="heroicons:star"
              className="text-xl leading-none cursor-pointer opacity-40 dark:text-white"
            />
          )}
        </label>

        <span
          className={` ${
            isDone ? "line-through dark:text-slate-300" : ""
          } flex-1 text-sm text-slate-600 dark:text-slate-300 truncate`}
        >
          {title}
        </span>

        <div className="flex">
          <span className="flex-none space-x-2 text-base text-secondary-500 flex rtl:space-x-reverse">
            <div className="flex justify-start -space-x-1.5 min-w-[60px] rtl:space-x-reverse">
              {image?.map((img, i) => (
                <div
                  key={i}
                  className={` ${
                    isDone ? " opacity-40" : " opacity-100"
                  } h-6 w-6 rounded-full bg-secondary-500`}
                >
                  <Tooltip placement="top" arrow content={img.label}>
                    <img
                      src={img.image}
                      alt={img.label}
                      className="w-full h-full rounded-full"
                    />
                  </Tooltip>
                </div>
              ))}
            </div>
            {category?.map((cta, ctaIndex) => (
              <div key={ctaIndex}>
                <span
                  className={` bg-opacity-20 capitalize font-normal text-xs leading-4 px-[10px] py-[2px] rounded-full inline-block
            
             ${cta.value === "team" ? "bg-danger-500/20 text-danger-500" : ""}
                  ${
                    cta.value === "low" ? "bg-success-500/20 text-success-500" : ""
                  }
                  ${
                    cta.value === "medium"
                      ? "bg-warning-500/20 text-warning-500"
                      : ""
                  }
                  ${
                    cta.value === "high"
                      ? "bg-primary-500/20 text-primary-500"
                      : ""
                  }
                  ${cta.value === "update" ? "bg-info-500/20 text-info-500" : ""}
            `}
                >
                  {cta.label}
                </span>
              </div>
            ))}

            <button
              type="button"
              className="text-slate-400"
              onClick={() => dispatch(editTodo(todo))}
            >
              <Icon icon="heroicons-outline:pencil-alt" />
            </button>
            <button
              type="button"
              onClick={() => dispatch(deleteTodo(id))}
              className="transition duration-150 hover:text-danger-500 text-slate-400"
            >
              <Icon icon="heroicons-outline:trash" />
            </button>
          </span>
        </div>
      </li>
    </>
  );
};

export default Tasks;
