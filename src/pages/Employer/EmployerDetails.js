import EmployerProfile from "../../Component/Employer/EmployerProfile";
import MainLayout1 from "../../layouts/MainLayout1";
import PageHeader from "../../Component/Pages/PageHeader";

const EmployerDetails = () => {
  return (
    <MainLayout1>
      <PageHeader title="Employer Profile" />

      <EmployerProfile />
    </MainLayout1>
  );
};

export default EmployerDetails;
