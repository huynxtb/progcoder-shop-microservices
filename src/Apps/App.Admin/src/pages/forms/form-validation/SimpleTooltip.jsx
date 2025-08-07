import React from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const FormValadtionSchema = yup
  .object({
    password: yup.string().required("Password is Required"),
    email: yup.string().email("Invalid email").required("Email is Required"),
  })
  .required();

const SimpleTooltip = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValadtionSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <Textinput
          name="email"
          label="email"
          type="email"
          register={register}
          error={errors.email}
          msgTooltip
        />
        <Textinput
          name="password"
          label="password"
          type="password"
          register={register}
          error={errors.password}
          msgTooltip
        />

        <div className="ltr:text-right rtl:text-left">
          <button className="btn btn-dark  text-center">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SimpleTooltip;
