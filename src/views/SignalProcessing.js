import React from "react";
import { Card, CardHeader, CardBody} from "reactstrap";

import PanelHeader from "../components/PanelHeader/PanelHeader.js";

function SignalProcessing() {
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
                  رسبت بروجكت منجمنت
                </h1>
              </div>

            </CardBody>
          </Card>

        </div>
      </>
  );
}

export default SignalProcessing;
