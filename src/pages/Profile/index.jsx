import React from "react";
import { CgProfile } from "react-icons/cg";
import styles from "./profile.module.css";

export default function Profile() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.informationCard}>
          <h1>
            <CgProfile />
            Profile
          </h1>
          <p>this is your profile</p>
        </div>
      </div>
    </div>
  );
}
