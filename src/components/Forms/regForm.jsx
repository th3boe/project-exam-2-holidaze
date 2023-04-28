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
    .min(1)
    .max(20, "Your name cannot be more than 20 character")
    .required("Please enter your first name"),
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

  //   const [manager, setManager] = useState(false);
  const [submitForm, setSubmitForm] = useState(false);
  const [formError, setFormError] = useState(false);

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
        console.log(profile, result, "YOU'RE GOLDEN!");
        navigate("/signin");
      }

      if (response.status !== 201) {
        console.log(profile, result, "NOT THIS TIME, SORRY");
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

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.inputSize}
          type="text"
          name="name"
          placeholder="Enter your name"
          {...register("name")}
        />
        <p>{errors.name?.message}</p>
        <input
          className={styles.inputSize}
          type="email"
          name="email"
          placeholder="Please enter your Email"
          {...register("email")}
        />
        <p>{errors.email?.message}</p>
        <input
          className={styles.inputSize}
          type="password"
          name="password"
          placeholder="Please enter a password"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
        <input
          className={styles.inputSize}
          type="url"
          name="avatar"
          placeholder="Please enter image url"
          {...register("avatar")}
        />
        <p>{errors.avatar?.message}</p>

        <div>
          <p>Become a manager through Holidaze?</p>
          <label className={styles.switch}>
            <input
              type="checkbox"
              name="venueManager"
              //   onChange={(e) => setManager({ manager: !manager })}
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
