import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import UpdateVenueForm from "../../components/Forms/updateVenue";
import styles from "./updatevenue.module.css";

// Create Venue Function

export default function UpdateVenue() {
  return (
    <HelmetProvider>
      <div className={styles.pageWrapper}>
        <Helmet>
          <title>Holidaze | Update Venue</title>
          <link
            rel="icon"
            type="image/png"
            href="../../images/logo-mobile.png"
            sizes="16x16"
          />
        </Helmet>
        <div className={styles.card}>
          <h1 className={styles.titleCard}>Update Venue</h1>
          <div>
            <UpdateVenueForm />
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}
