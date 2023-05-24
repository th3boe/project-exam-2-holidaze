import HeaderNav from "../../Navigation/";
import Logo from "../../../images/logo-desktop.png";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header>
      <div className={styles.headerPlacement}>
        {/* <div>
          <img
            className={styles.logoImage}
            height="100vmin"
            src={Logo}
            alt="Holidaze-logo"
          />
        </div> */}
        <HeaderNav />
      </div>
    </header>
  );
}
