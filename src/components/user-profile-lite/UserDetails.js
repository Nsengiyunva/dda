import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress, Container, Row, Col, CardBody
} from "shards-react";

const UserDetails = ({ userDetails }) => (
<Container>
<Row>
        <Col small>
          <Card small>
            <CardHeader className="border-bottom">
              <h6 className="m-0">Supporting Documents:</h6>
            </CardHeader>
            <CardBody>
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    Download
                  </th>
                  <th scope="col" className="border-0">
                    #
                  </th>
                  <th scope="col" className="border-0">
                    Name
                  </th>
                  <th scope="col" className="border-0">
                    Created Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {userFiles?.map( ( value ) => {
                  return (
                    <tr key={value.id}>
                      <td>
                        <Button theme="danger" onClick={()=> {} }>
                        <a style={{ color: 'white' }} download={value.name} href={value.file} title='Download'>
                          Download
                        </a>
                        </Button>
                      </td>
                      <td>{value.id}</td>
                      <td>{value.name}</td>
                      <td>{value.size}</td>
                      <td>{value.details}</td>
                      <td>{ moment( value.created_at ).format('DD-MM-YYYY')}</td>
                    </tr>
                   ) 
                }) } */}
              </tbody>
            </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
)

// UserDetails.propTypes = {
//   userDetails: PropTypes.object
// };

// UserDetails.defaultProps = {
//   userDetails: {
//     name: "Sierra Brooks",
//     avatar: require("./../../images/avatars/0.jpg"),
//     jobTitle: "Project Manager",
//     performanceReportTitle: "Workload",
//     performanceReportValue: 74,
//     metaTitle: "Description",
//     metaValue:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
//   }
// };
{/* <Card small className="mb-4 pt-3">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle"
          src={userDetails.avatar}
          alt={userDetails.name}
          width="110"
        />
      </div>
      <div>Attachments</div>
      <h4 className="mb-0">{userDetails.name}</h4>
      <span className="text-muted d-block mb-2">{userDetails.jobTitle}</span>
      <Button pill outline size="sm" className="mb-2">
        <i className="material-icons mr-1">person_add</i> Follow
      </Button>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="px-4">
        <div className="progress-wrapper">
          <strong className="text-muted d-block mb-2">
            {userDetails.performanceReportTitle}
          </strong>
          <Progress
            className="progress-sm"
            value={userDetails.performanceReportValue}
          >
            <span className="progress-value">
              {userDetails.performanceReportValue}%
            </span>
          </Progress>
        </div>
      </ListGroupItem>
      <ListGroupItem className="p-4">
        <strong className="text-muted d-block mb-2">
          {userDetails.metaTitle}
        </strong>
        <span>{userDetails.metaValue}</span>
        <table className="table table-light mb-2">
          <thead className="thead-light">
            <th>#</th>
            <th>File</th>
            <th>Download</th>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>
                <a href="#">Download</a>
              </td>
            </tr>
          </tbody>
        </table>
      </ListGroupItem>
    </ListGroup>
  </Card> */}

export default UserDetails;
