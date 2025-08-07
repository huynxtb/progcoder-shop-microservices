import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import avatar1 from "@/assets/images/avatar/av-1.svg";
import avatar2 from "@/assets/images/avatar/av-2.svg";
import avatar3 from "@/assets/images/avatar/av-3.svg";
import avatar4 from "@/assets/images/avatar/av-4.svg";
import { toast } from "react-toastify";

export const appTodoSlice = createSlice({
  name: "apptodo",
  initialState: {
    todos: [
      {
        id: uuidv4(),
        image: [
          {
            image: avatar1,
            label: "Mahedi Amin",
            value: "mahedi",
          },
          {
            image: avatar2,
            label: "Sovo Haldar",
            value: "sovo",
          },
          {
            image: avatar3,
            label: "Rakibul Islam",
            value: "rakibul",
          },
        ],
        title:
          "laboriosam mollitia et enim quasi adipisci quia provident illum",
        isDone: false,
        isfav: false,
        isTrash: false,
        category: [
          {
            value: "team",
            label: "team",
          },
        ],
      },
      {
        id: uuidv4(),
        image: [
          {
            image: avatar2,
            label: "Rakibul Islam",
            value: "rakibul",
          },
        ],
        title:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
        isDone: false,
        isfav: true,
        isTrash: false,
        category: [
          {
            value: "low",
            label: "low",
          },
        ],
      },
      {
        id: uuidv4(),
        image: [
          {
            image: avatar1,
            label: "Sovo Haldar",
            value: "sovo",
          },
          {
            image: avatar2,
            label: "Rakibul Islam",
            value: "rakibul",
          },
        ],
        title:
          "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
        isDone: true,
        isfav: true,
        isTrash: false,
        category: [
          {
            value: "medium",
            label: "medium",
          },
          {
            value: "low",
            label: "low",
          },
        ],
      },
      {
        id: uuidv4(),
        image: [
          {
            image: avatar3,
            label: "Mahedi Amin",
            value: "mahedi",
          },
          {
            image: avatar4,
            label: "Sovo Haldar",
            value: "sovo",
          },
          {
            image: avatar1,
            label: "Rakibul Islam",
            value: "rakibul",
          },
        ],
        title: "illo expedita consequatur quia in",
        isDone: false,
        isfav: false,
        isTrash: false,
        category: [
          {
            value: "high",
            label: "high",
          },
          {
            value: "low",
            label: "low",
          },
        ],
      },
      {
        id: uuidv4(),
        image: [
          {
            image: avatar4,
            label: "Rakibul Islam",
            value: "rakibul",
          },
        ],
        title: "illo expedita consequatur quia in",
        isDone: false,
        isfav: false,
        isTrash: false,
        category: [
          {
            value: "update",
            label: "update",
          },
        ],
      },
    ],
    filter: "all",
    addModal: false,
    editModal: false,
    todoSearch: "",
    isLoading: false,
    editItem: {},
    trashTodo: [],
    todoSearch: "",
    mobileTodoSidebar: false,
  },
  reducers: {
    // open add modal
    openAddModal: (state, action) => {
      state.addModal = action.payload;
    },

    addTodo: (state, action) => {
      state.todos.unshift(action.payload);
      toast.success("Add Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      // store it into trash todo
      state.trashTodo.unshift(action.payload);

      toast.warning("Delete Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    editTodo: (state, action) => {
      state.todos.findIndex((item) => {
        if (item.id === action.payload.id) {
          state.editItem = item;
          state.editModal = !state.editModal;
          // find index
          let index = state.todos.indexOf(item);
          state.todos.splice(index, 1, {
            // give a id into eidtModalId
            id: action.payload.id,
            title: action.payload.title,
            isDone: action.payload.isDone,
            isfav: action.payload.isfav,
            image: action.payload.image,
            category: action.payload.category,
          });
        }
      });
    },
    isCheck: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
      );
    },
    isFaveCheck: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload ? { ...todo, isfav: !todo.isfav } : todo
      );
    },
    // search todo
    setSearch: (state, action) => {
      state.todoSearch = action.payload;
    },
    // mobile todo sidebar
    toggleMobileTodoSidebar: (state, action) => {
      state.mobileTodoSidebar = action.payload;
    },
    closeEditModal: (state, action) => {
      state.editModal = action.payload;
    },
  },
});

export const {
  addTodo,
  setFilter,
  openAddModal,
  deleteTodo,
  editTodo,
  isCheck,
  isFaveCheck,
  setSearch,
  toggleMobileTodoSidebar,
  closeEditModal,
} = appTodoSlice.actions;
export default appTodoSlice.reducer;
