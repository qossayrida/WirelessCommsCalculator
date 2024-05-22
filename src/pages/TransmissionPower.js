import React, { useState } from "react";
import { Card, CardBody, CardHeader, Form, FormGroup, Label, Input, Button } from "reactstrap";
import PanelHeader from "../components/PanelHeader.js";

function RegularTables() {
  const [inDb, setInDb] = useState(false);
  const [pr, setPr] = useState("");
  const [lp, setLp] = useState("");
  const [gt, setGt] = useState("");
  const [gr, setGr] = useState("");
  const [pt, setPt] = useState(null);

  const handleCalculate = () => {
    const prValue = parseFloat(pr);
    const lpValue = parseFloat(lp);
    const gtValue = parseFloat(gt);
    const grValue = parseFloat(gr);

    let ptValue;
    if (inDb) {
      ptValue = prValue + lpValue - gtValue - grValue;
    } else {
      ptValue = (prValue * lpValue) / (gtValue * grValue);
    }

    setPt(ptValue);
  };

  return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Card>
            <CardHeader>
              <h5 className="title">Transmitted Power Calculator</h5>
              <p className="category">Calculate transmitted power based on the transmitter and receiver specifications</p>
            </CardHeader>

            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="inDb">Are the values in dB?</Label>
                  <Input
                      type="select"
                      id="inDb"
                      value={inDb}
                      onChange={(e) => setInDb(e.target.value === "true")}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="pr">Received Power (Pr)</Label>
                  <Input
                      type="number"
                      id="pr"
                      value={pr}
                      onChange={(e) => setPr(e.target.value)}
                      placeholder="Enter received power"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="lp">Path Loss (Lp)</Label>
                  <Input
                      type="number"
                      id="lp"
                      value={lp}
                      onChange={(e) => setLp(e.target.value)}
                      placeholder="Enter path loss"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="gt">Transmitter Antenna Gain (Gt)</Label>
                  <Input
                      type="number"
                      id="gt"
                      value={gt}
                      onChange={(e) => setGt(e.target.value)}
                      placeholder="Enter transmitter antenna gain"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="gr">Receiver Antenna Gain (Gr)</Label>
                  <Input
                      type="number"
                      id="gr"
                      value={gr}
                      onChange={(e) => setGr(e.target.value)}
                      placeholder="Enter receiver antenna gain"
                  />
                </FormGroup>
                <Button color="primary" onClick={handleCalculate}>Calculate</Button>
              </Form>

              {pt !== null && (
                  <div className="results">
                    <h5>Results</h5>
                    <p>Transmitted Power (Pt): {pt} {inDb ? "dB" : "W"}</p>
                  </div>
              )}
            </CardBody>
          </Card>
        </div>
      </>
  );
}

export default RegularTables;
