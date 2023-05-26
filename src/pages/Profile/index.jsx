import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RiImageEditLine } from "react-icons/ri";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../hooks/useAxios";
import { API_HOLIDAZE_URL } from "../../constants/api";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Spinner from "react-bootstrap/Spinner";
import styles from "./profile.module.css";
import Button from "../../components/Button";

// Schema for avatarURL validation.

const schema = yup.object({
  avatar: yup
    .string()
    .url("enter a valid image URL")
    .required("If you wish to update, enter a valid URL"),
});

// Profile

export default function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loader, setLoader] = useState(false);
  const [upsError, setUpsError] = useState(false);
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const [authenticate] = useContext(AuthContext);

  // Navigation for buttons!

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

  // Modal for avatar update.

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // URL

  const action = "/profiles";
  const actionEnd = "/media";
  const http = useAxios();

  const URL = `${API_HOLIDAZE_URL}${action}/${authenticate.name}`;
  const avatarURL = `${API_HOLIDAZE_URL}${action}/${authenticate.name}${actionEnd}`;

  // Get profile function.

  useEffect(() => {
    async function getProfile() {
      try {
        setUpsError(false);
        setLoader(true);

        const response = await http.get(URL);

        setUser(response.data);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        setUpsError(true);
      }
    }
    getProfile();
  }, []);

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

  // Function to update avatar URL.

  async function onSubmit(avatar) {
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

      if (response.status === 200) {
        window.location.reload(true);
      }
      return data;
    } catch {
      alert("Create a form failed..");
      console.log();
    }
  }

  // return data.

  return (
    <HelmetProvider>
      <div className={styles.pageWrapper}>
        <Helmet>
          <title>Holidaze | Profile</title>
          <link
            rel="icon"
            type="image/png"
            href="/public/favicon.ico"
            sizes="16x16"
          />
        </Helmet>
        <div className={styles.contentWrapper}>
          <div className={styles.informationCard}>
            <h1>PROFILE</h1>
            <>
              <div className={styles.avatarCard}>
                <div className={styles.updateAvatar}>
                  <Link onClick={handleShow}>
                    <span className={styles.update}>update</span>
                    <RiImageEditLine />
                  </Link>
                </div>
                <img
                  className={styles.avatar}
                  src={user.avatar}
                  alt={user.name}
                />
              </div>
              <h2>{user.name}</h2>

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
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}
