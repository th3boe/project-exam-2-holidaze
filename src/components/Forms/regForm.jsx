import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { API_HOLIDAZE_URL, TOKEN_AUTH } from "../../constants/api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../Button/";
import styles from "./form.module.css";

// URL

const action = "/register";
const method = "POST";

const URL = API_HOLIDAZE_URL + TOKEN_AUTH + action;

// Validation requirements

const schema = yup.object({
  name: yup
    .string()
    .min(1, "Your name must be more than 1 character")
    .max(20, "Your name cannot be more than 20 characters")
    .required("Please enter your first name"),
  email: yup
    .string()
    .email()
    .matches(
      /^[\w\-.]+@(stud\.)noroff\.no$/,
      "Enter a valid stud.noroff.no email address"
    ),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters")
    .required("Please enter a password"),
  avatar: yup.string().url("enter a valid image URL"),
  manager: yup.boolean(false),
});

// Registration function

export default function RegForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [submitForm, setSubmitForm] = useState(false);
  const [formError, setFormError] = useState(false);

  // Navigate to sign in when registered ok.

  const navigate = useNavigate();

  async function onSubmit(profile) {
    const body = JSON.stringify(profile);

    try {
      const response = await fetch(URL, {
        headers: {
          "Content-Type": "application/json",
        },
        method: method,
        body: body,
      });

      const result = await response.json();

      if (response.status === 201) {
        setSubmitForm(true);
        setFormError(false);
        navigate("/signin");
      }

      if (response.status !== 201) {
        setFormError(true);
        setSubmitForm(false);
        alert(
          "Something seems to have gone wrong - user may already exist.. Please feel free to try again."
        );
      }

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  // the return data.

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label} htmlFor="name">
          Name: *
        </label>
        <input
          className={styles.inputSize}
          type="text"
          name="name"
          placeholder="Enter your name"
          {...register("name")}
        />
        <p className={styles.errorInput}>{errors.name?.message}</p>
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
        <label className={styles.label} htmlFor="avatar">
          Avatar:
        </label>
        <input
          className={styles.inputSize}
          type="url"
          name="avatar"
          placeholder="Please enter image url"
          {...register("avatar")}
        />
        <p className={styles.errorInput}>{errors.avatar?.message}</p>

        <div>
          <p>Become a manager through Holidaze?</p>
          <label className={styles.switch}>
            <input
              type="checkbox"
              name="venueManager"
              onChange={(check) => !check}
              {...register("venueManager")}
            />{" "}
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.button}>
          <Button name={"Register"} type="submit" />
        </div>
        <p className={styles.member}>
          Already a member?
          <Link to="/signin"> Sign In here</Link>
        </p>
      </form>
    </div>
  );
}
