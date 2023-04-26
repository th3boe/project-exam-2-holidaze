import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { API_HOLIDAZE_URL, TOKEN_AUTH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import Button from "../Button/";
import styles from "./form.module.css";

// URL

const action = "/register";
const method = "POST";

const URL = API_HOLIDAZE_URL + TOKEN_AUTH + action;

// registration form

export default function RegistrationForm() {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [check, setCheck] = useState(false);

  //   const [register, setRegister] = useState({
  //     username: "",
  //     password: "",
  //     email: "",
  //     avatar: "",
  //   });

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [, setAuth] = useContext(AuthContext);

  //   useEffect(() => {
  //     async function onSubmit(yourProfile) {
  //       const body = JSON.stringify(yourProfile);

  //       try {
  //         const response = await fetch(URL, {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           method: method,
  //           body: body,
  //         });

  //         const result = await response.json();
  //         console.log(response);

  //         if (response.status === 201) {
  //           navigate("/signin");
  //         }

  //         if (response.status !== 201) {
  //           alert(
  //             "Something seems to have gone wrong - user may already exist.. Please feel free to try again."
  //           );
  //         }

  //         return result;
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }

  //     onSubmit();
  //   }, []);

  //   const [profile, setProfile] = useStorage({
  //     name: "",
  //     email: "",
  //     password: "",
  //     avatar: "",
  //     check: "",
  //   });

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (event.target.name === "username") {
      setUserName(value);
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
    //   if (event.target.name === "register") {
    //     setRegister(value);
    //   }
  };

  //   const handleInputChange = (e) => {
  //     const { id, value } = e.target;
  //     if (id === "username") {
  //       setUserName(value);
  //     }
  //     if (id === "password") {
  //       setPassword(value);
  //     }
  //     if (id === "email") {
  //       setEmail(value);
  //     }
  //     if (id === "avatar") {
  //       setAvatar(value);
  //     }
  //     if (id === "check") {
  //       setCheck(value);
  //     }
  //   };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const register = { username, password, email, avatar, check };

    const formValidate = {
      username:
        username.length < 1
          ? "Name is required and has to be less than 20 characters"
          : "",
      password:
        password.length < 8
          ? "Your password must be at least 8 characters"
          : "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Your email address need to be either stud.noroff.no or noroff.no"
        : "",
    };

    if (Object.values(formValidate).some((error) => error !== "")) {
      setFormErrors(formValidate);
    } else {
      alert("Welcome to our Holidaze family");
      // navigate("/signin");

      console.log(register);
      setUserName("");
      setPassword("");
      setEmail("");
      setAvatar("");
      setCheck(false);
      //   setRegister({
      //     username: "",
      //     email: "",
      //     password: "",
      //     avatar: "",
      //   });
      setFormErrors({
        username: "",
        password: "",
        email: "",
      });

      //   useStorage(registrationForm);
    }
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <label htmlFor="username">Name</label>
        <input
          className={styles.inputSize}
          type="text"
          id="username"
          name="username"
          value={username}
          placeholder="Enter your name"
          pattern="^[\w]+$"
          maxLength="20"
          onChange={handleInputChange}
        />

        {formErrors.username && (
          <div className={styles.errorMessage}>{formErrors.username}</div>
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
  );
}
