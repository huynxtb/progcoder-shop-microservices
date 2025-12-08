import React, { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import Textinput from "@/components/ui/Textinput";
import Modal from "@/components/ui/Modal";
import LoaderCircle from "@/components/Loader-circle";
import { api } from "@/api";
import { API_ENDPOINTS } from "@/api/endpoints";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
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

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await api.get(API_ENDPOINTS.CATALOG.GET_CATEGORIES);
        
        // Map API response to component format
        const mappedCategories = response.data.result.items.map((item) => ({
          id: item.id,
          name: item.name,
          slug: item.slug || "",
          description: item.description || "",
          parentName: item.parentName || null,
        }));
        
        setCategories(mappedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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

  const handleSaveEdit = async () => {
    if (!editingCategory?.id) return;

    try {
      setSaving(true);
      const response = await api.put(
        API_ENDPOINTS.CATALOG.UPDATE_CATEGORY(editingCategory.id),
        {
          name: editFormData.name,
          slug: editFormData.slug,
          description: editFormData.description,
        }
      );

      if (response && response.status >= 200 && response.status < 300) {
        toast.success(t("category.updateSuccess") || "Category updated successfully", {
          position: "top-right",
          autoClose: 5000,
        });

        // Refresh categories list
        const refreshResponse = await api.get(API_ENDPOINTS.CATALOG.GET_CATEGORIES);
        const mappedCategories = refreshResponse.data.result.items.map((item) => ({
          id: item.id,
          name: item.name,
          slug: item.slug || "",
          description: item.description || "",
          parentName: item.parentName || null,
        }));
        setCategories(mappedCategories);

        setShowEditModal(false);
        setEditingCategory(null);
        setEditFormData({ name: "", slug: "", description: "" });
      }
    } catch (error) {
      console.error("Failed to update category:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAdd = async () => {
    try {
      setSaving(true);
      const response = await api.post(API_ENDPOINTS.CATALOG.CREATE_CATEGORY, {
        name: addFormData.name,
        slug: addFormData.slug,
        description: addFormData.description,
      });

      if (response && response.status >= 200 && response.status < 300) {
        toast.success(t("category.createSuccess") || "Category created successfully", {
          position: "top-right",
          autoClose: 5000,
        });

        // Refresh categories list
        const refreshResponse = await api.get(API_ENDPOINTS.CATALOG.GET_CATEGORIES);
        const mappedCategories = refreshResponse.data.result.items.map((item) => ({
          id: item.id,
          name: item.name,
          slug: item.slug || "",
          description: item.description || "",
          parentName: item.parentName || null,
        }));
        setCategories(mappedCategories);

        setShowAddModal(false);
        setAddFormData({ name: "", slug: "", description: "" });
      }
    } catch (error) {
      console.error("Failed to create category:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (category) => {
    setItemToDelete(category);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete?.id) return;

    try {
      setDeleting(true);
      const response = await api.delete(API_ENDPOINTS.CATALOG.DELETE_CATEGORY(itemToDelete.id));

      if (response && response.status >= 200 && response.status < 300) {
        toast.success(t("category.deleteSuccess") || "Category deleted successfully", {
          position: "top-right",
          autoClose: 5000,
        });

        // Remove the deleted category from the list
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== itemToDelete.id)
        );

        setDeleteModalOpen(false);
        setItemToDelete(null);
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
    } finally {
      setDeleting(false);
    }
  };

  const COLUMNS = useMemo(() => [
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
      Header: t("category.parentName"),
      accessor: "parentName",
      Cell: (row) => {
        const parentName = row?.cell?.value;
        return parentName ? (
          <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm">
            {parentName}
          </span>
        ) : (
          <span className="text-slate-400 dark:text-slate-500 text-sm italic">
            {t("category.noParent") || "—"}
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

  const data = useMemo(() => categories, [categories]);

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
                  {loading ? (
                    <tr>
                      <td colSpan={headerGroups[0]?.headers?.length || 5} className="table-td text-center py-8">
                        <div className="flex flex-col items-center justify-center">
                          <Icon icon="heroicons:arrow-path" className="animate-spin text-2xl text-slate-400 mb-2" />
                          <span className="text-slate-500 dark:text-slate-400">{t("common.loading") || "Loading..."}</span>
                        </div>
                      </td>
                    </tr>
                  ) : page.length === 0 ? (
                    <tr>
                      <td colSpan={headerGroups[0]?.headers?.length || 5} className="table-td text-center py-8">
                        <span className="text-slate-500 dark:text-slate-400">{t("category.noCategories") || "No categories found"}</span>
                      </td>
                    </tr>
                  ) : (
                    page.map((row) => {
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
                    })
                  )}
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
              disabled={saving}
            >
              {saving ? (
                <>
                  <Icon icon="heroicons:arrow-path" className="ltr:mr-2 rtl:ml-2 animate-spin" />
                  {t("common.loading")}
                </>
              ) : (
                <>
                  <Icon icon="heroicons:check" className="ltr:mr-2 rtl:ml-2" />
                  {t("category.saveCategory")}
                </>
              )}
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
              disabled={saving}
            >
              {saving ? (
                <>
                  <Icon icon="heroicons:arrow-path" className="ltr:mr-2 rtl:ml-2 animate-spin" />
                  {t("common.loading")}
                </>
              ) : (
                <>
                  <Icon icon="heroicons:check" className="ltr:mr-2 rtl:ml-2" />
                  {t("category.updateCategory")}
                </>
              )}
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
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Icon icon="heroicons:arrow-path" className="ltr:mr-2 rtl:ml-2 animate-spin" />
                  {t("common.loading")}
                </>
              ) : (
                <>
                  <Icon icon="heroicons:trash" className="ltr:mr-2 rtl:ml-2" />
                  {t("common.delete")}
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CategoryPage;
