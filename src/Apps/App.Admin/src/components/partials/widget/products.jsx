import React from "react";
import products1 from "@/assets/images/all-img/p-1.png";
import products2 from "@/assets/images/all-img/p-2.png";
import products3 from "@/assets/images/all-img/p-3.png";
import products4 from "@/assets/images/all-img/p-4.png";
import products5 from "@/assets/images/all-img/p-5.png";
import products6 from "@/assets/images/all-img/p-6.png";
const products = [
  {
    img: products1,
    price: "$150.00",
    title: "Car engine oil",
  },
  {
    img: products2,
    price: "$150.00",
    title: "Car engine oil",
  },
  {
    img: products3,
    price: "$150.00",
    title: "Car engine oil",
  },
  {
    img: products4,
    price: "$150.00",
    title: "Car engine oil",
  },
  {
    img: products5,
    price: "$150.00",
    title: "Car engine oil",
  },
  {
    img: products6,
    price: "$150.00",
    title: "Car engine oil",
  },
];
const Products = () => {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
      {products.map((item, i) => (
        <div
          key={i}
          className="bg-slate-50 dark:bg-slate-900 p-4 rounded-sm text-center"
        >
          <div className="h-12 w-12 rounded-full mb-4 mx-auto">
            <img src={item.img} alt="" className="w-full h-full rounded-full" />
          </div>
          <span className="text-slate-500 dark:text-slate-300 text-sm mb-1 block font-normal">
            {item.price}
          </span>
          <span className="text-slate-600 dark:text-slate-300 text-sm mb-4 block">
            {item.title}
          </span>
          <a
            href="#"
            className="btn btn-secondary dark:bg-slate-800 dark:hover:bg-slate-600 block w-full text-center btn-sm"
          >
            View More
          </a>
        </div>
      ))}
    </div>
  );
};

export default Products;
