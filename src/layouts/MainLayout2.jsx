import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

const MainLayout2 = ({ children }) => {
  return (
    <>
      <AppHeader />
      <div className="w-100">{children}</div>
      <AppFooter />
    </>
  );
};

export default MainLayout2;
