import React, { useEffect, useState, useContext } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { API_HOLIDAZE_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../hooks/useAxios";
import Spinner from "react-bootstrap/Spinner";
import styles from "./bookingsbyprofile.module.css";
import Button from "../../components/Button";

// Venues function

export default function MyBookings() {
  const [loader, setLoader] = useState(false);
  const [upsError, setUpsError] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [authenticate] = useContext(AuthContext);

  // URL

  const action = "/profiles";
  const http = useAxios();
  const URL = `${API_HOLIDAZE_URL}${action}/${authenticate.name}?_bookings=true`;

  // Navigate function, and function to navigate to profile

  const navigate = useNavigate();
  const handleOnClickProfile = () => {
    navigate(`/profile/${authenticate.name}`);
  };
  const handleOnClickVenues = () => {
    navigate("/venues");
  };

  // Fetch for the bookings

  useEffect(() => {
    async function getBookings() {
      try {
        setUpsError(false);
        setLoader(true);

        const response = await http.get(URL);

        setBookings(response.data);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        setUpsError(true);
      }
    }
    getBookings();
  }, []);

  // Content for the above try and catch!

  if (loader) {
    return (
      <div className={styles.loader}>
        <Spinner animation="border" />
        Loading venues...
      </div>
    );
  }

  if (upsError) {
    return (
      <div className={styles.errorMessage}>
        Oh no.. There seems to be a problem, please hang on while we look into
        it!
      </div>
    );
  }

  // return data.

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>Holidaze | Your Bookings</title>
          <link
            rel="icon"
            type="image/png"
            href="../../images/logo-mobile.png"
            sizes="16x16"
          />
        </Helmet>
        <div className={styles.topOfPage}>
          <div className={styles.title}>
            <h1>All {authenticate.name}'s upcoming Bookings</h1>
          </div>
          <div>
            <Button
              name={"Return to Profile"}
              onClick={() => handleOnClickProfile()}
            />
            <Button
              name={"Find a Destination"}
              onClick={() => handleOnClickVenues()}
            />
          </div>
        </div>
        <div className={styles.cardContainer}>
          {bookings.length === 0 ? (
            <p>not yet loaded</p>
          ) : (
            <>
              {bookings.bookings.length === 0 ? (
                <p>You have no bookings yet.</p>
              ) : (
                <>
                  {bookings.bookings.map((booking) => (
                    <div key={booking.id}>
                      <div className={styles.bookingCard}>
                        <h2>Your booking for {booking.venue.name}</h2>
                        <div className={styles.cardInformation}>
                          <p>Your stay is set to happen:</p>
                          <p>
                            {new Date(booking.dateFrom).toDateString()} until{" "}
                            {new Date(booking.dateTo).toDateString()}
                          </p>
                          <p>
                            Booked for{" "}
                            {booking.guests > 1 ? (
                              <>{booking.guests} people</>
                            ) : (
                              <>{booking.guests} person</>
                            )}
                          </p>
                        </div>
                        <div className={styles.button}>
                          <Button
                            name={"Go to Venue"}
                            onClick={() => {
                              navigate("/venue" + `/${booking.venue.id}`);
                            }}
                          />
                        </div>
                        <p className={styles.cardFooter}>
                          Booked at {new Date(booking.created).toDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </HelmetProvider>
  );
}
