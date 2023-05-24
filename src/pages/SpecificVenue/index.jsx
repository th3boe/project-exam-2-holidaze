import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { API_HOLIDAZE_URL } from "../../constants/api";
import DatePicker from "react-datepicker";
import Carousel from "react-bootstrap/Carousel";

import { BsStarFill, BsFillPersonFill } from "react-icons/bs";
import { IoMdPricetags } from "react-icons/io";

import Button from "../../components/Button";
import PlaceholderImage from "../../images/placeholder.jpg";
import styles from "./venue.module.css";

import "react-datepicker/dist/react-datepicker.css";
import { number } from "yup";

// URL

const action = "/venues";
const method = "GET";

const venueURL = API_HOLIDAZE_URL + action;

const bookingAction = "/bookings";
const bookingURL = API_HOLIDAZE_URL + bookingAction;
const deleteURL = API_HOLIDAZE_URL + action;

// Product Page function

export default function SpecificVenue() {
  const [venue, setVenue] = useState(null);
  const [loader, setLoader] = useState(false);
  const [upsError, setUpsError] = useState(false);

  const [authenticate] = useContext(AuthContext);

  const [guests, setGuests] = useState(1);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [formError, setFormError] = useState({
    guests: 1,
    startDate: 0,
    endDate: 0,
  });
  const [error, setError] = useState(false);
  const [addedBooking, setAddedBooking] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (addedBooking) {
      timeoutId = setTimeout(() => {
        setAddedBooking(false);
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [addedBooking]);

  // useEffect to find venue that has been clicked!

  let { id } = useParams();
  const http = useAxios();

  const navigate = useNavigate();
  const handleOnClickEditVenue = () => {
    navigate("/updatevenue" + `/${id}`);
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

  // function booked() {
  //   return(
  //     venue.bookings.map((booking) => ({
  //       (<div>
  //       </div>)
  //     }))
  //   )
  // }

  // function booked() {
  //   return (
  //     <span>
  //       {venue.bookings.map((booking) => ({
  //         <div>
  //       }))}
  //     </span>
  //   )
  // }

  // make booking!

  async function handleFormSubmit(event) {
    event.preventDefault();

    const bookingInfo = {
      dateFrom: startDate,
      dateTo: endDate,
      guests: parseInt(guests),
      venueId: `${id}`,
    };

    setDateRange("");
    setGuests("");

    console.log(bookingInfo);

    const errors = {
      guests: guests.length > 1 ? "Number of guests must be more than 1" : "",
    };

    if (Object.values(errors).some((err) => err !== "")) {
      setFormError(errors);
    } else {
    }

    try {
      const response = await fetch(bookingURL, {
        method: "POST",
        body: JSON.stringify(bookingInfo),
        headers: {
          Authorization: `Bearer ${authenticate.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      console.log(data, bookingInfo);
      setAddedBooking(true);
    } catch {
      alert("Booking failed..");
      console.log(formError);
    }
  }

  // const remove = (id) => {
  //   // if (window.confirm("Do you want to delete this venue?")) {
  //   fetch(deleteURL + `/${id}`, { method: "DELETE" })
  //     .then(() => {})
  //     .catch((formError) => {
  //       alert("Delete failed..");
  //       console.log(formError);
  //     });
  //   // }
  // };

  // const http = useAxios;

  // async function handleDelete() {
  //   const confirmDelete = window.confirm("Do you want to delete this venue?");

  //   if (confirmDelete) {
  //     try {
  //       await http.delete(deleteURL + `/${id}`);
  //     } catch (formError) {
  //       console.log(formError);
  //       setFormError(true);
  //     }
  //   }
  // }

  //   const history = useHistory();
  const action = "/venues/";

  const deleteURL = `${API_HOLIDAZE_URL}${action}${id}`;

  async function handleDelete() {
    const confirmDelete = window.confirm("Do you wish to delete this venue?");

    if (confirmDelete) {
      try {
        await http.delete(deleteURL);
        navigate("/venues");
      } catch (error) {
        setError(error);
      }
    }
  }

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
              {venue.maxGuests > 1 ? (
                <>{venue.maxGuests} people</>
              ) : (
                <>{venue.maxGuests} person</>
              )}
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
                  {venue.media.map((image, index) => {
                    return (
                      <Carousel.Item key={index}>
                        <img
                          className={styles.carouselImage}
                          src={image}
                          alt={venue.name}
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
            <p>{venue.meta.wifi === true ? "WiFi Included" : "No WiFi"}</p>
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
          {/* <div>
            {venue.owner.name === authenticate.name ? (
              <>
                <Button name={"Edit Venue"} />
                <Button name={"Delete Venue"} />
              </>
            ) : (
              <Button
                name={"Book Now"}
                onClick={() => handleOnClickCreateBooking()}
              />
            )}
          </div> */}
          <div>
            {authenticate ? (
              <>
                <div>
                  {venue.owner.name === authenticate.name ? (
                    <>
                      <Button
                        name={"Edit Venue"}
                        onClick={() => handleOnClickEditVenue()}
                      />
                      <Button name={"Delete Venue"} onClick={handleDelete} />
                      <div>
                        <h3 className={styles.detailsTitle}>
                          UPCOMING BOOKINGS
                        </h3>
                        <h4>calender</h4>
                        <div className={styles.dateCard}>
                          <DatePicker
                            excludeDateIntervals={alreadyBooked()}
                            selectsRange
                            selectsDisabledDaysInRange
                            inline
                          />
                        </div>

                        <h4>booking details</h4>

                        {console.log(venue.bookings.length)}
                        {venue.bookings.length === 0 ? (
                          <p>
                            Currently no bookings have been made for this venue!
                          </p>
                        ) : (
                          <>
                            {venue.bookings.map((booking) => {
                              return (
                                <div className={styles.bookings}>
                                  <p>
                                    <BsFillPersonFill /> {booking.guests}
                                  </p>
                                  <p>
                                    {new Date(booking.dateFrom).toDateString()}{" "}
                                    <br />
                                    until <br />
                                    {new Date(booking.dateTo).toDateString()}
                                  </p>
                                  <p>
                                    Created at{" "}
                                    {new Date(booking.created).toDateString()}{" "}
                                    at {""}
                                    {new Date(
                                      booking.created
                                    ).toLocaleTimeString()}
                                  </p>
                                </div>
                              );
                            })}
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* <Button
                        name={"Book Now"}
                        onClick={() => handleOnClickCreateBooking()}
                      /> */}

                      <h2 className={styles.detailsTitle}>MAKE YOUR BOOKING</h2>

                      <div className={styles.bookVenue}>
                        <form
                          className={styles.form}
                          onSubmit={handleFormSubmit}
                        >
                          <label className={styles.label} htmlFor="guests">
                            Amount of Guests: *
                          </label>
                          <input
                            className={styles.inputSize}
                            type="number"
                            id="guests"
                            name="guests"
                            value={guests}
                            placeholder="Please enter guest amount"
                            onChange={(e) => setGuests(e.target.value)}
                          />

                          <label className={styles.label} htmlFor="calender">
                            Pick wished dates for your stay:
                          </label>
                          <DatePicker
                            className={styles.inputSize}
                            placeholderText="select wished travel dates"
                            id="calender"
                            excludeDateIntervals={alreadyBooked()}
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                              setDateRange(update);
                            }}
                            withPortal
                          />
                          <div className={styles.button}>
                            <Button name={"Book Now"} type="submit" />
                          </div>
                        </form>
                        {addedBooking ? (
                          <p className={styles.addedSuccess}>
                            Your booking has been successfully added.
                          </p>
                        ) : null}
                      </div>

                      <div className={styles.owner}>
                        <h3 className={styles.detailsTitle}>VENUE OWNER</h3>
                        <img
                          className={styles.avatarImage}
                          src={
                            venue.owner.avatar
                              ? venue.owner.avatar
                              : placeholder
                          }
                          alt={venue.owner}
                        />
                        <p>
                          {venue.owner.name} <br /> {venue.owner.email}
                        </p>
                        <p>
                          Created at {new Date(venue.created).toDateString()} at{" "}
                          {""}
                          {new Date(venue.created).toLocaleTimeString()}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </>
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
          {/* <div className={styles.owner}>
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
          </div> */}
        </div>
      </div>
    </div>
  );
}

// [addDays(new Date(), 1), addDays(new Date(), 5)];
// DeletePostButton.propTypes = {
//   id: PropTypes.number.isRequired,
// };
