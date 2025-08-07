import React from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const FormValidationSchema = yup
  .object({
    password: yup.string().required("Password is Required"),
    email: yup.string().email("Invalid email").required("Email is Required"),
    username: yup.string().required("Username is Required"),
    confirmpassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")]),
  })
  .required();

const MultiValidation = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:grid-cols-2 grid gap-5 grid-cols-1 "
      >
        <Textinput
          name="email"
          label="email"
          type="email"
          register={register}
          error={errors.email}
        />
        <Textinput
          name="password"
          label="password"
          type="password"
          register={register}
          error={errors.password}
        />
        <Textinput
          name="username"
          label="username"
          type="text"
          register={register}
          error={errors.username}
        />
        <Textinput
          name="confirmpassword"
          label="confirmpassword"
          type="password"
          register={register}
          error={errors.confirmpassword}
        />

        <div className="lg:col-span-2 col-span-1">
          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MultiValidation;
