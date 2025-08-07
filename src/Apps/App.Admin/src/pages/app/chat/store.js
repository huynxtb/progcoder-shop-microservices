import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import image1 from "@/assets/images/users/user-1.jpg";
import image2 from "@/assets/images/users/user-2.jpg";
import image3 from "@/assets/images/users/user-3.jpg";
import image4 from "@/assets/images/users/user-4.jpg";
import image5 from "@/assets/images/users/user-5.jpg";
import image6 from "@/assets/images/users/user-6.jpg";

export const appChatSlice = createSlice({
  name: "appchat",
  initialState: {
    openProfile: false,
    openinfo: true,
    activechat: false,
    searchContact: "",
    mobileChatSidebar: false,
    profileinfo: {},
    messFeed: [],
    user: {},
    contacts: [
      {
        id: 1,
        fullName: "Kathryn Murphy",
        role: "Frontend Developer",
        lastmessage: "Hey! there I'm available",
        lastmessageTime: "2:30 PM",
        unredmessage: Math.floor(Math.random() * 10),
        avatar: image2,
        status: "offline",
      },
      {
        id: 2,
        fullName: "Felecia Rower",
        role: " UI/UX Designer",
        lastmessage: "Hey! there I'm available",
        lastmessageTime: "2:30 PM",
        unredmessage: Math.floor(Math.random() * 10),
        avatar: image3,
        status: "active",
      },
      {
        id: 3,
        fullName: " Aileen Chavez",
        role: " Backend Developer",
        lastmessage: "Hey! there I'm available",
        lastmessageTime: "2:30 PM",
        unredmessage: Math.floor(Math.random() * 10),
        avatar: image4,
        status: "offline",
      },
      {
        id: 4,
        fullName: "Alec Thompson",
        role: " Full Stack Developer",
        lastmessage: "Hey! there I'm available",
        lastmessageTime: "2:30 PM",
        unredmessage: Math.floor(Math.random() * 10),
        avatar: image5,
        status: "active",
      },
      {
        id: 5,
        fullName: "Murphy Aileen",
        role: "Frontend Developer",
        lastmessage: "Hey! there I'm available",
        lastmessageTime: "2:30 PM",
        unredmessage: Math.floor(Math.random() * 10),
        avatar: image1,
        status: "offline",
      },
    ],
    chats: [
      {
        id: 1,
        userId: 1,
        messages: [
          {
            img: image2,
            content: "Hey! How are you?",
            time: "10:00",
            sender: "them",
          },
          {
            img: image2,
            content: "Good, I will book the meeting room for you.",
            time: "10:02",

            sender: "them",
          },
          {
            content: "Hi, I am good, what about you?",
            img: image1,
            time: "10:01",
            sender: "me",
          },

          {
            content: "Thanks, It will be great.",
            img: image1,
            time: "10:03",
            sender: "me",
          },
          {
            img: image2,
            content: "Hey! How are you?",
            time: "10:00",
            sender: "them",
          },
          {
            img: image2,
            content: "Good, I will book the meeting room for you.",
            time: "10:02",

            sender: "them",
          },
          {
            content: "Hi, I am good, what about you?",
            img: image1,
            time: "10:01",
            sender: "me",
          },

          {
            content: "Thanks, It will be great.",
            img: image1,
            time: "10:03",
            sender: "me",
          },
        ],
      },
      {
        id: 2,
        userId: 2,
        messages: [
          {
            img: image2,
            content: "Hey! How are you?",
            time: "10:00",
            sender: "them",
          },
          {
            img: image2,
            content: "Good, I will book the meeting room for you.",
            time: "10:02",

            sender: "them",
          },
        ],
      },
      {
        id: 3,
        userId: 3,
        messages: [
          {
            img: image2,
            content: "Hey! How are you?",
            time: "10:00",
            sender: "them",
          },
          {
            img: image2,
            content: "Good, I will book the meeting room for you.",
            time: "10:02",

            sender: "me",
          },
        ],
      },
      {
        id: 4,
        userId: 4,
        messages: [
          {
            img: image2,
            content: "Hey! How are you?",
            time: "10:00",
            sender: "me",
          },
          {
            img: image2,
            content: "Good, I will book the meeting room for you.",
            time: "10:02",

            sender: "them",
          },
        ],
      },
      {
        id: 5,
        userId: 5,
        messages: [
          {
            img: image2,
            content: "Hey! How are you?",
            time: "10:00",
            sender: "them",
          },
          {
            img: image2,
            content: "Good, I will book the meeting room for you.",
            time: "10:02",

            sender: "them",
          },
        ],
      },
    ],
  },
  reducers: {
    openChat: (state, action) => {
      state.activechat = action.payload.activechat;
      state.mobileChatSidebar = !state.mobileChatSidebar;
      state.user = action.payload.contact;
      state.chats.map((item) => {
        if (item.userId === action.payload.contact.id) {
          state.messFeed = item.messages;
        }
      });
    },
    // toggole mobile chat sidebar
    toggleMobileChatSidebar: (state, action) => {
      state.mobileChatSidebar = action.payload;
    },
    infoToggle: (state, action) => {
      state.openinfo = action.payload;
    },
    sendMessage: (state, action) => {
      state.messFeed.push(action.payload);
    },
    toggleProfile: (state, action) => {
      state.openProfile = action.payload;
    },
    setContactSearch: (state, action) => {
      state.searchContact = action.payload;
    },
    toggleActiveChat: (state, action) => {
      state.activechat = action.payload;
    },
  },
});

export const {
  openChat,
  toggleMobileChatSidebar,
  infoToggle,
  sendMessage,
  toggleProfile,
  setContactSearch,
  toggleActiveChat,
} = appChatSlice.actions;
export default appChatSlice.reducer;
