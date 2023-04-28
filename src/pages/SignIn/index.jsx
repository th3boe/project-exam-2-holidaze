import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button/";
import SignInForm from "../../components/Forms/signinForm";
import styles from "./signin.module.css";

export default function SignIn() {
  // const navigate = useNavigate();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [formErrors, setFormErrors] = useState({
  //   email: "",
  //   password: "",
  // });

  // const handleInputChange = (event) => {
  //   const value = event.target.value;
  //   if (event.target.name === "email") {
  //     setEmail(value);
  //   }
  //   if (event.target.name === "password") {
  //     setPassword(value);
  //   }
  // };

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   const signinForm = { email, password };

  //   const formValidate = {
  //       name:
  //         ? "The name value must not contain punctuation symbols apart from underscore (_)"
  //         : "",
  //     password:
  //       password.length < 8
  //         ? "Your password is required to be at least 8 characters"
  //         : "",
  //     email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  //       ? "You have entered an invalid email address"
  //       : "",
  //       avatar:
  //         avatar.length < 3
  //           ? "The description is required to be at least 3 characters"
  //           : "",
  //   };

  //   if (Object.values(formValidate).some((error) => error !== "")) {
  //     setFormErrors(formValidate);
  //   } else {
  //     alert("Welcome!");
  //     navigate("/profile");

  //     console.log(signinForm);
  //     setEmail("");
  //     setPassword("");
  //     setFormErrors({
  //       email: "",
  //       password: "",
  //     });
  //   }
  // };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.titleCard}>Sign In</h1>
        <div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
