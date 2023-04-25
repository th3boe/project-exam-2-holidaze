import { NavLink } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaHome } from "react-icons/fa";
import styles from "./nav.module.css";

export default function HeaderNav() {
  return (
    <div className={styles.nav}>
      <Navbar expand="lg" variant="dark">
        <Container className="justify-content-end">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center"
          >
            <Nav>
              <NavLink to="/">
                <FaHome />
              </NavLink>
              <NavLink to="/venues">Venues</NavLink>
              <NavLink to="/register">Register</NavLink>
            </Nav>
            <Nav>
              <NavLink to="/signin">Sign In</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
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
