import { Breadcrumb, Container } from "react-bootstrap";

import EmployerProfile from "./components/EmployerProfile";
import MainLayout1 from "../../layouts/MainLayout1";

const EmployerDetails = () => {
  return (
    <MainLayout1>
      <Container className="py-4">
        <Breadcrumb className="custom-breadcrumb mb-4">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/employers">Employers</Breadcrumb.Item>
          <Breadcrumb.Item active className="text-black">
            Profile
          </Breadcrumb.Item>
        </Breadcrumb>

        <EmployerProfile />
      </Container>
    </MainLayout1>
  );
};

export default EmployerDetails;
