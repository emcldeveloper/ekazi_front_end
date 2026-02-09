import { Container } from "react-bootstrap";
import MainLayout1 from "../../../layouts/MainLayout1";
import EmailCoverLetter from "./EmailCoverLetter";

const ApplyJobEmail = () => {
  return (
    <MainLayout1>
      <Container className="mt-4">
        <EmailCoverLetter />
      </Container>
    </MainLayout1>
  );
};

export default ApplyJobEmail;
