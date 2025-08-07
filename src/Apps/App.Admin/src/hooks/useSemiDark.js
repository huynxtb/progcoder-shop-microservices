import { handleSemiDarkMode } from "@/store/layout";
import { useSelector, useDispatch } from "react-redux";

const useSemiDark = () => {
  const dispatch = useDispatch();
  const isSemiDark = useSelector((state) => state.layout.semiDarkMode);

  const setSemiDark = (val) => dispatch(handleSemiDarkMode(val));

  return [isSemiDark, setSemiDark];
};

export default useSemiDark;
