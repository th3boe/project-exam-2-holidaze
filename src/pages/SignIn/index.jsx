import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button/";
import styles from "./signin.module.css";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (event.target.name === "email") {
      setEmail(value);
    }
    if (event.target.name === "password") {
      setPassword(value);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const signinForm = { email, password };

    const formValidate = {
      //   name:
      //     ? "The name value must not contain punctuation symbols apart from underscore (_)"
      //     : "",
      password:
        password.length < 8
          ? "Your password is required to be at least 8 characters"
          : "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "You have entered an invalid email address"
        : "",
      //   avatar:
      //     avatar.length < 3
      //       ? "The description is required to be at least 3 characters"
      //       : "",
    };

    if (Object.values(formValidate).some((error) => error !== "")) {
      setFormErrors(formValidate);
    } else {
      alert("Welcome!");
      navigate("/profile");

      console.log(signinForm);
      setEmail("");
      setPassword("");
      setFormErrors({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.titleCard}>Sign In</h1>
        <div>
          <form className={styles.form} onSubmit={handleFormSubmit}>
            <label htmlFor="email">Email</label>
            <input
              className={styles.inputSize}
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="name@example.com"
              pattern="^[\w\-.]+@(stud\.)?noroff\.no$"
              title="email needs to be stud.noroff.no or noroff.no"
              onChange={handleInputChange}
            />

            {formErrors.email && (
              <div className={styles.errorMessage}>{formErrors.email}</div>
            )}

            <label htmlFor="password">Password</label>
            <input
              className={styles.inputSize}
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Enter a password"
              onChange={handleInputChange}
            />

            {formErrors.password && (
              <div className={styles.errorMessage}>{formErrors.password}</div>
            )}
            <div className={styles.button}>
              <Button name={"Sign In"} />
            </div>
            <p className={styles.notMember}>
              Not a member yet?
              <Link to="/register"> Create new</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
