import React from "react";
// import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

// import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
// import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
// import MainFooter from "../components/layout/MainFooter";

const Wide = ({ children, noNavbar, noFooter }) => (
  <Container fluid>
    <Row>
      {/* <MainSidebar /> */}
      <Col
        className="main-content p-0"
        md="12"
        // lg={{ size: 10, offset: 2 }}
        // md={{ size: 9, offset: 3 }}
        sm="12"
        tag="main"
      >
        {/* {!noNavbar && <MainNavbar />} */}
        {children}
        {/* {!noFooter && <MainFooter />} */}
      </Col>
    </Row>
  </Container>
);

Wide.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
//   noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
//   noFooter: PropTypes.bool
};

// Wide.defaultProps = {
//   noNavbar: false,
//   noFooter: false
// };

export default Wide;
