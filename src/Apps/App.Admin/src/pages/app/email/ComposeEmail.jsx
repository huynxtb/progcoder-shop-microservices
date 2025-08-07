import React from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleEmailModal, sendMail } from "./store";
import Textinput from "@/components/ui/Textinput";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

import avatar1 from "@/assets/images/avatar/av-1.svg";
import avatar2 from "@/assets/images/avatar/av-2.svg";
import avatar3 from "@/assets/images/avatar/av-3.svg";
import avatar4 from "@/assets/images/avatar/av-4.svg";
import Textarea from "@/components/ui/Textarea";

const FormValidationSchema = yup
  .object({
    title: yup.string().required("Title is required"),
    assign: yup.mixed().required("Assignee is required"),
  })
  .required();

const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, color: "#626262", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const assigneeOptions = [
  { value: "mahedi", label: "Mahedi Amin", image: avatar1 },
  { value: "sovo", label: "Sovo Haldar", image: avatar2 },
  { value: "rakibul", label: "Rakibul Islam", image: avatar3 },
  { value: "pritom", label: "Pritom Miha", image: avatar4 },
];

const OptionComponent = ({ data, ...props }) => {
  return (
    <components.Option {...props}>
      <span className="flex items-center space-x-4">
        <div className="flex-none">
          <div className="h-7 w-7 rounded-full">
            <img
              src={data.image}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
        </div>
        <span className="flex-1">{data.label}</span>
      </span>
    </components.Option>
  );
};

const ComposeEmail = () => {
  const { emailModal } = useSelector((state) => state.email);
  const dispatch = useDispatch();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const onSubmit = (data) => {
    dispatch(
      sendMail({
        id: uuidv4(),
        title: data.title,
        image: data.assign[0].image,
        desc: "Hello World!",
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
      })
    );

    reset(); // reset the form
    dispatch(toggleEmailModal(false)); // close modal
  };

  return (
    <div>
      <Modal
        title="Compose Email"
        activeModal={emailModal}
        onClose={() => dispatch(toggleEmailModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Assignee Select */}
          <div className={errors.assign ? "has-error" : ""}>
            <label className="form-label" htmlFor="icon_s">
              To
            </label>
            <Controller
              name="assign"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={assigneeOptions}
                  styles={styles}
                  isMulti
                  className="react-select"
                  classNamePrefix="select"
                  components={{ Option: OptionComponent }}
                  id="icon_s"
                />
              )}
            />
            {errors.assign && (
              <div className=" mt-2  text-danger-500 block text-sm">
                {errors.assign?.message || errors.assign?.label.message}
              </div>
            )}
          </div>

          {/* Subject */}
          <Textinput
            name="title"
            label="Subject"
            type="text"
            placeholder="Enter title"
            register={register}
            error={errors.title}
          />

          <Textarea
            name="desc"
            placeholder="Hello World!"
            register={register}
            error={errors.desc}
          />

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark text-center">Send</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ComposeEmail;
