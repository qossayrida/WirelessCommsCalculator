/*!

=========================================================
* Now UI HomePage React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

// core components
import PanelHeader from "../components/PanelHeader/PanelHeader.js";


function RegularTables() {
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
                  افرض انه هون حل البروجكت
                </h1>
              </div>

            </CardBody>
          </Card>

        </div>
      </>
  );
}

export default RegularTables;
