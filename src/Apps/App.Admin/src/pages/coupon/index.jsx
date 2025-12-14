import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import Textinput from "@/components/ui/Textinput";
import Modal from "@/components/ui/Modal";
import Flatpickr from "react-flatpickr";
import { formatCurrency } from "@/utils/format";
import { discountService } from "@/services/discountService";
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
      placeholder={t("coupon.search")}
    />
  );
};

const CouponPage = () => {
  const { t } = useTranslation();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewingCoupon, setViewingCoupon] = useState(null);
  const [validityModalOpen, setValidityModalOpen] = useState(false);
  const [couponForValidity, setCouponForValidity] = useState(null);
  const [validityStartDate, setValidityStartDate] = useState(new Date());
  const [validityEndDate, setValidityEndDate] = useState(new Date());
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [updatingValidity, setUpdatingValidity] = useState(false);

  // Fetch coupons from API
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true);
        const response = await discountService.getAllCoupons();
        
        // Map API response to component format
        const mappedCoupons = response.data.result.coupons.map((item) => ({
          id: item.id,
          code: item.code,
          name: item.name || item.description || "",
          discount: item.value,
          type: item.type === 1 ? "fixed" : "percent", // 1=Fixed, 2=Percentage
          displayType: item.displayType,
          minOrder: item.minPurchaseAmount || 0,
          maxDiscount: item.maxDiscountAmount,
          usageLimit: item.maxUsage,
          usedCount: item.usageCount || 0,
          startDate: item.validFrom,
          expiryDate: item.validTo,
          status: mapStatus(item.displayStatus, item.isExpired, item.isOutOfUses),
          displayStatus: item.displayStatus,
          isValid: item.isValid,
          isExpired: item.isExpired,
          isOutOfUses: item.isOutOfUses,
        }));
        
        setCoupons(mappedCoupons);
      } catch (error) {
        console.error("Failed to fetch coupons:", error);
        setCoupons([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [t]);

  // Helper function to map API status to component status
  const mapStatus = (displayStatus, isExpired, isOutOfUses) => {
    if (isExpired) return "expired";
    if (isOutOfUses) return "expired";
    if (displayStatus === "Approved") return "active";
    if (displayStatus === "Pending") return "inactive";
    if (displayStatus === "Rejected") return "inactive";
    return "inactive";
  };

  const handleDeleteClick = (coupon) => {
    setItemToDelete(coupon);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete?.id) return;

    try {
      setDeleting(true);
      const response = await discountService.deleteCoupon(itemToDelete.id);

      if (response && response.status >= 200 && response.status < 300) {
        toast.success(t("coupon.deleteSuccess"), {
          position: "top-right",
          autoClose: 5000,
        });

        // Remove the deleted coupon from the list
        setCoupons((prevCoupons) =>
          prevCoupons.filter((coupon) => coupon.id !== itemToDelete.id)
        );

        setDeleteModalOpen(false);
        setItemToDelete(null);
      }
    } catch (error) {
      console.error("Failed to delete coupon:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleViewClick = async (coupon) => {
    try {
      // Fetch full coupon details
      const response = await discountService.getCouponById(coupon.id);
      const couponData = response.data.result.coupon;
      
      const mappedCoupon = {
        id: couponData.id,
        code: couponData.code,
        name: couponData.name || couponData.description || "",
        discount: couponData.value,
        type: couponData.type === 1 ? "fixed" : "percent",
        displayType: couponData.displayType,
        minOrder: couponData.minPurchaseAmount || 0,
        maxDiscount: couponData.maxDiscountAmount,
        usageLimit: couponData.maxUsage,
        usedCount: couponData.usageCount || 0,
        startDate: couponData.validFrom,
        expiryDate: couponData.validTo,
        status: mapStatus(couponData.displayStatus, couponData.isExpired, couponData.isOutOfUses),
        displayStatus: couponData.displayStatus,
        isValid: couponData.isValid,
        isExpired: couponData.isExpired,
        isOutOfUses: couponData.isOutOfUses,
      };
      
      setViewingCoupon(mappedCoupon);
      setViewModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch coupon details:", error);
    }
  };

  const handleApproveClick = async () => {
    if (!viewingCoupon?.id) return;

    try {
      setApproving(true);
      const response = await discountService.approveCoupon(viewingCoupon.id);

      if (response && response.status >= 200 && response.status < 300) {
        toast.success(t("coupon.approveSuccess"), {
          position: "top-right",
          autoClose: 5000,
        });

        // Refresh the coupon list
        const refreshResponse = await discountService.getAllCoupons();
        const mappedCoupons = refreshResponse.data.result.coupons.map((item) => ({
          id: item.id,
          code: item.code,
          name: item.description || "",
          discount: item.value,
          type: item.type === 1 ? "fixed" : "percent",
          displayType: item.displayType,
          minOrder: item.minPurchaseAmount || 0,
          maxDiscount: item.maxDiscountAmount,
          usageLimit: item.maxUsage,
          usedCount: item.usageCount || 0,
          startDate: item.validFrom,
          expiryDate: item.validTo,
          status: mapStatus(item.displayStatus, item.isExpired, item.isOutOfUses),
          displayStatus: item.displayStatus,
          isValid: item.isValid,
          isExpired: item.isExpired,
          isOutOfUses: item.isOutOfUses,
        }));
        setCoupons(mappedCoupons);

        // Update viewing coupon
        if (viewingCoupon.id) {
          const detailResponse = await discountService.getCouponById(viewingCoupon.id);
          const couponData = detailResponse.data.result.coupon;
          const mappedCoupon = {
            id: couponData.id,
            code: couponData.code,
            name: couponData.name || couponData.description || "",
            discount: couponData.value,
            type: couponData.type === 1 ? "fixed" : "percent",
            displayType: couponData.displayType,
            minOrder: couponData.minPurchaseAmount || 0,
            maxDiscount: couponData.maxDiscountAmount,
            usageLimit: couponData.maxUsage,
            usedCount: couponData.usageCount || 0,
            startDate: couponData.validFrom,
            expiryDate: couponData.validTo,
            status: mapStatus(couponData.displayStatus, couponData.isExpired, couponData.isOutOfUses),
            displayStatus: couponData.displayStatus,
            isValid: couponData.isValid,
            isExpired: couponData.isExpired,
            isOutOfUses: couponData.isOutOfUses,
          };
          setViewingCoupon(mappedCoupon);
        }
      }
    } catch (error) {
      console.error("Failed to approve coupon:", error);
    } finally {
      setApproving(false);
    }
  };

  const handleRejectClick = async () => {
    if (!viewingCoupon?.id) return;

    try {
      setRejecting(true);
      const response = await discountService.rejectCoupon(viewingCoupon.id);

      if (response && response.status >= 200 && response.status < 300) {
        toast.success(t("coupon.rejectSuccess"), {
          position: "top-right",
          autoClose: 5000,
        });

        // Refresh the coupon list
        const refreshResponse = await discountService.getAllCoupons();
        const mappedCoupons = refreshResponse.data.result.coupons.map((item) => ({
          id: item.id,
          code: item.code,
          name: item.description || "",
          discount: item.value,
          type: item.type === 1 ? "fixed" : "percent",
          displayType: item.displayType,
          minOrder: item.minPurchaseAmount || 0,
          maxDiscount: item.maxDiscountAmount,
          usageLimit: item.maxUsage,
          usedCount: item.usageCount || 0,
          startDate: item.validFrom,
          expiryDate: item.validTo,
          status: mapStatus(item.displayStatus, item.isExpired, item.isOutOfUses),
          displayStatus: item.displayStatus,
          isValid: item.isValid,
          isExpired: item.isExpired,
          isOutOfUses: item.isOutOfUses,
        }));
        setCoupons(mappedCoupons);

        // Update viewing coupon
        if (viewingCoupon.id) {
          const detailResponse = await discountService.getCouponById(viewingCoupon.id);
          const couponData = detailResponse.data.result.coupon;
          const mappedCoupon = {
            id: couponData.id,
            code: couponData.code,
            name: couponData.name || couponData.description || "",
            discount: couponData.value,
            type: couponData.type === 1 ? "fixed" : "percent",
            displayType: couponData.displayType,
            minOrder: couponData.minPurchaseAmount || 0,
            maxDiscount: couponData.maxDiscountAmount,
            usageLimit: couponData.maxUsage,
            usedCount: couponData.usageCount || 0,
            startDate: couponData.validFrom,
            expiryDate: couponData.validTo,
            status: mapStatus(couponData.displayStatus, couponData.isExpired, couponData.isOutOfUses),
            displayStatus: couponData.displayStatus,
            isValid: couponData.isValid,
            isExpired: couponData.isExpired,
            isOutOfUses: couponData.isOutOfUses,
          };
          setViewingCoupon(mappedCoupon);
        }
      }
    } catch (error) {
      console.error("Failed to reject coupon:", error);
    } finally {
      setRejecting(false);
    }
  };

  const handleEditValidityClick = (coupon) => {
    setCouponForValidity(coupon);
    setValidityStartDate(new Date(coupon.startDate));
    setValidityEndDate(new Date(coupon.expiryDate));
    setValidityModalOpen(true);
  };

  const handleUpdateValidity = async () => {
    if (!couponForValidity?.id) return;

    // Validation
    if (validityEndDate <= validityStartDate) {
      toast.error(t("coupon.validityDateError"), {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    try {
      setUpdatingValidity(true);
      const response = await discountService.updateValidityPeriod(
        couponForValidity.id,
        {
          validFrom: validityStartDate.toISOString(),
          validTo: validityEndDate.toISOString(),
        }
      );

      if (response && response.status >= 200 && response.status < 300) {
        toast.success(t("coupon.updateValiditySuccess"), {
          position: "top-right",
          autoClose: 5000,
        });

        // Refresh the coupon list
        const refreshResponse = await discountService.getAllCoupons();
        const mappedCoupons = refreshResponse.data.result.coupons.map((item) => ({
          id: item.id,
          code: item.code,
          name: item.description || "",
          discount: item.value,
          type: item.type === 1 ? "fixed" : "percent",
          displayType: item.displayType,
          minOrder: item.minPurchaseAmount || 0,
          maxDiscount: item.maxDiscountAmount,
          usageLimit: item.maxUsage,
          usedCount: item.usageCount || 0,
          startDate: item.validFrom,
          expiryDate: item.validTo,
          status: mapStatus(item.displayStatus, item.isExpired, item.isOutOfUses),
          displayStatus: item.displayStatus,
          isValid: item.isValid,
          isExpired: item.isExpired,
          isOutOfUses: item.isOutOfUses,
        }));
        setCoupons(mappedCoupons);

        setValidityModalOpen(false);
        setCouponForValidity(null);
      }
    } catch (error) {
      console.error("Failed to update validity period:", error);
    } finally {
      setUpdatingValidity(false);
    }
  };

  const COLUMNS = useMemo(() => [
    {
      Header: t("coupon.code"),
      accessor: "code",
      Cell: (row) => (
        <span className="font-mono font-bold text-primary-500 bg-primary-500/10 px-2 py-1 rounded">
          {row?.cell?.value}
        </span>
      ),
    },
    {
      Header: t("coupon.discount"),
      accessor: "discount",
      Cell: (row) => {
        const type = row?.row?.original?.type;
        const value = row?.cell?.value;
        return (
          <span className="font-semibold">
            {type === "percent" ? `${value}%` : formatCurrency(value)}
          </span>
        );
      },
    },
    {
      Header: t("coupon.type"),
      accessor: "displayType",
      Cell: (row) => {
        const displayType = row?.cell?.value || row?.row?.original?.type;
        const isPercent = displayType === "Percentage" || row?.row?.original?.type === "percent";
        return (
          <span
            className={`inline-block px-2 py-1 rounded text-sm ${
              isPercent
                ? "bg-blue-500/20 text-blue-500"
                : "bg-green-500/20 text-green-500"
            }`}
          >
            {isPercent ? t("coupon.percent") : t("coupon.fixed")}
          </span>
        );
      },
    },
    {
      Header: t("coupon.minOrder"),
      accessor: "minOrder",
      Cell: (row) => (
        <span className="text-slate-600 dark:text-slate-300">
          {formatCurrency(row?.cell?.value)}
        </span>
      ),
    },
    {
      Header: t("coupon.usedCount"),
      accessor: "usedCount",
      Cell: (row) => {
        const usageLimit = row?.row?.original?.usageLimit;
        const usedCount = row?.cell?.value;
        return (
          <span>
            {usedCount}
            {usageLimit && ` / ${usageLimit}`}
          </span>
        );
      },
    },
    {
      Header: t("coupon.expiryDate"),
      accessor: "expiryDate",
      Cell: (row) => {
        const date = new Date(row?.cell?.value);
        const isExpired = date < new Date();
        return (
          <span className={isExpired ? "text-danger-500" : ""}>
            {date.toLocaleDateString("vi-VN")}
          </span>
        );
      },
    },
    {
      Header: t("coupon.status"),
      accessor: "displayStatus",
      Cell: (row) => {
        const displayStatus = row?.cell?.value || row?.row?.original?.status;
        const status = row?.row?.original?.status;
        return (
          <span className="block w-full">
            <span
              className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] ${
                displayStatus === "Approved" || status === "active"
                  ? "text-success-500 bg-success-500/30"
                  : ""
              } 
              ${displayStatus === "Pending" || status === "inactive"
                ? "text-warning-500 bg-warning-500/30"
                : ""}
              ${displayStatus === "Rejected" || status === "expired"
                ? "text-danger-500 bg-danger-500/30"
                : ""}
              `}
            >
              {displayStatus === "Approved" && t("coupon.approved")}
              {displayStatus === "Pending" && t("coupon.pending")}
              {displayStatus === "Rejected" && t("coupon.rejected")}
              {!displayStatus && status === "active" && t("coupon.active")}
              {!displayStatus && status === "inactive" && t("coupon.inactive")}
              {!displayStatus && status === "expired" && t("coupon.expired")}
            </span>
          </span>
        );
      },
    },
    {
      Header: t("coupon.actions"),
      accessor: "action",
      Cell: (row) => {
        const coupon = row?.row?.original;
        return (
          <div className="flex space-x-3 rtl:space-x-reverse">
            <Tooltip content={t("common.view")} placement="top" arrow animation="shift-away">
              <button
                className="action-btn"
                type="button"
                onClick={() => handleViewClick(coupon)}
              >
                <Icon icon="heroicons:eye" />
              </button>
            </Tooltip>
            <Tooltip
              content={t("coupon.editValidityPeriod")}
              placement="top"
              arrow
              animation="shift-away"
            >
              <button
                className="action-btn"
                type="button"
                onClick={() => handleEditValidityClick(coupon)}
              >
                <Icon icon="heroicons:calendar" />
              </button>
            </Tooltip>
            <Tooltip content={t("common.edit")} placement="top" arrow animation="shift-away">
              <Link to={`/edit-coupon/${coupon?.id}`} className="action-btn">
                <Icon icon="heroicons:pencil-square" />
              </Link>
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
                onClick={() => handleDeleteClick(coupon)}
              >
                <Icon icon="heroicons:trash" />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ], [t]);

  const data = useMemo(() => coupons, [coupons]);

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
          <h4 className="card-title">{t("coupon.title")}</h4>
          <div className="md:flex md:space-x-4 md:space-y-0 space-y-2">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} t={t} />
            <Link to="/create-coupon" className="btn btn-dark btn-sm inline-flex items-center">
              <Icon icon="heroicons:plus" className="ltr:mr-2 rtl:ml-2" />
              {t("coupon.createNew")}
            </Link>
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
                        <td colSpan={headerGroups[0]?.headers?.length || 7} className="table-td text-center py-8">
                          <div className="flex flex-col items-center justify-center">
                            <Icon icon="heroicons:arrow-path" className="animate-spin text-2xl text-slate-400 mb-2" />
                            <span className="text-slate-500 dark:text-slate-400">{t("common.loading")}</span>
                          </div>
                        </td>
                      </tr>
                    ) : page.length === 0 ? (
                      <tr>
                        <td colSpan={headerGroups[0]?.headers?.length || 7} className="table-td text-center py-8">
                          <span className="text-slate-500 dark:text-slate-400">{t("coupon.noCoupons")}</span>
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

      {/* View Coupon Detail Modal */}
      <Modal
        title={t("coupon.viewDetail")}
        activeModal={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setViewingCoupon(null);
        }}
      >
        {viewingCoupon && (
          <div className="space-y-4">
            {/* Header with Approve/Reject buttons */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-center flex-1">
                <span className="font-mono text-2xl font-bold text-primary-500 bg-primary-500/10 px-4 py-2 rounded-lg">
                  {viewingCoupon.code}
                </span>
              </div>
              <div className="flex space-x-2">
                {viewingCoupon.displayStatus !== "Approved" && (
                  <button
                    className="btn btn-success btn-sm inline-flex items-center"
                    onClick={handleApproveClick}
                    disabled={approving}
                  >
                    {approving ? (
                      <>
                        <Icon icon="heroicons:arrow-path" className="ltr:mr-2 rtl:ml-2 animate-spin" />
                        {t("common.loading")}
                      </>
                    ) : (
                      <>
                        <Icon icon="heroicons:check-circle" className="ltr:mr-2 rtl:ml-2" />
                        {t("coupon.approve")}
                      </>
                    )}
                  </button>
                )}
                {viewingCoupon.displayStatus !== "Rejected" && (
                  <button
                    className="btn btn-danger btn-sm inline-flex items-center"
                    onClick={handleRejectClick}
                    disabled={rejecting}
                  >
                    {rejecting ? (
                      <>
                        <Icon icon="heroicons:arrow-path" className="ltr:mr-2 rtl:ml-2 animate-spin" />
                        {t("common.loading")}
                      </>
                    ) : (
                      <>
                        <Icon icon="heroicons:x-circle" className="ltr:mr-2 rtl:ml-2" />
                        {t("coupon.reject")}
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-slate-500">{t("coupon.programName")}</p>
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  {viewingCoupon.name || "-"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-500">{t("coupon.status")}</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${
                    viewingCoupon.displayStatus === "Approved" || viewingCoupon.status === "active"
                      ? "text-success-500 bg-success-500/30"
                      : viewingCoupon.displayStatus === "Pending" || viewingCoupon.status === "inactive"
                      ? "text-warning-500 bg-warning-500/30"
                      : "text-danger-500 bg-danger-500/30"
                  }`}
                >
                  {viewingCoupon.displayStatus === "Approved" && t("coupon.approved")}
                  {viewingCoupon.displayStatus === "Pending" && t("coupon.pending")}
                  {viewingCoupon.displayStatus === "Rejected" && t("coupon.rejected")}
                  {!viewingCoupon.displayStatus && viewingCoupon.status === "active" && t("coupon.active")}
                  {!viewingCoupon.displayStatus && viewingCoupon.status === "inactive" && t("coupon.inactive")}
                  {!viewingCoupon.displayStatus && viewingCoupon.status === "expired" && t("coupon.expired")}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <h6 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
                {t("coupon.discountInfo")}
              </h6>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-slate-500">{t("coupon.type")}</p>
                  <p className="font-medium">
                    {viewingCoupon.type === "percent" ? t("coupon.percent") : t("coupon.fixed")}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-500">{t("coupon.discount")}</p>
                  <p className="font-semibold text-lg text-primary-500">
                    {viewingCoupon.type === "percent"
                      ? `${viewingCoupon.discount}%`
                      : formatCurrency(viewingCoupon.discount)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-500">{t("coupon.minOrder")}</p>
                  <p className="font-medium">{formatCurrency(viewingCoupon.minOrder)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-500">{t("coupon.maxDiscountValue")}</p>
                  <p className="font-medium">
                    {viewingCoupon.maxDiscount
                      ? formatCurrency(viewingCoupon.maxDiscount)
                      : t("coupon.noLimit")}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <h6 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
                {t("coupon.usageInfo")}
              </h6>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-slate-500">{t("coupon.usedCount")}</p>
                  <p className="font-medium">
                    {viewingCoupon.usedCount}
                    {viewingCoupon.usageLimit && ` / ${viewingCoupon.usageLimit}`}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-500">{t("coupon.usageLimit")}</p>
                  <p className="font-medium">
                    {viewingCoupon.usageLimit || t("coupon.unlimited")}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <h6 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
                {t("coupon.dateInfo")}
              </h6>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-slate-500">{t("coupon.startDate")}</p>
                  <p className="font-medium">
                    {viewingCoupon.startDate
                      ? new Date(viewingCoupon.startDate).toLocaleDateString("vi-VN")
                      : "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-500">{t("coupon.expiryDate")}</p>
                  <p className="font-medium">
                    {new Date(viewingCoupon.expiryDate).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                className="btn btn-outline-dark inline-flex items-center"
                onClick={() => {
                  setViewModalOpen(false);
                  setViewingCoupon(null);
                }}
              >
                {t("common.close")}
              </button>
              <Link
                to={`/edit-coupon/${viewingCoupon.id}`}
                className="btn btn-dark inline-flex items-center"
              >
                <Icon icon="heroicons:pencil-square" className="ltr:mr-2 rtl:ml-2" />
                {t("common.edit")}
              </Link>
            </div>
          </div>
        )}
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
            {t("common.deleteCouponMessage")}
          </p>
          {itemToDelete && (
            <p className="font-semibold text-slate-800 dark:text-slate-200 mb-6">
              "{itemToDelete.code}"
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

      {/* Edit Validity Period Modal */}
      <Modal
        title={t("coupon.editValidityPeriod")}
        activeModal={validityModalOpen}
        onClose={() => {
          setValidityModalOpen(false);
          setCouponForValidity(null);
        }}
      >
        {couponForValidity && (
          <div className="space-y-4">
            <div className="mb-4">
              <p className="text-sm text-slate-500 mb-2">{t("coupon.code")}</p>
              <p className="font-mono font-bold text-primary-500">
                {couponForValidity.code}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                  {t("coupon.validFrom")}
                </label>
                <Flatpickr
                  className="form-control py-2"
                  value={validityStartDate}
                  onChange={([date]) => setValidityStartDate(date)}
                  options={{
                    dateFormat: "d/m/Y",
                    enableTime: true,
                    time_24hr: true,
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                  {t("coupon.validTo")}
                </label>
                <Flatpickr
                  className="form-control py-2"
                  value={validityEndDate}
                  onChange={([date]) => setValidityEndDate(date)}
                  options={{
                    dateFormat: "d/m/Y",
                    enableTime: true,
                    time_24hr: true,
                    minDate: validityStartDate,
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                className="btn btn-outline-dark inline-flex items-center"
                onClick={() => {
                  setValidityModalOpen(false);
                  setCouponForValidity(null);
                }}
                disabled={updatingValidity}
              >
                {t("common.cancel")}
              </button>
              <button
                className="btn btn-dark inline-flex items-center"
                onClick={handleUpdateValidity}
                disabled={updatingValidity}
              >
                {updatingValidity ? (
                  <>
                    <Icon icon="heroicons:arrow-path" className="ltr:mr-2 rtl:ml-2 animate-spin" />
                    {t("common.loading")}
                  </>
                ) : (
                  <>
                    <Icon icon="heroicons:check" className="ltr:mr-2 rtl:ml-2" />
                    {t("common.save")}
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default CouponPage;
