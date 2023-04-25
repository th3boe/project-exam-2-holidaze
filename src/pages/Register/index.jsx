import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button/";
import styles from "./register.module.css";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [check, setCheck] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    password: "",
    email: "",
  });

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (event.target.name === "name") {
      setName(value);
    }
    if (event.target.name === "password") {
      setPassword(value);
    }
    if (event.target.name === "email") {
      setEmail(value);
    }
    if (event.target.name === "avatar") {
      setAvatar(value);
    }
    if (event.target.name === "check") {
      setCheck(value);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const registrationForm = { name, password, email, avatar, check };

    const formValidate = {
      //   name:
      // name.length < 3
      //   ? "Full name is required to be at least 3 characters"
      //   : "",
      password:
        password.length < 8
          ? "Your password must be at least 8 characters"
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
      alert("Welcome to our Holidaze family");
      navigate("/signin");

      console.log(registrationForm);
      setName("");
      setPassword("");
      setEmail("");
      setAvatar("");
      setCheck("");
      setFormErrors({
        name: "",
        password: "",
        email: "",
      });
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.titleCard}>Join our Holidaze family</h1>
        <div>
          <form className={styles.form} onSubmit={handleFormSubmit}>
            <label htmlFor="name">Name</label>
            <input
              className={styles.inputSize}
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              pattern="^[\w]+$"
              maxLength={20}
              onChange={handleInputChange}
            />

            {formErrors.name && (
              <div className={styles.errorMessage}>{formErrors.name}</div>
            )}

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

            <label htmlFor="avatar">Avatar</label>
            <input
              className={styles.inputSize}
              type="URL"
              id="avatar"
              name="avatar"
              value={avatar}
              placeholder="Add avatar url"
              onChange={handleInputChange}
            />

            {formErrors.avatar && (
              <div className={styles.errorMessage}>{formErrors.avatar}</div>
            )}

            <div>
              <p>Become a manager through Holidaze?</p>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  value={check}
                  onChange={(e) => setCheck({ check: !check })}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
            <div className={styles.button}>
              <Button name={"Register"} />
            </div>
            <p className={styles.alreadyMember}>
              Already a member?
              <Link to="/signin"> Sign In here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
