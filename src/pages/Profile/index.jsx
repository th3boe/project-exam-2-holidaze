import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import { API_HOLIDAZE_URL } from "../../constants/api";
import Spinner from "react-bootstrap/Spinner";
import styles from "./profile.module.css";
import Button from "../../components/Button";

// URL

// const user = AuthContext();

// console.log(user.name);

const action = "/profiles";
const method = "GET";

// const URL = API_HOLIDAZE_URL + action;

// `/${name}`;

// Profile Function

export default function Profile() {
  // const [profile, setProfile] = useState();
  const [loader, setLoader] = useState(false);
  const [upsError, setUpsError] = useState(false);
  const [user, setUser] = useState([]);
  const [authenticate] = useContext(AuthContext);

  const navigate = useNavigate();
  const handleOnClickCreateVenue = () => {
    navigate("/createvenue");
  };

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

  useEffect(() => {
    async function getProfile() {
      // const user = JSON.parse(localStorage.getItem("user"));
      // if (user) {
      //   setUser(user);
      // }

      // const theUser = user.name;
      // console.log(theUser);

      // const apiEndpoint = action + `/${theUser}`;

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

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.informationCard}>
          <h1>
            <CgProfile /> {""}
            PROFILE
          </h1>
          <img className={styles.avatar} src={user.avatar} />
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

          <div>
            {user.venueManager === true ? (
              <div className={styles.profileText}>
                <p>
                  Please email with any queries at: <br /> {user.email}
                </p>
                <p>
                  You're signed in as a Venue Manager <br />
                  View the venues you manage, what is currently booked or maybe
                  create a new venue!
                </p>
                <Button name={"My Venues"} />
                <Button name={"Currently Booked"} />
                <Button
                  name={"Create New Venue"}
                  onClick={() => handleOnClickCreateVenue()}
                />
              </div>
            ) : (
              <div className={styles.profileText}>
                <p>You're signed in as a Customer</p>
                <p>
                  Want to see what upcoming amazingness you have to look forward
                  to? Click the below button to view your upcoming bookings! Or
                  maybe you wish to view other opportunities?
                </p>
                <Button name={"My Bookings"} />
                <Button name={"All Venues"} />
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
