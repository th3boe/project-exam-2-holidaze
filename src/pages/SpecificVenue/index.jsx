import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import { API_HOLIDAZE_URL } from "../../constants/api";
import DatePicker from "react-datepicker";
import Carousel from "react-bootstrap/Carousel";
import Spinner from "react-bootstrap/Spinner";

import { BsStarFill, BsFillPersonFill } from "react-icons/bs";
import { IoMdPricetags } from "react-icons/io";

import Button from "../../components/Button";
import PlaceholderImage from "../../images/placeholder.jpg";
import styles from "./venue.module.css";

import "react-datepicker/dist/react-datepicker.css";

// URL for getting specific venue, and making a booking.

const action = "/venues";
const updateVenue = "/updatevenue";
const method = "GET";

const venueURL = API_HOLIDAZE_URL + action;
const URLend = "?_owner=true&_bookings=true";

const bookingAction = "/bookings";
const bookingURL = API_HOLIDAZE_URL + bookingAction;

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
    guests: "",
    startDate: "",
    endDate: "",
  });
  const [, setError] = useState(false);
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
    navigate(updateVenue + `/${id}`);
  };

  const placeholder = "https://picsum.photos/200";
  const mediaError = (e) => {
    e.target.src = placeholder;
  };

  useEffect(() => {
    async function getVenue() {
      try {
        setLoader(true);
        setUpsError(false);

        const response = await fetch(venueURL + `/${id}` + URLend, { method });
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
  }, [id]);

  // Content for the above try and catch!

  if (loader || !venue) {
    return (
      <div className={styles.loader}>
        <Spinner animation="border" />
        Loading venue...
      </div>
    );
  }

  if (upsError) {
    return (
      <div className="errorMessage">
        Oh no.. There seems to be a problem, please hang on while we look into
        it!
      </div>
    );
  }

  // function to fill in the dates between start and end date of exclude dates.

  function alreadyBooked() {
    return venue.bookings.map((booking) => ({
      start: new Date(booking.dateFrom) - 86400000,
      end: new Date(booking.dateTo),
    }));
  }

  // Function to make a booking!

  async function handleFormSubmit(event) {
    event.preventDefault();

    const bookingInfo = {
      dateFrom: startDate,
      dateTo: endDate,
      guests: parseInt(guests),
      venueId: `${id}`,
    };

    // error handling for inputs.

    const errors = {
      guests:
        guests >= 1 && guests > venue.maxGuests
          ? "Number of guests must be 1 or more, but cannot be more than the venue allows"
          : guests < 1
          ? "You must add an amount of guests over 1!"
          : "",
      dateRange:
        !startDate && !endDate
          ? "Your booking must have a start and end date"
          : "",
    };

    if (Object.values(errors).some((err) => err !== "")) {
      setFormError(errors);
    } else {
      console.log(bookingInfo);
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
      await response.json();

      if (response.status === 201) {
        setFormError(false);
        setAddedBooking(true);
        setDateRange("");
        setGuests("");
      }
    } catch {
      alert("Booking failed..");
    }
  }

  // URL for Delete Venue.

  const deleteAction = "/venues/";
  const deleteURL = `${API_HOLIDAZE_URL}${deleteAction}${id}`;

  // Delete function.

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

  // return data.

  return (
    <HelmetProvider>
      <div className={styles.pageWrapper}>
        <Helmet>
          <title>Holidaze | {venue.name}</title>
          <link
            rel="icon"
            type="image/png"
            href="../../images/logo-mobile.png"
            sizes="16x16"
          />
        </Helmet>
        <div className={styles.contentWrapper}>
          <div className={styles.informationCard}>
            <h1>{venue.name}</h1>
            <p>{venue.description}</p>
            <div className={styles.details}>
              <p className={styles.detailSpecific}>
                <IoMdPricetags /> {venue.price} NOK per night
              </p>
              <p className={styles.detailSpecific}>
                <BsFillPersonFill /> {""}
                {venue.maxGuests > 1 ? (
                  <>{venue.maxGuests} people</>
                ) : (
                  <>{venue.maxGuests} person</>
                )}
              </p>
              <p className={styles.detailSpecific}>
                <BsStarFill /> ({venue.rating})
              </p>
            </div>
            <div>
              {venue.media >= 0 ? (
                <>
                  <img
                    className={styles.carouselImage}
                    src={PlaceholderImage}
                    alt="placeholder"
                    onError={mediaError}
                  />
                </>
              ) : (
                <>
                  {venue.media.length === 1 ? (
                    <img
                      className={styles.carouselImage}
                      src={venue.media}
                      alt={venue.name}
                      onError={mediaError}
                    />
                  ) : (
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
                  )}
                </>
              )}
            </div>
            <h2 className={styles.detailsTitle}>DETAILS</h2>
            <div className={styles.details}>
              <p>{venue.meta.wifi === true ? "WiFi Included" : "No WiFi"}</p>
              <p>
                {venue.meta.parking === true ? "Free Parking" : "No Parking"}
              </p>
              <p>
                {venue.meta.breakfast === true
                  ? "Breakfast Included"
                  : "No Breakfast"}
              </p>
              <p>
                {venue.meta.pets === true ? "Pets Allowed" : "No Pets Allowed"}
              </p>
            </div>
            {venue.location.address === "" &&
            venue.location.city === "" &&
            venue.location.country === "" ? (
              ""
            ) : (
              <>
                <div className={styles.locationCard}>
                  <h3>Venue Location</h3>
                  {venue.location.address === "" ? (
                    ""
                  ) : (
                    <p>Address: {venue.location.address}</p>
                  )}
                  {venue.location.city === "" ? (
                    ""
                  ) : (
                    <p>City: {venue.location.city}</p>
                  )}
                  {venue.location.country === "" ? (
                    ""
                  ) : (
                    <p>Country: {venue.location.country}</p>
                  )}
                </div>
              </>
            )}
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
                              minDate={new Date()}
                              excludeDateIntervals={alreadyBooked()}
                              selectsRange
                              selectsDisabledDaysInRange
                              inline
                            />
                          </div>

                          <h4>booking details</h4>

                          {venue.bookings.length === 0 ? (
                            <p>
                              Currently no bookings have been made for this
                              venue!
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
                                      {new Date(
                                        booking.dateFrom
                                      ).toDateString()}{" "}
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
                        <h2 className={styles.detailsTitle}>
                          MAKE YOUR BOOKING
                        </h2>

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
                            {formError.guests && (
                              <p className={styles.errorInput}>
                                {formError.guests}
                              </p>
                            )}

                            <label className={styles.label} htmlFor="calender">
                              Pick wished dates for your stay:
                            </label>
                            <DatePicker
                              className={styles.inputSize}
                              placeholderText="select wished travel dates"
                              id="calender"
                              minDate={new Date()}
                              excludeDateIntervals={alreadyBooked()}
                              selectsRange={true}
                              startDate={startDate}
                              endDate={endDate}
                              onChange={(update) => {
                                setDateRange(update);
                              }}
                              withPortal
                            />
                            {formError.dateRange && (
                              <p className={styles.errorInput}>
                                {formError.dateRange}
                              </p>
                            )}

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
                            Created at {new Date(venue.created).toDateString()}{" "}
                            at {""}
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
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}
