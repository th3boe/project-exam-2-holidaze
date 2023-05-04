import React from "react";
import CreateNewVenue from "../../components/Forms/createVenue";
import styles from "./createvenue.module.css";

// Create Venue Function

export default function CreateVenue() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.titleCard}>Create a Venue</h1>
        <div>
          <CreateNewVenue />
        </div>
      </div>
    </div>
  );
}
