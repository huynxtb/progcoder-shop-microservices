import { useSelector, useDispatch } from "react-redux";
import { handleContentWidth } from "@/store/layout";

const useContentWidth = () => {
  const dispatch = useDispatch();
  const contentWidth = useSelector((state) => state.layout.contentWidth);

  // ** Toggles Content Width
  const setContentWidth = (val) => dispatch(handleContentWidth(val));

  return [contentWidth, setContentWidth];
};

export default useContentWidth;
