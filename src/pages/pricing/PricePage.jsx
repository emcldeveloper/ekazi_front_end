import MainLayout1 from "../../layouts/MainLayout1";
import { Container } from "react-bootstrap";
import PriceList from "./PriceList";
const PricePage = () => {
  return (
    <MainLayout1>
      <Container className="py-5">
        <PriceList />
      </Container>
    </MainLayout1>
  );
};

export default PricePage;
