import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Select from "@/components/ui/Select";
import Icon from "@/components/ui/Icon";

// Sample inventory data for demo
const sampleInventory = {
  1: {
    id: 1,
    productName: "iPhone 15 Pro Max",
    sku: "IPH-15-PM-256",
    quantity: 150,
    minQuantity: 20,
    warehouse: "hanoi",
    location: "A1-01",
    status: "in_stock",
    notes: "Bestselling item, keep high stock",
  },
  2: {
    id: 2,
    productName: "Samsung Galaxy S24 Ultra",
    sku: "SAM-S24-U-512",
    quantity: 85,
    minQuantity: 15,
    warehouse: "hcm",
    location: "B2-05",
    status: "in_stock",
    notes: "",
  },
  3: {
    id: 3,
    productName: "MacBook Pro 14 M3",
    sku: "MAC-PRO-14-M3",
    quantity: 12,
    minQuantity: 10,
    warehouse: "hanoi",
    location: "C3-02",
    status: "low_stock",
    notes: "Reorder soon",
  },
  4: {
    id: 4,
    productName: "iPad Air 5",
    sku: "IPAD-AIR-5-64",
    quantity: 0,
    minQuantity: 10,
    warehouse: "danang",
    location: "D1-03",
    status: "out_of_stock",
    notes: "Waiting for supplier shipment",
  },
  5: {
    id: 5,
    productName: "AirPods Pro 2",
    sku: "APP-2-USB-C",
    quantity: 200,
    minQuantity: 30,
    warehouse: "hcm",
    location: "A2-08",
    status: "in_stock",
    notes: "",
  },
  6: {
    id: 6,
    productName: "Sony WH-1000XM5",
    sku: "SONY-XM5-BLK",
    quantity: 45,
    minQuantity: 10,
    warehouse: "hanoi",
    location: "B1-04",
    status: "in_stock",
    notes: "",
  },
  7: {
    id: 7,
    productName: "Dell XPS 15",
    sku: "DELL-XPS-15-I7",
    quantity: 8,
    minQuantity: 5,
    warehouse: "hcm",
    location: "C2-01",
    status: "low_stock",
    notes: "Consider promotion to clear stock",
  },
  8: {
    id: 8,
    productName: "Logitech MX Master 3S",
    sku: "LOG-MX-3S",
    quantity: 0,
    minQuantity: 20,
    warehouse: "danang",
    location: "D2-06",
    status: "out_of_stock",
    notes: "",
  },
};

const EditInventory = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  const warehouseOptions = [
    { value: "hanoi", label: t("editInventory.warehouseHanoi") },
    { value: "hcm", label: t("editInventory.warehouseHCM") },
    { value: "danang", label: t("editInventory.warehouseDanang") },
  ];

  const statusOptions = [
    { value: "in_stock", label: t("inventory.inStock") },
    { value: "low_stock", label: t("inventory.lowStock") },
    { value: "out_of_stock", label: t("inventory.outOfStock") },
  ];

  // Load inventory data
  useEffect(() => {
    const inventoryData = sampleInventory[id];
    if (inventoryData) {
      setProductName(inventoryData.productName || "");
      setSku(inventoryData.sku || "");
      setQuantity(inventoryData.quantity?.toString() || "");
      setMinQuantity(inventoryData.minQuantity?.toString() || "");
      setWarehouse(inventoryData.warehouse || "");
      setLocation(inventoryData.location || "");
      setStatus(inventoryData.status || "");
      setNotes(inventoryData.notes || "");
    }
  }, [id]);

  const handleSave = () => {
    console.log("Saving inventory:", {
      id,
      productName,
      sku,
      quantity,
      minQuantity,
      warehouse,
      location,
      status,
      notes,
    });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center">
        <h4 className="text-xl font-medium text-slate-900 dark:text-white">
          {t("editInventory.title")} #{id}
        </h4>
        <Link to="/inventories" className="btn btn-outline-dark btn-sm inline-flex items-center">
          <Icon icon="heroicons:arrow-left" className="ltr:mr-2 rtl:ml-2" />
          {t("editInventory.back")}
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8">
          <Card title={t("editInventory.productInfo")} className="mb-5">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">{t("editInventory.productName")}</label>
                  <Textinput
                    id="productName"
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    disabled
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    {t("editInventory.productNameNote")}
                  </p>
                </div>
                <div>
                  <label className="form-label">{t("editInventory.sku")}</label>
                  <Textinput
                    id="sku"
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    disabled
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card title={t("editInventory.stockInfo")} className="mb-5">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">{t("editInventory.quantity")} *</label>
                  <Textinput
                    id="quantity"
                    type="number"
                    placeholder="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">{t("editInventory.minQuantity")}</label>
                  <Textinput
                    id="minQuantity"
                    type="number"
                    placeholder="10"
                    value={minQuantity}
                    onChange={(e) => setMinQuantity(e.target.value)}
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    {t("editInventory.minQuantityNote")}
                  </p>
                </div>
              </div>

              <Select
                label={t("editInventory.status")}
                options={statusOptions}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
          </Card>

          <Card title={t("editInventory.locationInfo")} className="mb-5">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label={t("editInventory.warehouse")}
                  options={warehouseOptions}
                  value={warehouse}
                  onChange={(e) => setWarehouse(e.target.value)}
                />
                <div>
                  <label className="form-label">{t("editInventory.location")}</label>
                  <Textinput
                    id="location"
                    type="text"
                    placeholder="A1-01"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    {t("editInventory.locationNote")}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <Card title={t("editInventory.notes")} className="mb-5">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                  {t("editInventory.notesLabel")}
                </label>
                <textarea
                  className="form-control"
                  rows={5}
                  placeholder={t("editInventory.notesPlaceholder")}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          </Card>

          <Card title={t("editInventory.summary")} className="mb-5">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">{t("editInventory.currentQuantity")}</span>
                <span className="font-medium">{quantity || "0"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t("editInventory.minQuantity")}</span>
                <span className="font-medium">{minQuantity || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t("editInventory.status")}</span>
                <span
                  className={`font-medium ${
                    status === "in_stock"
                      ? "text-success-500"
                      : status === "low_stock"
                      ? "text-warning-500"
                      : "text-danger-500"
                  }`}
                >
                  {status === "in_stock" && t("inventory.inStock")}
                  {status === "low_stock" && t("inventory.lowStock")}
                  {status === "out_of_stock" && t("inventory.outOfStock")}
                </span>
              </div>
            </div>
          </Card>

          <div className="flex flex-col space-y-3">
            <button
              type="button"
              className="btn btn-dark w-full inline-flex items-center justify-center"
              onClick={handleSave}
            >
              <Icon icon="heroicons:check" className="ltr:mr-2 rtl:ml-2" />
              {t("editInventory.save")}
            </button>
            <Link
              to="/inventories"
              className="btn btn-outline-dark w-full inline-flex items-center justify-center"
            >
              <Icon icon="heroicons:arrow-left" className="ltr:mr-2 rtl:ml-2" />
              {t("editInventory.back")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInventory;

