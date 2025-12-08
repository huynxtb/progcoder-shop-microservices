import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import Textinput from "@/components/ui/Textinput";
import Modal from "@/components/ui/Modal";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

// Sample category data
const categoryData = [
  {
    id: 1,
    name: "Điện thoại",
    slug: "dien-thoai",
    description: "Điện thoại thông minh các loại",
    productCount: 156,
    status: "active",
  },
  {
    id: 2,
    name: "Laptop",
    slug: "laptop",
    description: "Máy tính xách tay",
    productCount: 89,
    status: "active",
  },
  {
    id: 3,
    name: "Tablet",
    slug: "tablet",
    description: "Máy tính bảng",
    productCount: 45,
    status: "active",
  },
  {
    id: 4,
    name: "Phụ kiện",
    slug: "phu-kien",
    description: "Phụ kiện điện tử",
    productCount: 320,
    status: "active",
  },
  {
    id: 5,
    name: "Đồng hồ thông minh",
    slug: "dong-ho-thong-minh",
    description: "Smartwatch các loại",
    productCount: 67,
    status: "active",
  },
  {
    id: 6,
    name: "Tai nghe",
    slug: "tai-nghe",
    description: "Tai nghe không dây và có dây",
    productCount: 112,
    status: "active",
  },
  {
    id: 7,
    name: "Màn hình",
    slug: "man-hinh",
    description: "Màn hình máy tính",
    productCount: 34,
    status: "inactive",
  },
  {
    id: 8,
    name: "Bàn phím & Chuột",
    slug: "ban-phim-chuot",
    description: "Thiết bị ngoại vi",
    productCount: 78,
    status: "active",
  },
];

const GlobalFilter = ({ filter, setFilter, t }) => {
  const [value, setValue] = useState(filter);
  const onChange = (e) => {
    setValue(e.target.value);
    setFilter(e.target.value || undefined);
  };
  return (
    <Textinput
      value={value || ""}
      onChange={onChange}
      placeholder={t("category.search")}
    />
  );
};

