import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { API_HOLIDAZE_URL } from "../../constants/api";
import { BsPersonFill } from "react-icons/bs";
// import PlaceholderImage from "../../images/placeholder.jpg";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import styles from "./venues.module.css";
import Carousel from "react-bootstrap/Carousel";
import PlaceholderImage from "../../images/placeholder.jpg";

// URL

const action = "/venues";
const method = "GET";

const URL = API_HOLIDAZE_URL + action + "?sort=created&sortOrder=desc";

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
  // const placeholder = { PlaceholderImage };
  // const placeholder = "%PUBLIC_URL%/../../../../public/404.jpg";
  const mediaError = (e) => {
    e.target.src = placeholder;
  };

  console.log(placeholder);

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

  // const image =
  //   venues.media === undefined ? (
  //     <img
  //       className={styles.venueImage}
  //       src={placeholderImage}
  //       onError={mediaError}
  //     />
  //   ) : (
  //     <img
  //       className={styles.venueImage}
  //       src={image.media}
  //       alt="yes"
  //       onError={mediaError}
  //     />
  //   );
  // console.log(image);

  // Venues content!

  return (
    <div>
      <div className={styles.visuallyHidden}>
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
              <div className={styles.card}>
                <div>
                  {venue.media == 0 ? (
                    <>
                      <img
                        className={styles.venueImage}
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
                                className={styles.venueImage}
                                src={image}
                                alt={image.name}
                                onError={mediaError}
                              />
                            </Carousel.Item>
                          );
                        })}
                      </Carousel>
                    </>
                  )}
                </div>
                <Link to={`/venue/${venue.id}`}>
                  <div className={styles.cardText}>
                    <h2 className={styles.cardTitle}>{venue.name}</h2>
                    <p>
                      <BsPersonFill /> {venue.maxGuests}
                    </p>
                    <span className={styles.price}>
                      <p>
                        NOK {venue.price} <br /> per night
                      </p>
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
