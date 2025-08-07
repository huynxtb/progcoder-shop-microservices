import { apiSlice } from "../apiSlice";

export const calendarApi = apiSlice.injectEndpoints({
  tagTypes: ["events"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/categories",
    }),
    getCalendarEvents: builder.query({
      query: () => "/calendarEvents",
      providesTags: ["events"],
    }),
    createCalendarEvent: builder.mutation({
      query: (event) => ({
        url: "/calendarEvents",
        method: "POST",
        body: event,
      }),
      invalidatesTags: ["events"],
    }),
    editCalendarEvent: builder.mutation({
      query: ({ id, event }) => ({
        url: `/calendarEvents/${id}`,
        method: "PUT",
        body: { id, ...event },
      }),
      invalidatesTags: ["events"],
    }),
    deleteCalendarEvent: builder.mutation({
      query: (id) => ({
        url: `/calendarEvents/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["events"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCalendarEventsQuery,
  useCreateCalendarEventMutation,
  useEditCalendarEventMutation,
  useDeleteCalendarEventMutation,
} = calendarApi;
