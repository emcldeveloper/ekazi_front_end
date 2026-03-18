import { Carousel, Container } from "react-bootstrap";

const BannerSection = () => {
  return (
    <Container fluid className="p-0">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/banners/ekazi-banner.jpeg"
            alt="ekazi banner"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/banners/exact-banner.jpeg"
            alt="exact banner"
          />
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default BannerSection;
