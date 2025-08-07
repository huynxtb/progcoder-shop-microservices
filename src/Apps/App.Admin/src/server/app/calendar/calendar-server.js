const calendarServerConfig = (server) => {
  server.get("/categories", () => {
    return [
      {
        label: "Business",
        value: "business",
        activeClass: "ring-primary-500 bg-primary-500",
        className: " group-hover:border-blue-500",
      },
      {
        label: "Personal",
        value: "personal",

        activeClass: "ring-success-500 bg-success-500",
        className: " group-hover:border-green-500",
      },
      {
        label: "Holiday",
        value: "holiday",
        activeClass: "ring-danger-500 bg-danger-500",
        className: " group-hover:border-red-500",
      },
      {
        label: "Family",
        value: "family",
        activeClass: "ring-info-500 bg-info-500",
        className: " group-hover:border-cyan-500",
      },
      {
        label: "Meeting",
        value: "meeting",
        activeClass: "ring-warning-500 bg-warning-500",
        className: " group-hover:border-yellow-500",
      },
      {
        label: "Etc",
        value: "etc",
        activeClass: "ring-info-500 bg-info-500",
        className: " group-hover:border-cyan-500",
      },
    ];
  });

  server.get("/calendarEvents", (schema) => {
    let calendarEvents = schema.calendarEvents.all();
    return calendarEvents;
  });

  server.post("/calendarEvents", (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    return schema.calendarEvents.create(attrs);
  });
  server.put("/calendarEvents/:id", (schema, request) => {
    const id = request.params.id;
    const attrs = JSON.parse(request.requestBody);
    const calendarEvent = schema.calendarEvents.find(id);
    return calendarEvent.update(attrs);
  });
  server.delete("/calendarEvents/:id", (schema, request) => {
    let id = request.params.id;

    return schema.calendarEvents.find(id).destroy();
  });
};

export default calendarServerConfig;
