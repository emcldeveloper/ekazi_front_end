import AppFooter from "./AppFooter";
import Navbar from "./Navbar";

const MainLayout1 = ({ children }) => {
  return (
    <>
      <Navbar />

      <div className="w-100">{children}</div>

      <AppFooter />
    </>
  );
};

export default MainLayout1;
