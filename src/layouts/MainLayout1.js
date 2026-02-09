import AppFooter from "../Component/Partials/AppFooter";
import AppHeader from "../Component/Partials/AppHeader";
import CopyrightBar from "../Component/Partials/CopyrightBar";

const MainLayout1 = ({ children }) => {
  return (
    <>
      <AppHeader />

      <div className="w-100">{children}</div>

      <AppFooter />
      <CopyrightBar />
    </>
  );
};

export default MainLayout1;
