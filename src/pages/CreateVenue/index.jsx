import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import CreateNewVenue from "../../components/Forms/createVenue";
import styles from "./createvenue.module.css";

// Create Venue Function

export default function CreateVenue() {
  return (
    <HelmetProvider>
      <div className={styles.pageWrapper}>
        <Helmet>
          <title>Holidaze | Create Venue</title>
          <link
            rel="icon"
            type="image/png"
            href="../../images/logo-mobile.png"
            sizes="16x16"
          />
        </Helmet>
        <div className={styles.card}>
          <h1 className={styles.titleCard}>Create a Venue</h1>
          <div>
            <CreateNewVenue />
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}
