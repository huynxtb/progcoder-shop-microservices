import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleRtl } from "@/store/layout";

const useRtl = () => {
  const dispatch = useDispatch();
  const isRtl = useSelector((state) => state.layout.isRTL);

  const setRtl = (val) => dispatch(handleRtl(val));

  useEffect(() => {
    const element = document.getElementsByTagName("html")[0];

    if (isRtl) {
      element.setAttribute("dir", "rtl");
    } else {
      element.setAttribute("dir", "ltr");
    }
  }, [isRtl]);

  return [isRtl, setRtl];
};

export default useRtl;
