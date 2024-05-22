import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody} from "reactstrap";

// core components
import PanelHeader from "../components/PanelHeader.js";

function MultipleAccessThroughput() {
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
            <Card>
              <CardHeader>
                <h5 className="title">Title</h5>
                <p className="category">explain</p>
              </CardHeader>

              <CardBody>
                <div className="typography-line">
                  <h1>
                    طمممممممني عنك
                  </h1>
                </div>

              </CardBody>
            </Card>

      </div>
    </>
  );
}

export default MultipleAccessThroughput;
