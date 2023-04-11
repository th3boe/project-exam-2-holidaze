import Logo from "../../images/logo-desktop.png";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header>
      <div>
        <img className={styles.logo} src={Logo} alt="Holidaze-logo" />
      </div>
    </header>
  );
}
