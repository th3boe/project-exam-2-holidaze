import { Helmet, HelmetProvider } from "react-helmet-async";
import React from "react";
import SignInForm from "../../components/Forms/signinForm";
import styles from "./signin.module.css";

export default function SignIn() {
  return (
    <HelmetProvider>
      <div className={styles.pageWrapper}>
        <Helmet>
          <title>Holidaze | Sign In</title>
          <link
            rel="icon"
            type="image/png"
            href="/public/favicon.ico"
            sizes="16x16"
          />
        </Helmet>
        <div className={styles.card}>
          <h1 className={styles.titleCard}>Sign In</h1>
          <div>
            <SignInForm />
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}
