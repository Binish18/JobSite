import React from "react";
import { Card } from "react-bootstrap";

const Final = ({ values, job }) => {

  //destructuring the object from values
  const { fileName, companyName, jobTitle } = values;
  return (
    <>
      <Card style={{ marginTop: 100, textAlign: "left" }}>
        <Card.Body>

          <p>
            <strong>File Name :</strong> {fileName}{" "}
          </p>

          <p>
            <strong>company Name :</strong> {companyName}{" "}
          </p>
          <p>
            <strong>Job Title:</strong> {jobTitle}{" "}
          </p>
        </Card.Body>
      </Card>
    </>
  );
};

export default Final;