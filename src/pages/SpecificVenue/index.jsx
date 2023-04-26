import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_HOLIDAZE_URL } from "../../constants/api";
import Button from "../../components/Button";
import styles from "./venue.module.css";

// URL

const action = "/venues";
const method = "GET";

const venueURL = API_HOLIDAZE_URL + action;

// Product Page function

export default function SpecificVenue() {
  const [venue, setVenue] = useState(null);
  const [loader, setLoader] = useState(false);
  const [upsError, setUpsError] = useState(false);

  // useEffect to find venue that has been clicked!

  let { id } = useParams();

  useEffect(() => {
    async function getVenue() {
      try {
        setLoader(true);
        setUpsError(false);

        const response = await fetch(venueURL + `/${id}`, { method });
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
    return <div className={styles.loader}></div>;
  }

  if (upsError) {
    return (
      <div className={styles.errorMessage}>
        Oh no.. There seems to be a problem, please hang on while we look into
        it!
      </div>
    );
  }

  return (
    <div>
      <h1>{venue.name}</h1>
    </div>
  );
}
