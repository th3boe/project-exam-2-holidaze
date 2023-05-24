import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { RiImageEditLine } from "react-icons/ri";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import { API_HOLIDAZE_URL } from "../../constants/api";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Spinner from "react-bootstrap/Spinner";
import styles from "./profile.module.css";
import Button from "../../components/Button";

// URL

// const user = AuthContext();

// console.log(user.name);

const action = "/profiles";
const method = "GET";

const actionEnd = "/media";

// const URL = API_HOLIDAZE_URL + action;

const schema = yup.object({
  avatar: yup
    .string()
    .url("enter a valid image URL")
    .required("If you wish to update, enter a valid URL"),
});

// `/${name}`;

// Profile Function

export default function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const [profile, setProfile] = useState();
  const [loader, setLoader] = useState(false);
  const [upsError, setUpsError] = useState(false);
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const [authenticate] = useContext(AuthContext);

  const navigate = useNavigate();
  const handleOnClickCreateVenue = () => {
    navigate("/createvenue");
  };
  const handleOnClickMyVenues = () => {
    navigate("/profile" + `/${authenticate.name}` + "/venues");
  };
  const handleOnClickAllVenues = () => {
    navigate("/venues");
  };
  const handleOnClickMyBookings = () => {
    navigate("/profile" + `/${authenticate.name}` + "/bookings");
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user) {
  //     setUser(user);
  //   }
  // }, []);

  // // Object.entries(localStorage).map(([key, valueJSON]) => {
  // //   const value = JSON.parse(valueJSON);
  // //   console.log(value.name);
  // // });
  // console.log(user.name);
  // const theUser = user.name;

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user) {
  //     setUser(user);
  //   }
  // }, []);

  // console.log(user.name);
  // const theUser = user.name;

  // console.log(theUser);

  const http = useAxios();
  const axios = useAxios();
  const URL = `${API_HOLIDAZE_URL}${action}/${authenticate.name}`;
  const avatarURL = `${API_HOLIDAZE_URL}${action}/${authenticate.name}${actionEnd}`;

  useEffect(() => {
    async function getProfile() {
      try {
        setUpsError(false);
        setLoader(true);

        const response = await http.get(URL);
        console.log("hello", response.data.name);
        // const result = await axios.get(URL);

        setUser(response.data);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        setUpsError(true);
      }
    }
    getProfile();
  }, []);

  // useEffect(() => {
  //   async function Hello() {
  //     try {
  //       const response = await http.get(apiEndpoint);
  //       console.log(response);
  //       // set data
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   Hello();
  // }, []);

  //   async function getProfile(user) {
  //     // const options = {
  //     //   email: user.email,
  //     //   password: user.password,
  //     // };
  //     const body = JSON.stringify(user);
  //     // const options = {
  //     //   headers: {
  //     //     Authorization: "Bearer " + accessToken,
  //     //   },
  //     // };

  //     try {
  //       setUpsError(false);
  //       setLoader(true);

  //       console.log(theUser);

  //       // const response = await axios.get(URL + `/${theUser}`);
  //       // console.log(config);

  //       const response = await fetch(URL + `/${theUser}`, {
  //         options,
  //         method: method,
  //         body: body,
  //       });
  //       const profileInfo = await response.json();

  //       // const response = await axios.get(URL + `/${user.name}`,  headers: {
  //       //   "Content-Type": "application/json",
  //       // });
  //       console.log(profileInfo);

  //       // const response = await fetch(URL + `/${user.name}`, { method });

  //       setProfile(profileInfo);
  //       setLoader(false);
  //     } catch (error) {
  //       setLoader(false);
  //       setUpsError(true);
  //     }
  //   }

  //   getProfile();
  // }, []);

  // Content for the above try and catch!

  if (loader) {
    return (
      <div className={styles.loader}>
        <Spinner animation="border" />
        Loading profile...
      </div>
    );
  }

  if (upsError) {
    return (
      <div className={styles.errorMessage}>
        Oh no, seems we could not load your profile information..
      </div>
    );
  }

  // const [authenticate, setAuthenticate] = useContext(AuthContext);

  // const user = (authenticate = () => {
  //   "Profile";
  // });
  // // const userName = user.name;

  // console.log(user);
  // const [myLocalStorageData, setMyLocalStorageData] = useState({});
  // useEffect(() => {
  //   //logic for getting a value from local storage stored under the key 'key'
  //   const data = localStorage.getItem("key");
  //   setMyLocalStorageData(JSON.parse(data));
  //   console.log(data);
  // }, []);

  // {
  //   Object.entries(localStorage).map(([key, valueJSON]) => {
  //     const value = JSON.parse(valueJSON);

  async function onSubmit(avatar) {
    // event.preventDefault();

    // const venueInfo = {
    //   name: title,
    //   description: description,
    //   media: images,
    //   price: parseInt(price),
    //   maxGuests: parseInt(maxGuests),
    //   rating: parseInt(rating),
    //   meta: meta,
    //   location: location,
    // };
    // const avatar = {
    //   avatar: avatar,
    // };
    // console.log(venueInfo);
    // console.log(images);

    // const test = JSON.stringify(venueInfo);
    // console.log(typeof test);

    // const newVenueInfo = JSON.parse(test);
    // console.log(typeof newVenueInfo);

    // const errors = {
    //   //   name: title.length < 1 ? "Name is required" : "",
    //   //   description: description.length < 1 ? "A description is required" : "",
    // };

    // if (Object.values(errors).some((err) => err !== "")) {
    //   setFormError(errors);
    // } else {
    //   alert("Thank you for creating a form!");

    //   //   console.log(venueInfo);
    // }

    try {
      const response = await fetch(avatarURL, {
        method: "PUT",
        body: JSON.stringify(avatar),
        headers: {
          Authorization: `Bearer ${authenticate.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      console.log(data, avatar);

      if (response.status === 200) {
        window.location.reload(true);
        // navigate("/venue/" + `${id}`);
      }
      return data;
    } catch {
      alert("Create a form failed..");
      console.log();
    }
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.informationCard}>
          <h1>PROFILE</h1>
          <>
            <div className={styles.avatarCard}>
              <div className={styles.updateAvatar}>
                <Link
                  // to={"/updateavatar/" + `${authenticate.name}`}
                  onClick={handleShow}
                >
                  <RiImageEditLine />
                </Link>
              </div>
              <img className={styles.avatar} src={user.avatar} />
            </div>
            <h2>{user.name}</h2>
            <div>
              {/* <p>
              Please email with any queries at: <br /> {user.email}
            </p> */}
              {/* <p>
              You're logged in as{" "}
              {user.venueManager === true ? "Venue Manager" : "Customer"}
            </p> */}
            </div>

            {/* <Button
              name={"Launch static backdrop modal"}
              onClick={handleShow}
            /> */}

            <Modal
              variant="dark"
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              className={styles.modalBg}
            >
              <Modal.Header closeButton>
                <Modal.Title>Update Avatar Image</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form
                  className={styles.form}
                  id="avatar"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <label className={styles.label} htmlFor="avatar">
                    New Avatar Url:
                  </label>
                  <input
                    className={styles.inputSize}
                    type="url"
                    name="avatar"
                    placeholder="Please enter image url"
                    {...register("avatar")}
                  />
                  <p>{errors.avatar?.message}</p>
                  <div className={styles.avatarModalBtn}>
                    <Button name={"Save"} type="submit" />
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </>

          <div>
            {user.venueManager === true ? (
              <div className={styles.profileText}>
                <p>
                  Email: <br /> {user.email}
                </p>
                <p>
                  You're signed in as a Venue Manager <br />
                  {/* View the venues you manage, or create a new venue! */}
                </p>
                <Button
                  name={"My Venues"}
                  onClick={() => handleOnClickMyVenues()}
                />
                <Button
                  name={"Create New"}
                  onClick={() => handleOnClickCreateVenue()}
                />
                <Button
                  name={"Upcoming Bookings"}
                  onClick={() => handleOnClickMyBookings()}
                />
              </div>
            ) : (
              <div className={styles.profileText}>
                <p>You're signed in as a Customer</p>
                {/* <p>
                  Want to see what upcoming amazingness you have to look forward
                  to? Click the below button to view your upcoming bookings! Or
                  maybe you wish to view other opportunities?
                </p> */}
                <Button
                  name={"Upcoming Bookings"}
                  onClick={() => handleOnClickMyBookings()}
                />
                <Button
                  name={"Find a Venue"}
                  onClick={() => handleOnClickAllVenues()}
                />
              </div>
            )}
          </div>

          {/* <p>
            {user._count.venues} Venues | {user._count.bookings} Bookings
          </p> */}
        </div>
      </div>
    </div>
  );

  //});
}
