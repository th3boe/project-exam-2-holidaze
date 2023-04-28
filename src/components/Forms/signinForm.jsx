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
const method = "POST";

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

  const [submitForm, setSubmitForm] = useState(false);
  const [formError, setFormError] = useState(false);
  const [, setAuthenticate] = useContext(AuthContext);

  const navigate = useNavigate();

  async function onSubmit(data) {
    const options = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(URL, options);

      console.log(response.data);

      if (response.status === 200) {
        setSubmitForm(true);
        setFormError(false);
        setAuthenticate(response.data);
        navigate("/profile" + `/${response.data.name}`);
        console.log(response.data.name);
        console.log(response.data, "You're signed in");
      }

      if (response.status !== 200) {
        console.log(response.data, "NOT THIS TIME, SORRY");
        setFormError(true);
        setSubmitForm(false);
        alert("FAILURE ALERT! Your username and/or password is incorrect");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.inputSize}
        type="email"
        name="email"
        placeholder="Please enter your Email"
        {...register("email")}
      />
      <p className={styles.errorMessage}>{errors.email?.message}</p>
      <input
        className={styles.inputSize}
        type="password"
        name="password"
        placeholder="Please enter a password"
        {...register("password")}
      />
      <p className={styles.errorMessage}>{errors.password?.message}</p>
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
