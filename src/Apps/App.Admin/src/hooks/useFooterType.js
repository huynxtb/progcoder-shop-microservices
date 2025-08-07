import { useSelector, useDispatch } from "react-redux";
import { handleFooterType } from "@/store/layout";

const useFooterType = () => {
  const dispatch = useDispatch();
  const footerType = useSelector((state) => state.layout.footerType);
  const setFooterType = (val) => dispatch(handleFooterType(val));
  return [footerType, setFooterType];
};

export default useFooterType;
