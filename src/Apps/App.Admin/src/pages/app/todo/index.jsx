import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

import Button from "@/components/ui/Button";
import SimpleBar from "simplebar-react";
import { useSelector, useDispatch } from "react-redux";
import {
  openAddModal,
  setFilter,
  setSearch,
  toggleMobileTodoSidebar,
} from "./store";
import Todos from "./Todos";
import AddTodo from "./AddTodo";
import { ToastContainer } from "react-toastify";
import EditTodoModal from "./EditTodo";
import Topfilter from "./Topfilter";
import BottomFilter from "./BottomFilter";
import ListLoading from "@/components/skeleton/ListLoading";
import Badge from "@/components/ui/Badge";
import TodoHeader from "./TodoHeader";
import useWidth from "@/hooks/useWidth";

const topfilterList = [
  {
    value: "all",
    name: "My Task",
    icon: "uil:image-v",
  },
  {
    value: "fav",
    name: "Starred",
    icon: "heroicons:star",
  },
  {
    value: "done",
    name: "Completed",
    icon: "heroicons:document-check",
  },
  {
    value: "trash",
    name: "Trash",
    icon: "heroicons:trash",
  },
];

const bottomfilterList = [
  {
    name: "Team",
    value: "team",
  },
  {
    name: "low",
    value: "low",
  },
  {
    name: "medium",
    value: "medium",
  },
  {
    name: "high",
    value: "high",
  },
  {
    name: "update",
    value: "update",
  },
];

const TodoPage = () => {
  const { todos, editModal, filter, todoSearch, mobileTodoSidebar } =
    useSelector((state) => state.todo);
  const { width, breakpoints } = useWidth();
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

  const filteredTodos = todos
    // search filteredTodos
    .filter((todo) => {
      // filter based on searchTerm
      if (todoSearch) {
        return todo.title.toLowerCase().includes(todoSearch.toLowerCase());
      }
      return true;
    })
    .filter((todo) => {
      if (filter === "all") {
        return todo;
      } else if (filter === "fav") {
        return todo.isfav;
      } else if (filter === "done") {
        return todo.isDone;
      } else if (filter === "team") {
        return todo.category.some((cat) => cat.value === "team");
      } else if (filter === "low") {
        return todo.category.some((cat) => cat.value === "low");
      } else if (filter === "medium") {
        return todo.category.some((cat) => cat.value === "medium");
      } else if (filter === "high") {
        return todo.category.some((cat) => cat.value === "high");
      } else if (filter === "update") {
        return todo.category.some((cat) => cat.value === "update");
      }
    });

  // search filteredTodos

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);

    if (width < breakpoints.lg && mobileTodoSidebar) {
      dispatch(toggleMobileTodoSidebar(false));
    }
  }, [filter]);

  const handleFilter = (filter) => {
    dispatch(setFilter(filter));
  };

  return (
    <>
      <ToastContainer />

      <div className="flex md:space-x-5 app_height overflow-hidden relative rtl:space-x-reverse">
        <div
          className={`transition-all duration-150 flex-none min-w-[260px] 
        ${
          width < breakpoints.lg
            ? "absolute h-full top-0 md:w-[260px] w-[200px] z-999"
            : "flex-none min-w-[260px]"
        }
        ${
          width < breakpoints.lg && mobileTodoSidebar
            ? "left-0 "
            : "-left-full "
        }
        `}
        >
          <Card bodyClass=" py-6 h-full flex flex-col" className="h-full">
            <div className="flex-1 h-full px-6">
              <Button
                icon="heroicons-outline:plus"
                text="Add Task"
                className="btn-dark w-full block  "
                onClick={() => dispatch(openAddModal(true))}
              />
            </div>

            <SimpleBar className="h-full px-6 ">
              <ul className="list mt-6">
                {topfilterList.map((item, i) => (
                  <Topfilter
                    filter={filter}
                    item={item}
                    key={i}
                    onClick={() => handleFilter(item.value)}
                  />
                ))}
              </ul>
              <div className="block py-4 text-slate-800 dark:text-slate-400 font-semibold text-xs uppercase">
                Tags
              </div>
              <ul>
                {bottomfilterList.map((item, i) => (
                  <BottomFilter
                    filter={filter}
                    item={item}
                    key={i}
                    onClick={() => handleFilter(item.value)}
                  />
                ))}
              </ul>
            </SimpleBar>
          </Card>
        </div>
        {/* overlay */}
        {width < breakpoints.lg && mobileTodoSidebar && (
          <div
            className="overlay bg-slate-900 dark:bg-slate-900 dark:bg-opacity-60 bg-opacity-60 backdrop-filter
         backdrop-blur-xs absolute w-full flex-1 inset-0 z-99 rounded-md"
            onClick={() =>
              dispatch(toggleMobileTodoSidebar(!mobileTodoSidebar))
            }
          ></div>
        )}
        <div className="flex-1 md:w-[calc(100%-320px)]">
          <Card bodyClass="p-0  h-full" className="h-full">
            <SimpleBar className="h-full all-todos overflow-x-hidden">
              <TodoHeader
                onChange={(e) => dispatch(setSearch(e.target.value))}
              />

              {isLoading && <ListLoading count={filteredTodos.length} />}
              {!isLoading && (
                <ul className="divide-y divide-slate-100 dark:divide-slate-700! -mb-6 h-full">
                  {filteredTodos.map((todo, i) => (
                    <Todos key={i} todo={todo} />
                  ))}
                  {filteredTodos.length === 0 && (
                    <li className="mx-6 mt-6">
                      <Badge
                        label="No Result Found"
                        className="bg-danger-500 text-white w-full block text-start"
                      />
                    </li>
                  )}
                </ul>
              )}
            </SimpleBar>
          </Card>
        </div>
      </div>
      <AddTodo />
      <EditTodoModal />
    </>
  );
};

export default TodoPage;
