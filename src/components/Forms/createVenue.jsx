import { useState, useContext } from "react";
import { API_HOLIDAZE_URL } from "../../constants/api";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Button from "../Button/";
import styles from "./form.module.css";

// URL

const action = "/venues";
// const method = "POST";
const URL = API_HOLIDAZE_URL + action;

export default function CreateNewVenue() {
  const [authenticate] = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([""]);
  const [price, setPrice] = useState(0);
  const [maxGuests, setMaxGuests] = useState(0);
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
  const http = useAxios();
  const navigate = useNavigate();

  async function handleFormSubmit(event) {
    //   const handleFormSubmit = async (event) => {
    event.preventDefault();

    // venue.status = "publish";

    // console.log(venue);

    const venueInfo = {
      name: title,
      description: description,
      media: images,
      price: parseInt(price),
      maxGuests: parseInt(maxGuests),
      rating: parseInt(rating),
      meta: meta,
      location: location,
    };

    console.log(venueInfo);
    console.log(images);

    const test = JSON.stringify(venueInfo);
    console.log(typeof test);

    const newVenueInfo = JSON.parse(test);
    console.log(typeof newVenueInfo);

    const errors = {
      name: title.length < 1 ? "Name is required" : "",
      description: description.length < 1 ? "A description is required" : "",
    };

    if (Object.values(errors).some((err) => err !== "")) {
      setFormError(errors);
    } else {
      console.log(venueInfo);
    }

    // const theVenueInfo = JSON.stringify(venueInfo);

    // const options = {
    //   body: JSON.stringify(venueInfo),
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${authenticate.accessToken}`,
    //   },
    // };

    try {
      const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(venueInfo),
        headers: {
          Authorization: `Bearer ${authenticate.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data, venueInfo);

      //   const response = await http.post("/wp/v2/posts", venue);
      //   console.log("response", response);
      if (response.status === 201) {
        navigate("/venues");
      }
      return data;
    } catch {
      alert("Create a form failed..");
      console.log(formError);
    }
  }

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
          //   onChange={handleInputChange}
          onChange={(e) => setTitle(e.target.value)}
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
          value={description}
          placeholder="Please enter a description of the venue"
          //   onChange={handleInputChange}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className={styles.label} htmlFor="images">
          Venue Images:
        </label>
        <input
          className={styles.inputSize}
          type="text"
          id="images"
          name="images"
          value={images}
          placeholder="Please enter one or more image urls"
          //   onChange={handleInputChange}
          onChange={(e) => setImages(e.target.value.split(","))}
        />
        {/* <label className={styles.label} htmlFor="media">
          Venue Images:
        </label>
        <input
          className={styles.inputSize}
          type="text"
          id="media"
          name="media"
          value={images}
          placeholder="Please enter one or more image urls"
          //   onChange={handleInputChange}
          onChange={(e) => setImages(e.target.value)}
        /> */}
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
          //   onChange={handleInputChange}
          onChange={(e) => setPrice(e.target.value)}
        />
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
          //   onChange={handleInputChange}
          onChange={(e) => setMaxGuests(e.target.value)}
        />
        <label className={styles.label} htmlFor="rating">
          Venue Rating:
        </label>
        <input
          className={styles.inputSize}
          type="number"
          id="rating"
          name="rating"
          value={rating}
          min="0"
          max="5"
          placeholder="Please rate venue"
          //   onChange={handleInputChange}
          onChange={(e) => setRating(e.target.value)}
        />

        <p>Details:</p>

        <div className={styles.meta}>
          <div>
            <p>WiFi?</p>
            <label className={styles.switch}>
              <input
                type="checkbox"
                name="wifi"
                checked={meta.wifi}
                // onChange={handleInputChange}
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
                // onChange={handleInputChange}
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
                // onChange={handleInputChange}
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
                // onChange={handleInputChange}
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
            // onChange={handleInputChange}
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
            // onChange={handleInputChange}
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
            // onChange={handleInputChange}
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
            // onChange={handleInputChange}
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
            // onChange={handleInputChange}
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
            // onChange={handleInputChange}
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
            // onChange={handleInputChange}
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
