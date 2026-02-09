import { Carousel, Container } from "react-bootstrap";

const BannerSection = () => {
  return (
    <Container className="my-5">
      <Carousel style={{ marginTop: "12px" }}>
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
