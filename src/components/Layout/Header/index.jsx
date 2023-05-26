import HeaderNav from "../../Navigation/";
import Logo from "../../../images/logo-desktop.png";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header>
      <div className={styles.headerPlacement}>
        <HeaderNav />
      </div>
    </header>
  );
}
