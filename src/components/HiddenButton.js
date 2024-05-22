import React from "react";
import {
  Navbar,
  Container,
} from "reactstrap";


function HiddenButton() {

  const sidebarToggle = React.useRef();

  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    document.documentElement.classList.toggle("toggled");
  };


  React.useEffect(() => {
    if (window.innerWidth < 993 && document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      document.documentElement.classList.toggle("toggled");
    }
  }, [document.location]);

  return (
      <Navbar
          expand="lg"
          className={
            document.location.pathname.indexOf("full-screen-maps") !== -1
                ? "navbar-absolute fixed-top"
                : "navbar-absolute fixed-top " +
                "navbar-transparent"
          }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button type="button"
                      ref={sidebarToggle}
                      className="navbar-toggler"
                      onClick={() => openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
          </div>
        </Container>
      </Navbar>
  );
}

export default HiddenButton;
