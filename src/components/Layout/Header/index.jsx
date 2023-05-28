import HeaderNav from "../../Navigation/";
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
