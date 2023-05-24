import { NavLink } from "react-router-dom";
import { useContext } from "react";

import Container from "react-bootstrap/Container";
import Logo from "../../images/logo-desktop.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AuthContext from "../../context/AuthContext";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import styles from "./nav.module.css";

export default function HeaderNav() {
  const [authenticate, setAuthenticate] = useContext(AuthContext);

  const signout = () => {
    setAuthenticate(null);
  };
  return (
    // <div className={styles.nav}>
    <Navbar
      collapseOnSelect
      expand="sm"
      variant="dark"
      className={styles.header}
    >
      <Container className={styles.headerPlacement}>
        <Navbar.Brand to="/">
          <img
            className={styles.logoImage}
            height="100vmin"
            src={Logo}
            alt="Holidaze-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* <Nav className="me-auto">
            {" "}
            <NavLink to="/">
              {/* Home <FaHome />
              Home{" "}
            </NavLink>
            <NavLink to="/venues">Venues</NavLink>{" "}
          </Nav> */}
          {/* <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav> */}
          {/* <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav> */}

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
                  to={"/profile" + `/${authenticate.name}`}
                  className={(navigation) =>
                    navigation.isActive ? styles.active : ""
                  }
                >
                  {/* Signed in as <CgProfile />
                  {""} {authenticate.name} */}
                  Profile
                </NavLink>
                {/* <NavLink to="/profile">Profile</NavLink> */}
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
                  {/* Home <FaHome /> */}
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
    // </div>
  );
}

// import { NavLink } from "react-router-dom";

// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import Offcanvas from "react-bootstrap/Offcanvas";
// import { CgProfile } from "react-icons/cg";

// export default function HeaderNav() {
//   return (
//     <>
//       {["md"].map((expand) => (
//         <Navbar key={expand} variant="dark" expand={expand} className="mb-3">
//           <Container className="justify-content-end">
//             <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
//             <Navbar.Offcanvas
//               id={`offcanvasNavbar-expand-${expand}`}
//               aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
//               placement="end"
//             >
//               <Offcanvas.Header
//                 closeButton
//                 className="justify-content-end"
//               ></Offcanvas.Header>
//               <Offcanvas.Body>
//                 <Nav className="justify-content-center flex-grow-1 pe-3">
//                   <NavLink to="/">Home</NavLink>
//                   <NavLink to="/venues">Venues</NavLink>
//                   <NavDropdown
//                     title={<CgProfile />}
//                     id={`offcanvasNavbarDropdown-expand-${expand}`}
//                   >
//                     <NavDropdown.Item to="/signIn">Sign in</NavDropdown.Item>
//                     <NavDropdown.Item to="/register">Register</NavDropdown.Item>
//                     <NavDropdown.Divider />
//                     <NavDropdown.Item to="/register">
//                       Holidaze your cabin
//                     </NavDropdown.Item>
//                   </NavDropdown>
//                 </Nav>
//               </Offcanvas.Body>
//             </Navbar.Offcanvas>
//           </Container>
//         </Navbar>
//       ))}
//     </>
//   );
// }

// HELLO - here!

//  <Navbar expand="sm" variant="dark">
//    <Container className="justify-content-end">
//      {/* <Navbar.Brand to="/">React-Bootstrap</Navbar.Brand> */}
//      <Navbar.Toggle aria-controls="basic-navbar-nav" />
//      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
//        <Nav>
//          <NavLink to="/">
//            {/* Home <FaHome /> */}
//            Home
//          </NavLink>
//          <NavLink to="/venues">Venues</NavLink>
//        </Nav>

//  {authenticate ? (
//    <>
//      <Nav>
//        <NavLink to={"/profile" + `/${authenticate.name}`}>
//          {/* Signed in as <CgProfile />
//             {""} {authenticate.name} */}
//          Profile
//        </NavLink>
//        {/* <NavLink to="/profile">Profile</NavLink> */}
//      </Nav>
//      <Nav className={styles.signInOut}>
//        <NavLink className={styles.signInOut} onClick={signout} to="/">
//          Sign Out
//        </NavLink>
//      </Nav>
//    </>
//  ) : (
//    <>
//      <Nav>
//        <NavLink to="/register">Register</NavLink>
//      </Nav>
//      <Nav className={styles.signInOut}>
//        <NavLink to="/signin">Sign In</NavLink>
//      </Nav>
//    </>
//  )}
//      </Navbar.Collapse>
//    </Container>
//  </Navbar>;
