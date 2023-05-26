import React, { useEffect, useState, useContext } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { API_HOLIDAZE_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../hooks/useAxios";
import { BsPersonFill } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import styles from "./venuesbyprofile.module.css";
import Carousel from "react-bootstrap/Carousel";
import PlaceholderImage from "../../images/placeholder.jpg";
import Button from "../../components/Button";

// URL

const action = "/profiles";
const method = "GET";

const URL = API_HOLIDAZE_URL + action;

// Venues function

export default function Venues() {
  const [profileVenues, setProfileVenues] = useState([]);
  const [loader, setLoader] = useState(false);
  const [upsError, setUpsError] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [authenticate] = useContext(AuthContext);
  const http = useAxios();

  // Error handling broken image.

  const mediaError = (e) => {
    e.target.src = PlaceholderImage;
  };

  // Navigation used for buttons.

  const navigate = useNavigate();
  const handleOnClickCreateVenue = () => {
    navigate("/createvenue");
  };
  const handleOnClickProfile = () => {
    navigate(`/profile/${authenticate.name}`);
  };
  const handleOnClickVenues = () => {
    navigate("/venues");
  };

  // GET venues for specific profile.

  useEffect(() => {
    async function getProfileVenues() {
      try {
        setUpsError(false);
        setLoader(true);

        const response = await http.get(URL + `/${authenticate.name}/venues`, {
          method,
        });

        setProfileVenues(response.data);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        setUpsError(true);
      }
    }

    getProfileVenues();
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
          <title>Holidaze | Venues by {authenticate.name}</title>
          <link
            rel="icon"
            type="image/png"
            href="/public/favicon.ico"
            sizes="16x16"
          />
        </Helmet>
        <div className={styles.topOfPage}>
          <div className={styles.searchPlacement}>
            <form>
              <label
                className={styles.labelSearch}
                htmlFor="search"
                alt="search-icon"
              >
                <BiSearchAlt />
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
          <div className={styles.title}>
            <h1>All {authenticate.name}'s Venues</h1>
          </div>
          <div>
            <Button
              name={"Create New"}
              onClick={() => handleOnClickCreateVenue()}
            />
            <Button
              name={"Return to Profile"}
              onClick={() => handleOnClickProfile()}
            />
            <Button name={"All Venues"} onClick={() => handleOnClickVenues()} />
          </div>
        </div>
        <div className={styles.cardContainer}>
          {profileVenues.length === 0 ? (
            <p>You currently have no venues to manage!</p>
          ) : (
            <>
              {profileVenues
                .filter((profilevenue) =>
                  profilevenue.name.toLowerCase().includes(searchValue)
                )
                .map((profilevenue) => (
                  <div key={profilevenue.id}>
                    <div className={styles.card}>
                      <div>
                        {profilevenue.media == 0 ? (
                          <>
                            <img
                              className={styles.venueImage}
                              src={PlaceholderImage}
                              alt="placeholder image"
                              onError={mediaError}
                            />
                          </>
                        ) : (
                          <>
                            {profilevenue.media.length === 1 ? (
                              <img
                                className={styles.venueImage}
                                src={profilevenue.media}
                                alt={profilevenue.name}
                                onError={mediaError}
                              />
                            ) : (
                              <Carousel>
                                {profilevenue.media.map((image, index) => {
                                  return (
                                    <Carousel.Item key={index}>
                                      <img
                                        className={styles.venueImage}
                                        src={image}
                                        alt={profilevenue.name}
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
                      <Link to={`/venue/${profilevenue.id}`}>
                        <div className={styles.cardText}>
                          <h2 className={styles.cardTitle}>
                            {profilevenue.name}
                          </h2>
                          <p>
                            <BsPersonFill /> {profilevenue.maxGuests}
                          </p>
                          <span className={styles.price}>
                            <p>
                              NOK {profilevenue.price} <br /> per night
                            </p>
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </HelmetProvider>
  );
}
