import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API_HOLIDAZE_URL } from "../../constants/api";
import DatePicker from "react-datepicker";
import AuthContext from "../../context/AuthContext";
import { addDays } from "date-fns";
import { BsStarFill, BsFillPersonFill } from "react-icons/bs";
import { IoMdPricetags } from "react-icons/io";
import Button from "../../components/Button";
import styles from "./venue.module.css";
import Carousel from "react-bootstrap/Carousel";
import PlaceholderImage from "../../images/placeholder.jpg";

import "react-datepicker/dist/react-datepicker.css";
// import "react-datepicker/dist/react-datepicker-cssmodules.css";

// URL

const action = "/venues";
const method = "GET";

const venueURL = API_HOLIDAZE_URL + action;

// Product Page function

export default function SpecificVenue() {
  const [venue, setVenue] = useState(null);
  const [loader, setLoader] = useState(false);
  const [upsError, setUpsError] = useState(false);

  const [authenticate] = useContext(AuthContext);

  // useEffect to find venue that has been clicked!

  let { id } = useParams();

  const navigate = useNavigate();
  const handleOnClickCreateBooking = () => {
    navigate("/createbooking");
  };

  const placeholder = "https://picsum.photos/200";
  // const placeholder = { PlaceholderImage };
  // const placeholder = "%PUBLIC_URL%/../../../../public/404.jpg";
  const mediaError = (e) => {
    e.target.src = { PlaceholderImage };
  };

  useEffect(() => {
    async function getVenue() {
      try {
        setLoader(true);
        setUpsError(false);

        const response = await fetch(
          venueURL + `/${id}` + "?_owner=true&_bookings=true",
          { method }
        );
        const json = await response.json();

        setVenue(json);
        setLoader(false);
      } catch (error) {
        console.log(error);
        setLoader(false);
        setUpsError(true);
      }
    }

    getVenue();
  }, []);

  // Content for the above try and catch!

  if (loader || !venue) {
    return <div className="loader"></div>;
  }

  if (upsError) {
    return (
      <div className="errorMessage">
        Oh no.. There seems to be a problem, please hang on while we look into
        it!
      </div>
    );
  }

  function alreadyBooked() {
    return venue.bookings.map((booking) => ({
      start: new Date(booking.dateFrom) - 86400000,
      end: new Date(booking.dateTo),
    }));
  }

  // venue.media.forEach((images, i) => {
  //   let active = "";
  //   if (i === 0) {
  //     active = "active";
  //   }
  //   const sliderNumber = i + 1;
  //   console.log(sliderNumber);
  //   console.log(images, active);
  // });

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.informationCard}>
          <h1>{venue.name}</h1>
          <p>{venue.description}</p>
          <div className={styles.details}>
            <p className={styles.detailSpecific}>
              <IoMdPricetags /> {venue.price} NOK per night
            </p>
            <p>|</p>
            <p className={styles.detailSpecific}>
              <BsFillPersonFill /> {""}
              {venue.maxGuests} people
            </p>
            <p>|</p>
            <p className={styles.detailSpecific}>
              <BsStarFill /> ({venue.rating})
            </p>
          </div>
          <div>
            {venue.media == 0 ? (
              <>
                <img
                  className={styles.carouselImage}
                  src={PlaceholderImage}
                  onError={mediaError}
                />
              </>
            ) : (
              <>
                <Carousel>
                  {venue.media.map((image) => {
                    return (
                      <Carousel.Item key={image.id}>
                        <img
                          className={styles.carouselImage}
                          src={image}
                          onError={mediaError}
                        />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </>
            )}

            {/* {venue.media.map((image) => {
              return (
                <div>
                  <Carousel variant="dark">
                    <Carousel.Item>
                      <img className="d-block w-100" src={image} />
                    </Carousel.Item>
                  </Carousel>
                </div>
              );
            })} */}
          </div>
          <h2 className={styles.detailsTitle}>DETAILS</h2>
          <div className={styles.details}>
            <p>{venue.meta.wifi === true ? "WIFI Included" : "NO WIFI"}</p>
            <p>|</p>
            <p>{venue.meta.parking === true ? "Free Parking" : "No Parking"}</p>
            <p>|</p>
            <p>
              {venue.meta.breakfast === true
                ? "Breakfast Included"
                : "No Breakfast"}
            </p>
            <p>|</p>
            <p>
              {venue.meta.pets === true ? "Pets Allowed" : "No Pets Allowed"}
            </p>
          </div>
          <div>
            {authenticate ? (
              <Button
                name={"Book Now"}
                onClick={() => handleOnClickCreateBooking()}
              />
            ) : (
              <>
                <div className={styles.dateCard}>
                  <p>View when this venue is available:</p>

                  <DatePicker
                    excludeDateIntervals={alreadyBooked()}
                    selectsRange
                    selectsDisabledDaysInRange
                    inline
                  />
                </div>
                <div>
                  <p className={styles.member}>
                    Do you wish to book this venue?
                    <Link to="/signin"> Sign In here</Link>
                    <br /> Not a member?
                    <Link to="/register"> Create new!</Link>
                  </p>
                </div>
              </>
            )}
          </div>
          <div className={styles.owner}>
            <h3 className={styles.detailsTitle}>VENUE OWNER</h3>
            <img
              className={styles.avatarImage}
              src={venue.owner.avatar ? venue.owner.avatar : placeholder}
            />
            <p>
              {venue.owner.name} <br /> {venue.owner.email}
            </p>
            <p>
              Created at {new Date(venue.created).toDateString()} at {""}
              {new Date(venue.created).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// [addDays(new Date(), 1), addDays(new Date(), 5)];
