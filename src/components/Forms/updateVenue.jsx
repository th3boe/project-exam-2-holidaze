import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_HOLIDAZE_URL } from "../../constants/api";

import AuthContext from "../../context/AuthContext";
import Button from "../Button/";
import styles from "./form.module.css";

// URL

const action = "/venues";
const URL = API_HOLIDAZE_URL + action;

// Update function.

export default function UpdateVenueFrom(props) {
  const [authenticate] = useContext(AuthContext);
  const [venue, setVenue] = useState({
    title: "",
    description: "",
    images: [""],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "Unknown",
      city: "Unknown",
      zip: "Unknown",
      country: "Unknown",
      continent: "Unknown",
      lat: 0,
      lng: 0,
    },
  });

  const [formError, setFormError] = useState({
    title: "",
    description: "",
    images: [""],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "Unknown",
      city: "Unknown",
      zip: "Unknown",
      country: "Unknown",
      continent: "Unknown",
      lat: 0,
      lng: 0,
    },
  });

  // ID to get specific venue information.

  let { id } = useParams();

  // Navigate to venue when updated.

  const navigate = useNavigate();

  // GET old data from the venue that is being updated.

  useEffect(() => {
    const response = fetch(URL + `/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authenticate.accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setVenue(data));
  }, [id]);

  // Update (PUT) function.

  async function handleFormSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(URL + `/${id}`, {
        method: "PUT",
        body: JSON.stringify(venue),
        headers: {
          Authorization: `Bearer ${authenticate.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        navigate("/venue/" + `${id}`);
      }
      return data;
    } catch {
      alert("Create a form failed..");
      console.log(formError);
    }
  }

  // handle input - gathering old data.

  const handleSpecialInputChange = (event) => {
    const { type, name, checked, value } = event.target;
    if (type === "number") {
      setVenue((prevVenue) => ({ ...prevVenue, [name]: Number(value) }));
    } else if (type === "checkbox") {
      setVenue((prevVenue) => ({
        ...prevVenue,
        meta: {
          ...prevVenue.meta,
          [name]: checked,
        },
      }));
    } else {
      setVenue((prevVenue) => ({ ...prevVenue, [name]: value }));
    }
  };

  // return form data.

  return (
    <div>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <label className={styles.label} htmlFor="name">
          Name: *
        </label>
        <input
          className={styles.inputSize}
          type="text"
          id="name"
          name="name"
          value={venue.name || ""}
          placeholder="Enter venue name"
          onChange={handleSpecialInputChange}
        />
        <label className={styles.label} htmlFor="description">
          Description: *
        </label>
        <textarea
          className={styles.inputSize}
          type="text"
          id="description"
          rows={5}
          name="description"
          value={venue.description || ""}
          placeholder="Please enter a description of the venue"
          onChange={handleSpecialInputChange}
        />
        <label className={styles.label} htmlFor="images">
          Venue Images:
        </label>
        <input
          className={styles.inputSize}
          type="text"
          id="images"
          name="images"
          value={venue.media || [""]}
          placeholder="Please enter one or more image urls"
          onChange={(e) =>
            setVenue((prevVenue) => ({
              ...prevVenue,
              media: e.target.value.split(","),
            }))
          }
        />
        <label className={styles.label} htmlFor="price">
          Price per night?: *
        </label>
        <input
          className={styles.inputSize}
          type="number"
          id="price"
          name="price"
          value={venue.price || ""}
          placeholder="Please enter price"
          onChange={handleSpecialInputChange}
        />
        <label className={styles.label} htmlFor="maxGuests">
          Max Amount of Guests: *
        </label>
        <input
          className={styles.inputSize}
          type="number"
          id="maxGuests"
          name="maxGuests"
          value={venue.maxGuests || ""}
          placeholder="Please enter guest amount"
          onChange={handleSpecialInputChange}
        />
        <label className={styles.label} htmlFor="rating">
          Venue Rating:
        </label>
        <input
          className={styles.inputSize}
          type="number"
          id="rating"
          name="rating"
          value={venue.rating || ""}
          min="0"
          max="5"
          placeholder="Please rate venue"
          onChange={handleSpecialInputChange}
        />

        <p>Details:</p>

        <div className={styles.meta}>
          <div>
            <p>WiFi?</p>
            <label className={styles.switch}>
              <input
                type="checkbox"
                name="wifi"
                checked={venue.meta.wifi}
                onChange={handleSpecialInputChange}
              />{" "}
              <span className={styles.slider}></span>
            </label>
          </div>
          <div>
            <p>Parking?</p>
            <label className={styles.switch}>
              <input
                type="checkbox"
                name="parking"
                checked={venue.meta.parking}
                onChange={handleSpecialInputChange}
              />{" "}
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        <div className={styles.meta}>
          <div>
            <p>Breakfast?</p>
            <label className={styles.switch}>
              <input
                type="checkbox"
                name="breakfast"
                checked={venue.meta.breakfast}
                onChange={handleSpecialInputChange}
              />{" "}
              <span className={styles.slider}></span>
            </label>
          </div>
          <div>
            <p>Pets?</p>
            <label className={styles.switch}>
              <input
                type="checkbox"
                name="pets"
                checked={venue.meta.pets}
                onChange={handleSpecialInputChange}
              />{" "}
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        <div className={styles.addressForm}>
          <p>If you wish to add location details, you can add this below:</p>

          <label className={styles.label} htmlFor="address">
            Address:
          </label>
          <input
            className={styles.inputSize}
            type="text"
            id="address"
            name="address"
            value={venue.location.address || ""}
            placeholder="Please enter address"
            onChange={(e) =>
              setVenue((prevVenue) => ({
                ...prevVenue,
                location: {
                  ...prevVenue.location,
                  address: e.target.value,
                },
              }))
            }
          />
          <label className={styles.label} htmlFor="city">
            City:
          </label>
          <input
            className={styles.inputSize}
            type="text"
            id="city"
            name="city"
            value={venue.location.city || ""}
            placeholder="Please enter city"
            onChange={(e) =>
              setVenue((prevVenue) => ({
                ...prevVenue,
                location: {
                  ...prevVenue.location,
                  city: e.target.value,
                },
              }))
            }
          />
          <label className={styles.label} htmlFor="zip">
            Zip:
          </label>
          <input
            className={styles.inputSize}
            type="text"
            id="zip"
            name="zip"
            value={venue.location.zip || ""}
            placeholder="Please enter zip"
            onChange={(e) =>
              setVenue((prevVenue) => ({
                ...prevVenue,
                location: {
                  ...prevVenue.location,
                  zip: e.target.value,
                },
              }))
            }
          />
          <label className={styles.label} htmlFor="country">
            Country:
          </label>
          <input
            className={styles.inputSize}
            type="text"
            id="country"
            name="country"
            value={venue.location.country || ""}
            placeholder="Please enter country"
            onChange={(e) =>
              setVenue((prevVenue) => ({
                ...prevVenue,
                location: {
                  ...prevVenue.location,
                  country: e.target.value,
                },
              }))
            }
          />
          <label className={styles.label} htmlFor="continent">
            Continent:
          </label>
          <input
            className={styles.inputSize}
            type="text"
            id="continent"
            name="continent"
            value={venue.location.continent || ""}
            placeholder="Please enter continent"
            onChange={(e) =>
              setVenue((prevVenue) => ({
                ...prevVenue,
                location: {
                  ...prevVenue.location,
                  continent: e.target.value,
                },
              }))
            }
          />
          <label className={styles.label} htmlFor="lat">
            Lat:
          </label>
          <input
            className={styles.inputSize}
            type="number"
            id="lat"
            name="lat"
            value={venue.location.lat || ""}
            placeholder="Please enter lat"
            onChange={(e) =>
              setVenue((prevVenue) => ({
                ...prevVenue,
                location: {
                  ...prevVenue.location,
                  lat: Number(e.target.value),
                },
              }))
            }
          />
          <label className={styles.label} htmlFor="lng">
            Lng:
          </label>
          <input
            className={styles.inputSize}
            type="number"
            id="lng"
            name="lng"
            value={venue.location.lng || ""}
            placeholder="Please enter lng"
            onChange={(e) =>
              setVenue((prevVenue) => ({
                ...prevVenue,
                location: {
                  ...prevVenue.location,
                  lng: Number(e.target.value),
                },
              }))
            }
          />
        </div>
        <div className={styles.button}>
          <Button name={"Update"} type="submit" />
        </div>
      </form>
    </div>
  );
}
