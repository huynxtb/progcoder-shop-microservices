import { createServer, Model, Factory, hasMany, belongsTo } from "miragejs";

import authServerConfig from "./auth-server";
import ShopServerConfig from "./shop-server";
import { products } from "@/constant/data";
import { faker } from "@faker-js/faker";
import { calendarEvents } from "./app/data";
import calendarServerConfig from "./app/calendar/calendar-server";
const previousDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
const dayBeforePreviousDay = new Date(
  new Date().getTime() - 24 * 60 * 60 * 1000 * 2
);

createServer({
  models: {
    user: Model,
    product: Model,
    calendarEvent: Model,
  },
  factories: {},

  seeds(server) {
    server.create("user", {
      email: "dashcode@gmail.com",
      password: "dashcode",
    });
    products.forEach((product, i) => {
      server.create("product", {
        id: i + 1,
        img: product.img,
        category: product.category,
        name: product.name,
        subtitle: product.subtitle,
        desc: product.desc,
        rating: product.rating,
        price: product.price,
        oldPrice: product.oldPrice,
        percent: product.percent,
        brand: product.brand,
      });
    });
    calendarEvents.forEach((element) => {
      server.create("calendarEvent", {
        id: faker.string.uuid(),
        title: element.title,
        start: element.start,
        end: element.end,
        allDay: element.allDay,
        //className: "warning",
        extendedProps: {
          calendar: element.extendedProps.calendar,
        },
      });
    });
  },
  routes() {
    //this.namespace = "api";

    authServerConfig(this);
    ShopServerConfig(this);
    calendarServerConfig(this);
    this.timing = 500;
    //this.passthrough();
  },
});
