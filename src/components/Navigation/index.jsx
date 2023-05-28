import { NavLink } from "react-router-dom";
import { useContext } from "react";

import Container from "react-bootstrap/Container";
import Logo from "../../images/logo-desktop.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AuthContext from "../../context/AuthContext";
import styles from "./nav.module.css";

export default function HeaderNav() {
  const [authenticate, setAuthenticate] = useContext(AuthContext);
  const profile = "/profile";

  // sign out functionality

  const signout = () => {
    setAuthenticate(null);
  };

  // return data.

  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      variant="dark"
      className={styles.header}
    >
      <Container className={styles.headerPlacement}>
        <Navbar.Brand href="/">
          <img
            className={styles.logoImage}
            height="100vmin"
            src={Logo}
            alt="Holidaze-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {authenticate ? (
            <>
              <Nav className="me-auto">
                <NavLink
                  to="/"
                  className={(navigation) =>
                    navigation.isActive ? styles.active : ""
                  }
                >
                  Home{" "}
                </NavLink>
                <NavLink
                  to="/venues"
                  className={(navigation) =>
                    navigation.isActive ? styles.active : ""
                  }
                >
                  Venues
                </NavLink>
                <NavLink
                  to={profile + `/${authenticate.name}`}
                  className={(navigation) =>
                    navigation.isActive ? styles.active : ""
                  }
                >
                  Profile
                </NavLink>
              </Nav>
              <Nav className={styles.signInOut}>
                <NavLink onClick={signout} to="/">
                  Sign Out
                </NavLink>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="me-auto">
                <NavLink
                  to="/"
                  className={(navigation) =>
                    navigation.isActive ? styles.active : ""
                  }
                >
                  Home{" "}
                </NavLink>
                <NavLink
                  to="/venues"
                  className={(navigation) =>
                    navigation.isActive ? styles.active : ""
                  }
                >
                  Venues
                </NavLink>
                <NavLink
                  to="/register"
                  className={(navigation) =>
                    navigation.isActive ? styles.active : ""
                  }
                >
                  Register
                </NavLink>
              </Nav>
              <Nav>
                <NavLink to="/signin">Sign In</NavLink>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
