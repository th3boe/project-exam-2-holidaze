import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { API_HOLIDAZE_URL } from "../../constants/api";
import { BsPersonFill } from "react-icons/bs";
import error from "../../images/404.jpg";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import styles from "./venues.module.css";

// URL

const action = "/venues";
const method = "GET";

const URL = API_HOLIDAZE_URL + action;

// Venues function

export default function Venues() {
  const [venues, setVenues] = useState([]);
  const [loader, setLoader] = useState(false);
  const [upsError, setUpsError] = useState(false);
  //   const [mediaError, setMediaError] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  //   const navigate = useNavigate();
  //   const handleOnClickVenue = (id) => {
  //     navigate("venue/" + id);
  //   };

  const placeholder = "https://picsum.photos/id/80/200";
  //   const placeholder = "%PUBLIC_URL%/../../../../public/404.jpg";
  const mediaError = (e) => {
    e.target.src = placeholder;
  };

  //   console.log({ placeholder });

  useEffect(() => {
    async function getVenues() {
      try {
        setUpsError(false);
        setLoader(true);

        const response = await fetch(URL, { method });
        const json = await response.json();

        setVenues(json);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        setUpsError(true);
      }
    }

    getVenues();
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

  //   if (mediaError === 404) {
  //     return (
  //       <div>
  //         <img className={styles.venueImage} src={error} alt="error" />
  //       </div>
  //     );
  //   }

  // Venues content!

  return (
    <div>
      <div className={styles.title}>
        <h1>Venues!</h1>
        <p>Check out all the amazing venues.</p>
      </div>
      <div className={styles.searchPlacement}>
        <form>
          <label
            className={styles.labelSearch}
            htmlFor="search"
            alt="search-icon"
          >
            <span className={styles.visuallyHidden}>Search Label</span>
          </label>
          <input
            id="search"
            type="search"
            placeholder="Search for possible venues.. "
            className={styles.searchSize}
            onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
          ></input>
        </form>
      </div>
      <div className={styles.cardContainer}>
        {venues
          .filter((venue) => venue.name.toLowerCase().includes(searchValue))
          .map((venue) => (
            <div key={venue.id}>
              <Link to={`/venue/${venue.id}`}>
                <div className={styles.card}>
                  <div className={styles.title}>
                    <p>{venue.name}</p>
                  </div>
                  <img
                    className={styles.venueImage}
                    src={venue.media ? venue.media : placeholder}
                    alt={venue.name}
                    onError={mediaError}
                  />

                  {/* <img
                className={styles.venueImage}
                src={venue.media}
                alt={venue.name}
                onError={(this.onerror = null)(
                  (this.src = "../../images/404.jpg")
                )}
              /> */}

                  {/* <img
                className={styles.venueImage}
                src={venue.media || "../../images/logo-mobile.png"}
                alt={venue.name}
              /> */}
                  {/* {venue.media.length >= 1 ? (
                ""
              ) : (
                <imgji
                  className={styles.venueImage}
                  src={venue.media}
                  alt={venue.name}
                />
              )}
              {console.log(venue.media)} */}
                  <div className={styles.cardText}>
                    <p>
                      <BsPersonFill /> {venue.maxGuests}
                    </p>
                    <span className={styles.price}>
                      <p>NOK {venue.price}</p>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
