import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import styles from "./home.module.css";

export default function Home() {
  // naviate to venue by button

  const navigate = useNavigate();
  const handleOnClickVenues = () => {
    navigate("/venues");
  };

  // return data.

  return (
    <HelmetProvider>
      <div className={styles.pageWrapper}>
        <Helmet>
          <title>Holidaze | Home</title>
          <link
            rel="icon"
            type="image/png"
            href="%PUBLIC_URL%/logo192.png"
            sizes="16x16"
          />
        </Helmet>

        <div className={styles.informationCard}>
          <h1 className={styles.title}>BECOME A HOLIDAZER</h1>
          <p>
            Maybe you! Like so many others are suffering from POST COVID
            depression, and wish to get out there. We offer amazing deals on
            places to stay while gathering new experiences outside your own
            home.
          </p>
          <p>
            You are free to browse all our venues without registering, however
            if you wish to book or create a venue, you can register or sign in
            via the navigation.
          </p>
          <p className={styles.allVenues}>
            Ready to travel again? {""}
            <br />
            <Button
              name={"Browse all our venues"}
              onClick={() => handleOnClickVenues()}
            />
          </p>
        </div>
      </div>
    </HelmetProvider>
  );
}
