import { useSelector, useDispatch } from "react-redux";
import { handleMenuHidden } from "@/store/layout";

const useMenuHidden = () => {
  const dispatch = useDispatch();
  const menuHidden = useSelector((state) => state.layout.menuHidden);

  const setMenuHidden = (value) => {
    dispatch(handleMenuHidden(value));
  };

  return [menuHidden, setMenuHidden];
};

export default useMenuHidden;
