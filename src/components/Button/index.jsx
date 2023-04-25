import styles from "./button.module.css";
import PropTypes from "prop-types";

export default function Button({ name, onClick }) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {name}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string,
};
