import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import {
  useGetCategoriesQuery,
  useGetCalendarEventsQuery,
  useCreateCalendarEventMutation,
  useEditCalendarEventMutation,
  useDeleteCalendarEventMutation,
} from "@/store/api/app/calendarSlice";
import ExternalDraggingevent from "./dragging-events";
import EventModal from "./EventModal";
import LoaderCircle from "@/components/Loader-circle";

const CalendarPage = () => {
  const calendarComponentRef = useRef(null);
  const { data: getCategories } = useGetCategoriesQuery();
  const {
    data: getCalendarEvents,
    isLoading,
    isError,
    error,
  } = useGetCalendarEventsQuery();
  const [createCalendarEvent] = useCreateCalendarEventMutation();
  const [editCalendarEvent] = useEditCalendarEventMutation();
  const [deleteCalendarEvent] = useDeleteCalendarEventMutation();
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const [events] = useState([
    { title: "New Event Planning", id: "1", tag: "business" },
    { title: "Meeting", id: "2", tag: "meeting" },
    { title: "Generating Reports", id: "3", tag: "holiday" },
    { title: "Create New theme", id: "4", tag: "etc" },
  ]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setCalendarEvents(getCalendarEvents?.calendarEvents);
    setCategories(getCategories);
    setSelectedCategories(getCategories?.map((c) => c.value));
  }, [getCalendarEvents, getCategories]);
  useEffect(() => {
    const draggableEl = document.getElementById("external-events");

    const initDraggable = () => {
      if (draggableEl) {
        new Draggable(draggableEl, {
          itemSelector: ".fc-event",
          eventData: function (eventEl) {
            let title = eventEl.getAttribute("title");
            let id = eventEl.getAttribute("data");
            let event = events.find((e) => e.id === id);
            let tag = event ? event.tag : "";
            return {
              title: title,
              id: id,
              extendedProps: {
                calendar: tag,
              },
            };
          },
        });
      }
    };

    if (!isLoading) {
      initDraggable();
    }

    return () => {
      draggableEl?.removeEventListener("mousedown", initDraggable);
    };
  }, [isLoading]);

  const handleDateClick = (arg) => {
    setEditEvent(null);
    setShowModal(true);
    setSelectedEvent(arg);
  };
  // event click
  const handleEventClick = (arg) => {
    setShowModal(true);
    setEditEvent(arg);
  };
  // handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditEvent(null);
    setSelectedEvent(null);
  };

  // add event
  const handleAddEvent = (newEvent) => {
    createCalendarEvent(newEvent);
  };

  // edit event
  const handleEditEvent = (updatedEvent) => {
    editCalendarEvent({
      id: editEvent.event.id,
      event: updatedEvent,
    });
  };
  const handleCategorySelection = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleClassName = (arg) => {
    if (arg.event.extendedProps.calendar === "holiday") {
      return "danger";
    } else if (arg.event.extendedProps.calendar === "business") {
      return "primary";
    } else if (arg.event.extendedProps.calendar === "personal") {
      return "success";
    } else if (arg.event.extendedProps.calendar === "family") {
      return "info";
    } else if (arg.event.extendedProps.calendar === "etc") {
      return "info";
    } else if (arg.event.extendedProps.calendar === "meeting") {
      return "warning";
    }
  };

  //filter events
  const filteredEvents = calendarEvents?.filter((event) =>
    selectedCategories.includes(event.extendedProps.calendar)
  );

  if (isLoading) {
    return <LoaderCircle />;
  }
  if (isError) {
    return <div>Error... {error.message}</div>;
  }
  return (
    <div className="dashcode-calender">
      <div className="grid grid-cols-12 gap-4">
        <Card className="lg:col-span-3 col-span-12">
          <Button
            icon="heroicons-outline:plus"
            text=" Add Event"
            className="btn-dark w-full block   "
            onClick={() => {
              setShowModal(!showModal);
            }}
          />

          <div id="external-events" className=" space-y-1.5 mt-6 ">
            <p className=" text-sm pb-2">
              Drag and drop your event or click in the calendar
            </p>
            {events.map((event) => (
              <ExternalDraggingevent key={event.id} event={event} />
            ))}
          </div>

          <div className="block py-4 text-slate-800 dark:text-slate-400 font-semibold text-xs uppercase mt-4">
            FILTER
          </div>
          <ul className=" space-y-2 ">
            <li>
              <Checkbox
                label="All"
                activeClass="ring-primary-500 bg-primary-500"
                value={selectedCategories?.length === categories?.length}
                onChange={() => {
                  if (selectedCategories?.length === categories?.length) {
                    setSelectedCategories([]);
                  } else {
                    setSelectedCategories(categories.map((c) => c.value));
                  }
                }}
              />
            </li>
            {categories?.map((category) => (
              <li key={category.value}>
                <Checkbox
                  activeClass={category.activeClass}
                  label={category.label}
                  value={selectedCategories.includes(category.value)}
                  onChange={() => handleCategorySelection(category.value)}
                />
              </li>
            ))}
          </ul>
        </Card>
        <Card className="lg:col-span-9 col-span-12">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            ref={calendarComponentRef}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            events={filteredEvents}
            editable={true}
            rerenderDelay={10}
            eventDurationEditable={false}
            selectable={true}
            selectMirror={true}
            droppable={true}
            dayMaxEvents={2}
            weekends={true}
            eventClassNames={handleClassName}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            initialView="dayGridMonth"
          />
        </Card>
      </div>
      <EventModal
        showModal={showModal}
        onClose={handleCloseModal}
        categories={categories}
        onAdd={handleAddEvent}
        selectedEvent={selectedEvent}
        event={editEvent}
        onEdit={handleEditEvent}
        onDelete={deleteCalendarEvent}
      />
    </div>
  );
};

export default CalendarPage;
