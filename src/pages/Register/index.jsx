import React from "react";
import RegForm from "../../components/Forms/regForm.jsx";
import Icon from "../../images/logo-mobile.png";
import styles from "./register.module.css";

// Register Function

export default function Register() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.titleCard}>Register</h1>
        <div className={styles.contentWrapper}>
          <div className={styles.cardContent}>
            <RegForm />
          </div>
          <div className={styles.cardContent}>
            <img src={Icon} alt="Holidaze Logo Icon" height="120vmin" />
            <h2>Join our Holidaze family</h2>
            <p>
              Do you want to become a customer to be able to rent all of the
              amazing venues that has been posted on our Holidaze page, then you
              have come to the right place.
            </p>
            <p>
              Or maybe you have your own amazing place to experience, and are
              looking for a platform to share it safely. We offer security to
              all who wish to become the next holidazer and rent out their
              properties through our website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
