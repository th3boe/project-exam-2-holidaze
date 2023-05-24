import React from "react";
import UpdateVenueForm from "../../components/Forms/updateVenue";
import styles from "./updatevenue.module.css";

// Create Venue Function

export default function UpdateVenue() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.titleCard}>Update Venue</h1>
        <div>
          <UpdateVenueForm />
        </div>
      </div>
    </div>
  );
}
