import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { API_HOLIDAZE_URL, TOKEN_AUTH } from "../../constants/api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import Button from "../Button/";
import styles from "./form.module.css";

// URL

const action = "/login";
const navigateAction = "/profile";
const URL = API_HOLIDAZE_URL + TOKEN_AUTH + action;

// Validation requirements

const schema = yup
  .object({
    email: yup
      .string()
      .email()
      .matches(
        /^[\w\-.]+@(stud\.)?noroff\.no$/,
        "Enter a valid stud.noroff.no or noroff.no email address"
      ),
    password: yup
      .string()
      .min(8, "Your password must be at least 8 characters")
      .required("Please enter a password"),
  })
  .required();

// Sign In function

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [, setSubmitForm] = useState(false);
  const [, setFormError] = useState(false);
  const [, setAuthenticate] = useContext(AuthContext);

  // Navigate to Profile when sign in response ok.

  const navigate = useNavigate();

  // POST function for signin.

  async function onSubmit(data) {
    const options = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(URL, options);

      console.log(response.name);

      if (response.status === 200) {
        setSubmitForm(true);
        setFormError(false);
        setAuthenticate(response.data);
        navigate(navigateAction + `/${response.data.name}`);
      }

      if (response.status !== 200) {
        setFormError(true);
        setSubmitForm(false);
        alert("FAILURE ALERT! Your username and/or password is incorrect");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // return form data.

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label} htmlFor="email">
        Email: *
      </label>
      <input
        className={styles.inputSize}
        type="email"
        name="email"
        placeholder="Please enter your Email"
        {...register("email")}
      />
      <p className={styles.errorInput}>{errors.email?.message}</p>
      <label className={styles.label} htmlFor="password">
        Password: *
      </label>
      <input
        className={styles.inputSize}
        type="password"
        name="password"
        placeholder="Please enter a password"
        {...register("password")}
      />
      <p className={styles.errorInput}>{errors.password?.message}</p>
      <div className={styles.button}>
        <Button name={"Sign In"} type="submit" />
      </div>
      <p className={styles.member}>
        Not a member yet?
        <Link to="/register"> Create new</Link>
      </p>
    </form>
  );
}
