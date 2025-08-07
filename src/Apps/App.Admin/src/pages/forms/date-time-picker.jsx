import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Flatpickr from "react-flatpickr";

const FlatpickerPage = () => {
  const [picker, setPicker] = useState(new Date());
  const [picker2, setPicker2] = useState(new Date());
  const [picker3, setPicker3] = useState(new Date());
  const [picker4, setPicker4] = useState(new Date());
  const [basic, setBasic] = useState(new Date());
  return (
    <div>
      <Card title="Date & Time Picker">
        <div className="grid xl:grid-cols-2  grid-cols-1 gap-5">
          <div>
            <label htmlFor="default-picker" className=" form-label">
              Default Functionality
            </label>

            <Flatpickr
              className="form-control py-2"
              value={picker}
              onChange={(date) => setPicker(date)}
              id="default-picker"
            />
          </div>
          <div>
            <label className="form-label" htmlFor="date-time-picker">
              Date & Time
            </label>
            <Flatpickr
              value={picker2}
              data-enable-time
              id="date-time-picker"
              className="form-control py-2"
              onChange={(date) => setPicker2(date)}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="range-picker">
              Range
            </label>
            <Flatpickr
              value={picker3}
              id="range-picker"
              className="form-control py-2"
              onChange={(date) => setPicker3(date)}
              options={{
                mode: "range",
                defaultDate: ["2020-02-01", "2020-02-15"],
              }}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="disabled-picker">
              Disabled Range
            </label>
            <Flatpickr
              value={picker4}
              id="disabled-picker"
              className="form-control py-2"
              onChange={(date) => setPicker4(date)}
              options={{
                dateFormat: "Y-m-d",
                disable: [
                  {
                    from: new Date(),
                    // eslint-disable-next-line no-mixed-operators
                    to: new Date(new Date().getTime() + 120 * 60 * 60 * 1000),
                  },
                ],
              }}
            />
          </div>
          <div>
            <label className="form-label" id="timepicker">
              Basic 24hrs
            </label>
            <Flatpickr
              className="form-control py-2"
              value={basic}
              id="timepicker"
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                time_24hr: true,
              }}
              onChange={(date) => setBasic(date)}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="multi-dates-picker">
              Multiple Dates
            </label>
            <Flatpickr
              value={picker}
              id="multi-dates-picker"
              className="form-control py-2"
              options={{ mode: "multiple" }}
              onChange={(date) => setPicker(date)}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="hf-picker">
              Human Friendly
            </label>
            <Flatpickr
              value={picker}
              id="hf-picker"
              className="form-control py-2"
              onChange={(date) => setPicker(date)}
              options={{
                altInput: true,
                altFormat: "F j, Y",
                dateFormat: "Y-m-d",
              }}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="inline-picker">
              Inline
            </label>
            <Flatpickr
              className="form-control py-2"
              value={picker}
              options={{ inline: true }}
              onChange={(date) => setPicker(date)}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FlatpickerPage;
