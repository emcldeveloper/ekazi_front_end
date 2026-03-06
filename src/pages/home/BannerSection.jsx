import { Carousel, Container } from "react-bootstrap";

const BannerSection = () => {
  return (
    <Container fluid className="p-0">
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src="/slide.jpg" alt="First slide" />
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src="/slide.jpg" alt="First slide" />
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src="/slide.jpg" alt="First slide" />
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default BannerSection;
