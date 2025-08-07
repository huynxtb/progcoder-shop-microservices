import { useSelector, useDispatch } from "react-redux";
import { handleNavBarType } from "@/store/layout";

const useNavbarType = () => {
  const dispatch = useDispatch();
  const navbarType = useSelector((state) => state.layout.navBarType);
  const setNavbarType = (val) => dispatch(handleNavBarType(val));
  return [navbarType, setNavbarType];
};

export default useNavbarType;
