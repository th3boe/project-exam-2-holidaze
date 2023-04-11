import { Outlet } from "react-router-dom";
import Footer from "../Footer/";
import Header from "../Header/";
import styles from "../../App.module.css";

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
