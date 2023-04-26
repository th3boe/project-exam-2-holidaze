import React from "react";
import RegistrationForm from "../../components/Forms/registrationForm.jsx";
import styles from "./register.module.css";

// Register Function

export default function Register() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.titleCard}>Join our Holidaze family</h1>
        <div>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
