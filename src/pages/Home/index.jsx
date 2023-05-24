import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.informationCard}>
        <h1 className={styles.title}>BECOME A HOLIDAZER</h1>
        <p>
          Maybe you! Like so many others are suffering from POST COVID
          depression, and wish to get out there. We offer amazing deals on
          places to stay while gathering new experiences outside your own home.
        </p>
        <p>
          You are free to browse all our venues without registering, however if
          you wish to book or create a venue, you can register or sign in via
          the navigation.
        </p>
        <p className={styles.allVenues}>
          Ready to travel again? {""}
          <Link to="/venues">Browse all our venues</Link>
        </p>
      </div>
      {/* <h1 className={styles.titleCard}>Join the Holidaze family</h1> */}
      <div className={styles.contentWrapper}>
        {/* <div className={styles.informationCard}>
          <h2>BECOME A MEMBER?</h2>
          <p>
            Maybe you! Like so many others are suffering from POST COVID
            depression, and wish to get out there. We offer amazing deals on
            places to stay while gathering new experiences outside your own
            home.
          </p>
          <p>
            You are free to browse all our venues without registering, however
            if you wish to book a lodge, you can register using the button below
            or via the dropdown menu later.
          </p>
          <Button name={"Venues"} />
          <Button name={"Registration"} />
        </div>
        <div className={styles.informationCard}>
          <h2>OR MANAGER?</h2>
          <p>
            Maybe you have your own amazing place to experience, and are looking
            for a platform to share it safely.
          </p>
          <p>Become a manager through Holidaze.</p>
          <Button name={"Registration"} />
        </div> */}
      </div>
    </div>
  );
}
