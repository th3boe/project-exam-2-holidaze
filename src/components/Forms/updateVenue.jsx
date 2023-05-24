import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_HOLIDAZE_URL } from "../../constants/api";
import useAxios from "../../hooks/useAxios";

import AuthContext from "../../context/AuthContext";
import Button from "../Button/";
import styles from "./form.module.css";

// URL

const action = "/venues";
// const method = "POST";
const URL = API_HOLIDAZE_URL + action;

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
  //   const [title, setTitle] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [images, setImages] = useState([""]);
  //   const [price, setPrice] = useState(0);
  //   const [maxGuests, setMaxGuests] = useState(0);
  //   const [rating, setRating] = useState(0);
  //   const [meta, setMeta] = useState({
  //     wifi: false,
  //     parking: false,
  //     breakfast: false,
  //     pets: false,
  //   });
  //   const [location, setLocation] = useState({
  //     address: "Unknown",
  //     city: "Unknown",
  //     zip: "Unknown",
  //     country: "Unknown",
  //     continent: "Unknown",
  //     lat: 0,
  //     lng: 0,
  //   });
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
  let { id } = useParams();
  const navigate = useNavigate();

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

  console.log(venue);

  async function handleFormSubmit(event) {
    event.preventDefault();

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
      const response = await fetch(URL + `/${id}`, {
        method: "PUT",
        body: JSON.stringify(venue),
        headers: {
          Authorization: `Bearer ${authenticate.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      console.log(data, venue);

      if (response.status === 200) {
        navigate("/venue/" + `${id}`);
      }
      return data;
    } catch {
      alert("Create a form failed..");
      console.log(formError);
    }
  }

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
    }
    // else if (value === venue.location.) {
    //   setVenue((prevVenue) => ({
    //     ...prevVenue,
    //     location: {
    //       ...prevVenue.location,
    //       [name]: value,
    //     },
    //   }));
    // }
    else {
      setVenue((prevVenue) => ({ ...prevVenue, [name]: value }));
    }
  };

  // load old information
  //   const oldTitle = venue.name;
  //   const oldDescription = venue.description;

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
          //   onChange={(e) => setTitle(e.target.value)}
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
          //   onChange={(e) => setDescription(e.target.value)}
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
          //   onChange={handleSpecialInputChange}
          onChange={(e) =>
            setVenue((prevVenue) => ({
              ...prevVenue,
              media: e.target.value.split(","),
            }))
          }
          //   onChange={(e) => setImages(e.target.value.split(","))}
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
          value={venue.price || ""}
          placeholder="Please enter price"
          onChange={handleSpecialInputChange}
          //   onChange={(e) => setPrice(e.target.value)}
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
          //   onChange={(e) => setMaxGuests(e.target.value)}
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
          //   onChange={(e) => setRating(e.target.value)}
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
                checked={venue.meta.parking}
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
                checked={venue.meta.breakfast}
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
                checked={venue.meta.pets}
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
            value={venue.location.address || ""}
            placeholder="Please enter address"
            // onChange={(e) => setRating(e.target.value)}
            onChange={(e) =>
              setVenue((prevVenue) => ({
                ...prevVenue,
                location: {
                  ...prevVenue.location,
                  address: e.target.value,
                },
              }))
            }
            // onChange={handleSpecialInputChange}
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
            // onChange={handleInputChange}
            onChange={(e) =>
              setVenue((prevVenue) => ({
                ...prevVenue,
                location: {
                  ...prevVenue.location,
                  city: e.target.value,
                },
              }))
            }
            // onChange={handleSpecialInputChange}
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
            // onChange={handleInputChange}
            // onChange={handleSpecialInputChange}
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
            // onChange={handleInputChange}
            onChange={(e) =>
              setVenue((prevVenue) => ({
                ...prevVenue,
                location: {
                  ...prevVenue.location,
                  country: e.target.value,
                },
              }))
            }
            // onChange={handleSpecialInputChange}
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
            // onChange={handleInputChange}
            // onChange={handleSpecialInputChange}
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
            // onChange={handleInputChange}
            // onChange={handleSpecialInputChange}
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
            // onChange={handleInputChange}
            // onChange={handleSpecialInputChange}
          />
        </div>
        <div className={styles.button}>
          <Button name={"Update"} type="submit" />
        </div>
      </form>
    </div>
  );
}
