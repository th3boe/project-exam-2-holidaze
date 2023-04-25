import HeaderNav from "../../Navigation/";
import Logo from "../../../images/logo-desktop.png";
import "./header.module.css";

export default function Header() {
  return (
    <header>
      <div>
        <img height="100vmin" src={Logo} alt="Holidaze-logo" />
        <HeaderNav />
      </div>
    </header>
  );
}
