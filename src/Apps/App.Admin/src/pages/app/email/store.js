import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { toast } from "react-toastify";
import avatar1 from "@/assets/images/avatar/av-1.svg";
import avatar2 from "@/assets/images/avatar/av-2.svg";
import avatar3 from "@/assets/images/avatar/av-3.svg";
import avatar4 from "@/assets/images/avatar/av-4.svg";

export const appEmailSlice = createSlice({
  name: "appemail",
  initialState: {
    mobileEmailSidebar: false,
    search: "",
    filter: "all",
    emailModal: false,
    emails: [
      {
        id: uuidv4(),
        image: avatar1,
        title: "Pay bills & win up to 600$ Cashback! ",
        desc: " - Congratulations on your iRun Coach subscription. You made no space for excuses and you decided on a healthier and happier life...",
        isfav: false,
        sent: false,
        draft: true,
        spam: false,
        trash: false,
        personal: false,
        social: true,
        promotions: true,
        lastime: "12:20 pm",
        business: true,
        is_checked: false,
        isread: false,
        isspam: true,
        isdelate: false,
      },
      {
        id: uuidv4(),
        image: avatar2,
        title: "Pay bills & win up to 600$ Cashback! ",
        desc: " - Congratulations on your iRun Coach subscription. You made no space for excuses and you decided on a healthier and happier life...",
        isfav: true,
        sent: false,
        draft: false,
        spam: false,
        trash: false,
        personal: false,
        social: false,
        promotions: false,
        lastime: "12:20 pm",
        is_checked: false,
        business: false,
        isread: false,
        isspam: true,
        isdelate: false,
      },
      {
        id: uuidv4(),
        image: avatar3,
        title: "1-Pay bills & win up to 600$ Cashback! ",
        desc: " - Congratulations on your iRun Coach subscription. You made no space for excuses and you decided on a healthier and happier life...",
        isfav: true,
        sent: false,
        draft: true,
        spam: false,
        trash: false,
        personal: true,
        social: false,
        promotions: false,
        lastime: "12:20 pm",
        is_checked: false,
        business: false,
        isread: false,
        isspam: false,
        isdelate: false,
      },
      {
        id: uuidv4(),
        image: avatar4,
        title: "1-Pay bills & win up to 600$ Cashback! ",
        desc: " - Congratulations on your iRun Coach subscription. You made no space for excuses and you decided on a healthier and happier life...",
        isfav: true,
        sent: true,
        draft: false,
        spam: false,
        trash: false,
        personal: true,
        social: false,
        promotions: false,
        lastime: "12:20 pm",
        is_checked: false,
        business: false,
        isread: false,
        isspam: false,
        isdelate: false,
      },
    ],
    singleEmail: {},
    singleModal: false,
  },
  reducers: {
    toggleMobileEmailSidebar: (state, action) => {
      state.mobileEmailSidebar = action.payload;
    },
    toggleEmailModal: (state, action) => {
      state.emailModal = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCheck: (state, action) => {
      const emailIndex = state.emails.findIndex(
        (email) => email.id === action.payload && email
      );
      state.emails[emailIndex].is_checked =
        !state.emails[emailIndex].is_checked;
    },
    setAllCheck: (state, action) => {
      const allCompleted = state.emails.every((email) => email.is_checked);
      state.emails = state.emails.map((email) => ({
        ...email,
        is_checked: !allCompleted,
      }));
    },
    setFaveCheck: (state, action) => {
      const favIndex = state.emails.findIndex(
        (email) => email.id === action.payload && email
      );
      state.emails[favIndex].isfav = !state.emails[favIndex].isfav;
    },
    deleteEmail: (state, action) => {
      state.emails = state.emails.filter(
        (email) => email.id !== action.payload
      );

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
    toggleSingleModal: (state, action) => {
      state.singleModal = !state.singleModal;
      state.singleEmail = action.payload;
    },
    // toggleReadMail
    toggleReadMail: (state, action) => {
      const readIndex = state.emails.findIndex(
        (email) => email.id === action.payload && email
      );
      state.emails[readIndex].isread = !state.emails[readIndex].isread;
    },
    sendMail: (state, action) => {
      state.emails.unshift(action.payload);
      toast.success("Send Successfully", {
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
  },
});

export const {
  toggleMobileEmailSidebar,
  toggleEmailModal,
  setFilter,
  setSearch,
  setCheck,
  setFaveCheck,
  setAllCheck,
  deleteEmail,
  toggleSingleModal,
  toggleReadMail,
  sendMail,
} = appEmailSlice.actions;
export default appEmailSlice.reducer;
