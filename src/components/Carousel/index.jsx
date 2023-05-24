import Carousel from "react-bootstrap/Carousel";

export default function Carousel() {
  return (
    <Carousel variant="dark">
      <Carousel.Item>
        {venue.media.map((image) => {
          return (
            <div>
              <img className="d-block w-100" src={image} />
            </div>
          );
        })}
        ;
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
