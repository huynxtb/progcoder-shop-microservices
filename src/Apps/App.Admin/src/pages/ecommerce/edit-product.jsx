import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";
import Switch from "@/components/ui/Switch";
import Textarea from "@/components/ui/Textarea";
import Fileinput from "@/components/ui/Fileinput";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";

const EditProduct = () => {
  const [checked, setChecked] = useState(true);
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(true);
  const [checked4, setChecked4] = useState(true);
  const [checked5, setChecked5] = useState(true);
  const [checked6, setChecked6] = useState(true);
  const [checked7, setChecked7] = useState(true);
  const [checked8, setChecked8] = useState(true);
  const [checked9, setChecked9] = useState(true);

  const [selectedFile, setSelectedFile] = useState(null);

  const options = [
    {
      value: "option1",
      label: "Option 1",
    },
    {
      value: "option2",
      label: "Option 2",
    },
    {
      value: "option3",
      label: "Option 3",
    },
  ];

  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleChange2 = (e) => {
    setValue2(e.target.value);
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className=" grid grid-cols-12  gap-4  rounded-lg">
      <div className="col-span-12 md:col-span-7 lg:col-span-7 ">
        <Card title="Product Information" className="mb-4">
          <div className="space-y-4">
            <Textinput
              label="Product Name"
              id="h_Fullname"
              type="text"
              placeholder="Full name"
              horizontal
              classLabel="w-[150px]!"
            />

            <Select
              label="Category"
              options={options}
              onChange={handleChange}
              value={value}
              horizontal
              classLabel="w-[150px]!"
            />
            <Select
              label="Brand"
              options={options}
              onChange={handleChange2}
              value={value2}
              horizontal
              classLabel="w-[150px]!"
            />
            <Textinput
              label="Unit"
              id="unit"
              type="text"
              placeholder="Unit (e.g. KG, Pc etc)"
              horizontal
              classLabel="w-[150px]!"
            />
            <Textinput
              label="Weight (in kg)"
              id="weight"
              type="text"
              placeholder="0.00"
              horizontal
              classLabel="w-[150px]!"
            />
            <Textinput
              label="Minimum Purchase Qty"
              id="weight"
              type="text"
              placeholder="1"
              horizontal
              classLabel="w-[150px]!"
            />
            <Textinput
              label="Tags"
              id="weight"
              type="text"
              placeholder="Type & hit enter to add a tag"
              horizontal
              classLabel="w-[150px]!"
            />
            <Textinput
              label="Barcode"
              id="weight"
              type="text"
              placeholder="Code"
              horizontal
              classLabel="w-[150px]!"
            />
            <div className="flex space-x-10 rtl:space-x-reverse">
              <label className="flex-none w-[132px] ">Refundable</label>
              <div className="flex-1">
                <Switch
                  activeClass="bg-success-500"
                  value={checked}
                  onChange={() => setChecked(!checked)}
                />
              </div>
            </div>
          </div>
        </Card>
        <Card title="Product Images" className="mb-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              <label className="inline-flex text-sm font-normal ">
                Gallery Images (600 X 600)
              </label>
              <div className="flex-1">
                <Fileinput
                  label="Browse"
                  placeholder="Choose File"
                  name="pdf"
                  selectedFile={selectedFile}
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              <label className="inline-flex text-sm font-normal ">
                Thumb Images (600 X 600)
              </label>
              <div className="flex-1">
                <Fileinput
                  label="Browse"
                  placeholder="Choose File"
                  name="pdf"
                  selectedFile={selectedFile}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </Card>
        <Card title="Product Variation" className="mb-4">
          <div className="space-y-4">
            <Select
              label="Color"
              placeholder="2 items selected"
              options={options}
              onChange={handleChange2}
              value={value2}
              horizontal
              classLabel="w-[150px]!"
            />

            <Select
              label="Attributes"
              placeholder="1 item selected"
              options={options}
              onChange={handleChange}
              value={value}
              horizontal
              classLabel="w-[150px]!"
            />
            <Select
              placeholder="5 items selected"
              label="Size"
              options={options}
              onChange={handleChange2}
              value={value2}
              horizontal
              classLabel="w-[150px]!"
            />
          </div>
        </Card>
        <Card title="Product Description" className="mb-4">
          <div className="space-y-4">
            <Textarea
              label="Description"
              id="pn4"
              placeholder="Some product description..."
              horizontal
              classLabel="w-[150px]!"
            />
          </div>
        </Card>
        <Card title="PDF Specification" className="mb-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-10 rtl:space-x-reverse">
              <label className="inline-flex text-sm font-normal">
                Add PDF File
              </label>
              <div className="flex-1">
                <Fileinput
                  label="Browse"
                  placeholder="Choose File"
                  name="pdf"
                  selectedFile={selectedFile}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </Card>
        <Card title="SEO Meta Tags" className="mb-4">
          <div className="space-y-4">
            <Textinput
              label="Meta Title"
              id="meta_title"
              type="text"
              placeholder="Title"
              horizontal
              classLabel="w-[150px]!"
            />
            <Textarea
              label="Description"
              id="pn4"
              placeholder="Write something for your product seo"
              horizontal
              classLabel="w-[150px]!"
            />
            <div className="flex items-center space-x-11 rtl:space-x-reverse ">
              <label className="inline-flex text-sm font-normal w-[130px] ">
                Meta Image
              </label>
              <div className="flex-1">
                <Fileinput
                  label="Browse"
                  placeholder="Choose File"
                  name="pdf"
                  selectedFile={selectedFile}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="col-span-12 md:col-span-5 lg:col-span-5">
        <Card title="Shipping Configuration" className="mb-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label>Free Shipping</label>
              <div>
                <Switch
                  activeClass="bg-success-500"
                  value={checked1}
                  onChange={() => setChecked1(!checked1)}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <label>Flat Rate</label>
              <div>
                <Switch
                  activeClass="bg-success-500"
                  value={checked2}
                  onChange={() => setChecked2(!checked2)}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <label>Is Product Quantity Multiply</label>
              <div>
                <Switch
                  activeClass="bg-success-500"
                  value={checked3}
                  onChange={() => setChecked3(!checked3)}
                />
              </div>
            </div>
          </div>
        </Card>
        <Card title="Low Stock Quantity Warning" className="mb-4">
          <div className="space-y-4">
            <Textinput
              label="Quantity"
              id="qty_warning"
              type="text"
              placeholder="1"
              horizontal
              classLabel="w-[150px]!"
            />
          </div>
        </Card>
        <Card title="Stock Visibility State" className="mb-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-normal">Show Stock Quantity</label>
              <div>
                <Switch
                  activeClass="bg-success-500"
                  value={checked4}
                  onChange={() => setChecked4(!checked4)}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <label className="text-sm font-normal">
                Show Stock With Text Only
              </label>
              <div>
                <Switch
                  activeClass="bg-success-500"
                  value={checked5}
                  onChange={() => setChecked5(!checked5)}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <label className="text-sm font-normal">Hide Stock</label>
              <div>
                <Switch
                  activeClass="bg-success-500"
                  value={checked6}
                  onChange={() => setChecked6(!checked6)}
                />
              </div>
            </div>
          </div>
        </Card>
        <Card title="Cash On Delivery" className="mb-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-normal">Status</label>
              <div>
                <Switch
                  activeClass="bg-success-500"
                  value={checked7}
                  onChange={() => setChecked7(!checked7)}
                />
              </div>
            </div>
          </div>
        </Card>
        <Card title="Featured" className="mb-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-normal">Status</label>
              <div>
                <Switch
                  activeClass="bg-success-500"
                  value={checked8}
                  onChange={() => setChecked8(!checked8)}
                />
              </div>
            </div>
          </div>
        </Card>
        <Card title="Todays Deal" className="mb-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-normal">Status</label>
              <div>
                <Switch
                  activeClass="bg-success-500"
                  value={checked9}
                  onChange={() => setChecked9(!checked9)}
                />
              </div>
            </div>
          </div>
        </Card>
        <Card title="Flash Deal" className="mb-4">
          <div className="space-y-4">
            <Select
              label="Category"
              placeholder="Choose Flash Title"
              options={options}
              onChange={handleChange}
              value={value}
              horizontal
              classLabel="w-[150px]!"
            />
            <Textinput
              label="Discount"
              id="discount"
              type="text"
              placeholder="0"
              horizontal
              classLabel="w-[150px]!"
            />
            <Select
              label="Type"
              placeholder="Choose Discount Type"
              options={options}
              onChange={handleChange2}
              value={value2}
              horizontal
              classLabel="w-[150px]!"
            />
          </div>
        </Card>
        <Card title="Estimate Shipping Time" className="mb-4">
          <div className="space-y-4">
            <Textinput
              label="Shipping Days"
              id="shipping_days"
              type="text"
              placeholder="07"
              horizontal
            />
          </div>
        </Card>
        <Card title="Estimate Shipping Time" className="mb-4">
          <div className="space-y-4">
            <div className="flex space-x-4 rtl:space-x-reverse">
              <div className="flex-none">
                <Textinput
                  className="inline-flex"
                  label="VAT"
                  id="vat"
                  type="text"
                  placeholder="00"
                  horizontal
                />
              </div>
              <div className="flex-1">
                <Select
                  placeholder="Flat"
                  options={options}
                  onChange={handleChange2}
                  value={value2}
                />
              </div>
            </div>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <div className="flex-none">
                <Textinput
                  label="TAX"
                  id="tax"
                  type="text"
                  placeholder="00"
                  horizontal
                />
              </div>
              <div className="flex-1">
                <Select
                  placeholder="Percent"
                  options={options}
                  onChange={handleChange2}
                  value={value2}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="col-span-12 flex justify-end">
        <button
          type="button"
          className="btn btn-dark h-min w-max text-sm font-normal "
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
