import { useState, useContext } from "react";
import { API_HOLIDAZE_URL } from "../../constants/api";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Button from "../Button/";
import styles from "./form.module.css";

// URL

const action = "/venues";
const URL = API_HOLIDAZE_URL + action;

// Create venue function to be imported!

export default function CreateNewVenue() {
  const [authenticate] = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState([""]);
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [rating, setRating] = useState(0);
  const [meta, setMeta] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });
  const [location, setLocation] = useState({
    address: "Unknown",
    city: "Unknown",
    zip: "Unknown",
    country: "Unknown",
    continent: "Unknown",
    lat: 0,
    lng: 0,
  });
  const [formError, setFormError] = useState({
    title: "",
    description: "",
    media: [""],
    price: "",
    maxGuests: "",
    rating: "",
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

  // Navigation for when the venue has been created

  const navigate = useNavigate();

  // POST function

  async function handleFormSubmit(event) {
    event.preventDefault();

    const venueInfo = {
      name: title,
      description: description,
      media: media.length > 0 ? media : null,
      price: parseInt(price),
      maxGuests: parseInt(maxGuests),
      rating: parseInt(rating),
      meta: meta,
      location: location,
    };

    // Error handling for required inputs

    const errors = {
      name: title.length < 1 ? "Name is required" : "",
      description: description.length < 1 ? "A description is required" : "",
      price: price <= 0 ? "Price is required" : "",
      maxGuests:
        maxGuests < 1 || maxGuests > 100
          ? "A venue must accommodate at least one guest and less than 100"
          : "",
      rating: rating < 0 || rating > 5 ? "rating has to be between 0-5" : "",
    };

    if (Object.values(errors).some((err) => err !== "")) {
      setFormError(errors);
    } else {
      console.log(venueInfo);
    }

    try {
      const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(venueInfo),
        headers: {
          Authorization: `Bearer ${authenticate.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        navigate("/venues");
      }
    } catch {
      alert("Create a form failed..");
      console.log(formError);
    }
  }

  // Handle input for location and meta.

  const handleSpecialInputChange = (event) => {
    const { type, name, checked, value } = event.target;
    if (type === "checkbox") {
      setMeta({
        ...meta,
        [name]: checked,
      });
    } else {
      setLocation({
        ...location,
        [name]: value,
      });
    }
  };

  // Form details!

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
          value={title}
          placeholder="Enter venue name"
          onChange={(e) => setTitle(e.target.value)}
        />
        {formError.name && (
          <p className={styles.errorInput}>{formError.name}</p>
        )}

        <label className={styles.label} htmlFor="description">
          Description: *
        </label>
        <textarea
          className={styles.inputSize}
          type="text"
          id="description"
          rows={5}
          name="description"
          value={description}
          placeholder="Please enter a description of the venue"
          onChange={(e) => setDescription(e.target.value)}
        />
        {formError.description && (
          <p className={styles.errorInput}>{formError.description}</p>
        )}

        <label className={styles.label} htmlFor="media">
          Venue Images:
        </label>
        <input
          className={styles.inputSize}
          type="text"
          id="media"
          name="media"
          value={media}
          placeholder="Please enter one or more image urls"
          onChange={(e) => setMedia(e.target.value.split(","))}
        />

        <label className={styles.label} htmlFor="price">
          Price per night?: *
        </label>
        <input
          className={styles.inputSize}
          type="number"
          id="price"
          name="price"
          value={price}
          placeholder="Please enter price"
          onChange={(e) => setPrice(e.target.value)}
        />
        {formError.price && (
          <p className={styles.errorInput}>{formError.price}</p>
        )}

        <label className={styles.label} htmlFor="maxGuests">
          Max Amount of Guests: *
        </label>
        <input
          className={styles.inputSize}
          type="number"
          id="maxGuests"
          name="maxGuests"
          value={maxGuests}
          placeholder="Please enter guest amount"
          onChange={(e) => setMaxGuests(e.target.value)}
        />
        {formError.maxGuests && (
          <p className={styles.errorInput}>{formError.maxGuests}</p>
        )}

        <label className={styles.label} htmlFor="rating">
          Venue Rating:
        </label>
        <input
          className={styles.inputSize}
          type="number"
          id="rating"
          name="rating"
          value={rating}
          placeholder="Please rate venue"
          onChange={(e) => setRating(e.target.value)}
        />
        {formError.rating && (
          <p className={styles.errorInput}>{formError.rating}</p>
        )}

        <p>Details:</p>

        <div className={styles.meta}>
          <div>
            <p>WiFi?</p>
            <label className={styles.switch}>
              <input
                type="checkbox"
                name="wifi"
                checked={meta.wifi}
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
                checked={meta.parking}
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
                checked={meta.breakfast}
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
                checked={meta.pets}
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
            value={location.address}
            placeholder="Please enter address"
            onChange={handleSpecialInputChange}
          />
          <label className={styles.label} htmlFor="city">
            City:
          </label>
          <input
            className={styles.inputSize}
            type="text"
            id="city"
            name="city"
            value={location.city}
            placeholder="Please enter city"
            onChange={handleSpecialInputChange}
          />
          <label className={styles.label} htmlFor="zip">
            Zip:
          </label>
          <input
            className={styles.inputSize}
            type="text"
            id="zip"
            name="zip"
            value={location.zip}
            placeholder="Please enter zip"
            onChange={handleSpecialInputChange}
          />
          <label className={styles.label} htmlFor="country">
            Country:
          </label>
          <input
            className={styles.inputSize}
            type="text"
            id="country"
            name="country"
            value={location.country}
            placeholder="Please enter country"
            onChange={handleSpecialInputChange}
          />
          <label className={styles.label} htmlFor="continent">
            Continent:
          </label>
          <input
            className={styles.inputSize}
            type="text"
            id="continent"
            name="continent"
            value={location.continent}
            placeholder="Please enter continent"
            onChange={handleSpecialInputChange}
          />
          <label className={styles.label} htmlFor="lat">
            Lat:
          </label>
          <input
            className={styles.inputSize}
            type="number"
            id="lat"
            name="lat"
            value={location.lat}
            placeholder="Please enter lat"
            onChange={handleSpecialInputChange}
          />
          <label className={styles.label} htmlFor="lng">
            Lng:
          </label>
          <input
            className={styles.inputSize}
            type="number"
            id="lng"
            name="lng"
            value={location.lng}
            placeholder="Please enter lng"
            onChange={handleSpecialInputChange}
          />
        </div>
        <div className={styles.button}>
          <Button name={"Create Venue"} type="submit" />
        </div>
      </form>
    </div>
  );
}
