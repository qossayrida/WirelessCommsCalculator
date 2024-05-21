import React from "react";
import PanelHeader from "../components/PanelHeader/PanelHeader";
import {Card, CardBody, CardHeader} from "reactstrap";

function HomePage() {
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
                              هون هوم بيج
                          </h1>
                      </div>

                  </CardBody>
              </Card>

          </div>
      </>
  );
}

export default HomePage;