const CategoryPage = () => {
  const { t } = useTranslation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });
  const [addFormData, setAddFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setEditFormData({
      name: category.name || "",
      slug: category.slug || "",
      description: category.description || "",
    });
    setShowEditModal(true);
  };

  const handleEditFormChange = (field, value) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddFormChange = (field, value) => {
    setAddFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = () => {
    // Here you would save the edited category
    console.log("Saving edited category:", editingCategory?.id, editFormData);
    setShowEditModal(false);
    setEditingCategory(null);
  };

  const handleSaveAdd = () => {
    // Here you would save the new category
    console.log("Saving new category:", addFormData);
    setShowAddModal(false);
    setAddFormData({ name: "", slug: "", description: "" });
  };

  const handleDeleteClick = (category) => {
    setItemToDelete(category);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleting category:", itemToDelete?.id);
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const COLUMNS = useMemo(() => [
    {
      Header: t("category.id"),
      accessor: "id",
      Cell: (row) => <span className="font-medium">#{row?.cell?.value}</span>,
    },
    {
      Header: t("category.name"),
      accessor: "name",
      Cell: (row) => (
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          {row?.cell?.value}
        </span>
      ),
    },
    {
      Header: t("category.slug"),
      accessor: "slug",
      Cell: (row) => (
        <span className="font-mono text-sm text-slate-500 dark:text-slate-400">
          {row?.cell?.value}
        </span>
      ),
    },
    {
      Header: t("category.description"),
      accessor: "description",
      Cell: (row) => (
        <span className="text-slate-600 dark:text-slate-300 truncate max-w-[200px] block">
          {row?.cell?.value}
        </span>
      ),
    },
    {
      Header: t("category.productCount"),
      accessor: "productCount",
      Cell: (row) => (
        <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded font-medium">
          {row?.cell?.value}
        </span>
      ),
    },
    {
      Header: t("category.status"),
      accessor: "status",
      Cell: (row) => {
        const status = row?.cell?.value;
        return (
          <span className="block w-full">
            <span
              className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] ${
                status === "active"
                  ? "text-success-500 bg-success-500/30"
                  : "text-danger-500 bg-danger-500/30"
              }`}
            >
              {status === "active" ? t("category.active") : t("category.inactive")}
            </span>
          </span>
        );
      },
    },
    {
      Header: t("category.actions"),
      accessor: "action",
      Cell: (row) => {
        const category = row?.row?.original;
        return (
          <div className="flex space-x-3 rtl:space-x-reverse">
            <Tooltip content={t("common.view")} placement="top" arrow animation="shift-away">
              <button className="action-btn" type="button">
                <Icon icon="heroicons:eye" />
              </button>
            </Tooltip>
            <Tooltip content={t("common.edit")} placement="top" arrow animation="shift-away">
              <button
                className="action-btn"
                type="button"
                onClick={() => handleEditClick(category)}
              >
                <Icon icon="heroicons:pencil-square" />
              </button>
            </Tooltip>
            <Tooltip
              content={t("common.delete")}
              placement="top"
              arrow
              animation="shift-away"
              theme="danger"
            >
              <button
                className="action-btn"
                type="button"
                onClick={() => handleDeleteClick(category)}
              >
                <Icon icon="heroicons:trash" />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ], [t]);

  const data = useMemo(() => categoryData, []);

  const tableInstance = useTable(
    {
      columns: COLUMNS,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <Card>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">{t("category.title")}</h4>
          <div className="md:flex md:space-x-4 md:space-y-0 space-y-2">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} t={t} />
            <button
              className="btn btn-dark btn-sm inline-flex items-center"
              onClick={() => setShowAddModal(true)}
            >
              <Icon icon="heroicons:plus" className="ltr:mr-2 rtl:ml-2" />
              {t("category.addCategory")}
            </button>
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700!"
                {...getTableProps()}
              >
                <thead className="bg-slate-200 dark:bg-slate-700">
                  {headerGroups.map((headerGroup) => {
                    const { key: headerKey, ...restHeaderProps } =
                      headerGroup.getHeaderGroupProps();
                    return (
                      <tr key={headerKey} {...restHeaderProps}>
                        {headerGroup.headers.map((column) => {
                          const { key: columnKey, ...restColumnProps } =
                            column.getHeaderProps(column.getSortByToggleProps());
                          return (
                            <th
                              key={columnKey}
                              {...restColumnProps}
                              scope="col"
                              className="table-th"
                            >
                              {column.render("Header")}
                              <span>
                                {column.isSorted
                                  ? column.isSortedDesc
                                    ? " 🔽"
                                    : " 🔼"
                                  : ""}
                              </span>
                            </th>
                          );
                        })}
                      </tr>
                    );
                  })}
                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700!"
                  {...getTableBodyProps()}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    const { key: rowKey, ...restRowProps } = row.getRowProps();
                    return (
                      <tr key={rowKey} {...restRowProps}>
                        {row.cells.map((cell) => {
                          const { key: cellKey, ...restCellProps } =
                            cell.getCellProps();
                          return (
                            <td
                              key={cellKey}
                              {...restCellProps}
                              className="table-td"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <select
              className="form-control py-2 w-max"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50].map((size) => (
                <option key={size} value={size}>
                  {t("common.show")} {size}
                </option>
              ))}
            </select>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {t("common.page")}{" "}
              <span>
                {pageIndex + 1} {t("common.of")} {pageOptions.length}
              </span>
            </span>
          </div>
          <ul className="flex items-center space-x-3 rtl:space-x-reverse">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={`${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons:chevron-double-left-solid" />
              </button>
            </li>
            <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={`${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {t("common.previous")}
              </button>
            </li>
            {pageOptions.map((pageNum, pageIdx) => (
              <li key={pageIdx}>
                <button
                  aria-current="page"
                  className={`${
                    pageIdx === pageIndex
                      ? "bg-slate-900 dark:bg-slate-600 dark:text-slate-200 text-white font-medium"
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900 font-normal"
                  } text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {pageNum + 1}
                </button>
              </li>
            ))}
            <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={`${!canNextPage ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                {t("common.next")}
              </button>
            </li>
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                className={`${!canNextPage ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Icon icon="heroicons:chevron-double-right-solid" />
              </button>
            </li>
          </ul>
        </div>
      </Card>

      {/* Add Category Modal */}
      <Modal
        title={t("category.addNewCategory")}
        activeModal={showAddModal}
        onClose={() => setShowAddModal(false)}
      >
        <div className="space-y-4">
          <Textinput
            label={t("category.name")}
            type="text"
            placeholder={t("category.namePlaceholder")}
            value={addFormData.name}
            onChange={(e) => handleAddFormChange("name", e.target.value)}
          />
          <Textinput
            label={t("category.slug")}
            type="text"
            placeholder={t("category.slugPlaceholder")}
            value={addFormData.slug}
            onChange={(e) => handleAddFormChange("slug", e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
              {t("category.description")}
            </label>
            <textarea
              className="form-control"
              rows={3}
              placeholder={t("category.descriptionPlaceholder")}
              value={addFormData.description}
              onChange={(e) => handleAddFormChange("description", e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              className="btn btn-outline-dark inline-flex items-center"
              onClick={() => setShowAddModal(false)}
            >
              {t("common.cancel")}
            </button>
            <button
              className="btn btn-dark inline-flex items-center"
              onClick={handleSaveAdd}
            >
              <Icon icon="heroicons:check" className="ltr:mr-2 rtl:ml-2" />
              {t("category.saveCategory")}
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        title={t("category.editCategory")}
        activeModal={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingCategory(null);
        }}
      >
        <div className="space-y-4">
          <Textinput
            label={t("category.name")}
            type="text"
            placeholder={t("category.namePlaceholder")}
            value={editFormData.name}
            onChange={(e) => handleEditFormChange("name", e.target.value)}
          />
          <Textinput
            label={t("category.slug")}
            type="text"
            placeholder={t("category.slugPlaceholder")}
            value={editFormData.slug}
            onChange={(e) => handleEditFormChange("slug", e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
              {t("category.description")}
            </label>
            <textarea
              className="form-control"
              rows={3}
              placeholder={t("category.descriptionPlaceholder")}
              value={editFormData.description}
              onChange={(e) => handleEditFormChange("description", e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              className="btn btn-outline-dark inline-flex items-center"
              onClick={() => {
                setShowEditModal(false);
                setEditingCategory(null);
              }}
            >
              {t("common.cancel")}
            </button>
            <button
              className="btn btn-dark inline-flex items-center"
              onClick={handleSaveEdit}
            >
              <Icon icon="heroicons:check" className="ltr:mr-2 rtl:ml-2" />
              {t("category.updateCategory")}
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title={t("common.deleteConfirmTitle")}
        activeModal={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setItemToDelete(null);
        }}
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-danger-500/20 flex items-center justify-center">
            <Icon icon="heroicons:exclamation-triangle" className="text-danger-500 text-3xl" />
          </div>
          <p className="text-slate-600 dark:text-slate-300 mb-2">
            {t("common.deleteCategoryMessage")}
          </p>
          {itemToDelete && (
            <p className="font-semibold text-slate-800 dark:text-slate-200 mb-6">
              "{itemToDelete.name}"
            </p>
          )}
          <div className="flex justify-center space-x-3">
            <button
              className="btn btn-outline-dark inline-flex items-center"
              onClick={() => {
                setDeleteModalOpen(false);
                setItemToDelete(null);
              }}
            >
              {t("common.cancel")}
            </button>
            <button
              className="btn btn-danger inline-flex items-center"
              onClick={confirmDelete}
            >
              <Icon icon="heroicons:trash" className="ltr:mr-2 rtl:ml-2" />
              {t("common.delete")}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CategoryPage;
