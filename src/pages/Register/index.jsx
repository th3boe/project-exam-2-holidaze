import React from "react";
import RegForm from "../../components/Forms/regForm.jsx";
import styles from "./register.module.css";

// Register Function

export default function Register() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.titleCard}>Join our Holidaze family</h1>
        <div>
          <RegForm />
        </div>
      </div>
    </div>
  );
}
