import React, { useState } from "react";
import { Card, CardBody, CardHeader, Form, FormGroup, Label, Input, Button ,Alert} from "reactstrap";
import PanelHeader from "../components/PanelHeader.js";

function RegularTables() {
  const [inDb, setInDb] = useState(false);
  const [pathLoss, setPathLoss] = useState("");
  const [dataRate, setDataRate] = useState("");
  const [transmitAntennaGain, setTransmitAntennaGain] = useState("");
  const [receiveAntennaGain, setReceiveAntennaGain] = useState("");
  const [antennaFeedLineLoss, setAntennaFeedLineLoss] = useState("");
  const [otherLosses, setOtherLosses] = useState("");
  const [fadeMargin, setFadeMargin] = useState("");
  const [receiverAmplifierGain, setReceiverAmplifierGain] = useState("");
  const [transmitAmplifierGain, setTransmitAmplifierGain] = useState("");
  const [noiseFigureTotal, setNoiseFigureTotal] = useState("");
  const [noiseTemperature, setNoiseTemperature] = useState("");
  const [linkMargin, setLinkMargin] = useState("");
  const [ebNo, setEbNo] = useState("");
  const [pt, setPt] = useState(null);
  const [alert, setAlert] = useState(null);
  const handleCalculate = () => {
    if (
        !pathLoss || !dataRate || !transmitAntennaGain || !receiveAntennaGain ||
        !antennaFeedLineLoss || !otherLosses || !fadeMargin || !receiverAmplifierGain ||
        !transmitAmplifierGain || !noiseFigureTotal || !noiseTemperature || !linkMargin ||
        !ebNo
    ) {
      setAlert("Please fill in all fields.");
      return;
    }

    const pathLossValue = parseFloat(pathLoss);
    const dataRateValue = parseFloat(dataRate);
    const transmitAntennaGainValue = parseFloat(transmitAntennaGain);
    const receiveAntennaGainValue = parseFloat(receiveAntennaGain);
    const antennaFeedLineLossValue = parseFloat(antennaFeedLineLoss);
    const otherLossesValue = parseFloat(otherLosses);
    const fadeMarginValue = parseFloat(fadeMargin);
    const receiverAmplifierGainValue = parseFloat(receiverAmplifierGain);
    const transmitAmplifierGainValue = parseFloat(transmitAmplifierGain);
    const noiseFigureTotalValue = parseFloat(noiseFigureTotal);
    const noiseTemperatureValue = parseFloat(noiseTemperature);
    const linkMarginValue = parseFloat(linkMargin);
    const ebNoValue = parseFloat(ebNo);

    const boltzmannConstantDb = 228.6;
    const boltzmannConstant = 1.38 * Math.pow(10, -23);

    let ptValue;
    if (inDb) {
      ptValue = ebNoValue + noiseTemperatureValue + noiseFigureTotalValue + dataRateValue + linkMarginValue + pathLossValue + otherLossesValue + fadeMarginValue + antennaFeedLineLossValue - transmitAmplifierGainValue - receiverAmplifierGainValue - transmitAntennaGainValue - receiveAntennaGainValue - boltzmannConstantDb;
    } else {
      ptValue = (ebNoValue * noiseTemperatureValue * noiseFigureTotalValue * dataRateValue * linkMarginValue * pathLossValue * otherLossesValue * fadeMarginValue * antennaFeedLineLossValue) / (transmitAmplifierGainValue * receiverAmplifierGainValue * transmitAntennaGainValue * receiveAntennaGainValue * boltzmannConstant);
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

            <CardBody className="centered-card-body">
              {alert && <Alert color="danger">{alert}</Alert>}
            </CardBody>

            <CardBody className="centered-card-body">
              <Form>
                <FormGroup>
                  <Label for="inDb">Are the values in dB?</Label>
                  <Input
                      type="select"
                      className="form-control"
                      value={inDb}
                      onChange={(e) => setInDb(e.target.value === "true")}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="pathLoss">Path Loss</Label>
                  <Input
                      type="number"
                      id="pathLoss"
                      value={pathLoss}
                      onChange={(e) => setPathLoss(e.target.value)}
                      placeholder="Enter path loss"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="dataRate">Data Rate</Label>
                  <Input
                      type="number"
                      id="dataRate"
                      value={dataRate}
                      onChange={(e) => setDataRate(e.target.value)}
                      placeholder="Enter data rate"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="transmitAntennaGain">Transmit Antenna Gain</Label>
                  <Input
                      type="number"
                      id="transmitAntennaGain"
                      value={transmitAntennaGain}
                      onChange={(e) => setTransmitAntennaGain(e.target.value)}
                      placeholder="Enter transmit antenna gain"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="receiveAntennaGain">Receive Antenna Gain</Label>
                  <Input
                      type="number"
                      id="receiveAntennaGain"
                      value={receiveAntennaGain}
                      onChange={(e) => setReceiveAntennaGain(e.target.value)}
                      placeholder="Enter receive antenna gain"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="antennaFeedLineLoss">Antenna Feed Line Loss</Label>
                  <Input
                      type="number"
                      id="antennaFeedLineLoss"
                      value={antennaFeedLineLoss}
                      onChange={(e) => setAntennaFeedLineLoss(e.target.value)}
                      placeholder="Enter antenna feed line loss"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="otherLosses">Other Losses</Label>
                  <Input
                      type="number"
                      id="otherLosses"
                      value={otherLosses}
                      onChange={(e) => setOtherLosses(e.target.value)}
                      placeholder="Enter other losses"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="fadeMargin">Fade Margin</Label>
                  <Input
                      type="number"
                      id="fadeMargin"
                      value={fadeMargin}
                      onChange={(e) => setFadeMargin(e.target.value)}
                      placeholder="Enter fade margin"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="receiverAmplifierGain">Receiver Amplifier Gain</Label>
                  <Input
                      type="number"
                      id="receiverAmplifierGain"
                      value={receiverAmplifierGain}
                      onChange={(e) => setReceiverAmplifierGain(e.target.value)}
                      placeholder="Enter receiver amplifier gain"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="transmitAmplifierGain">Transmit Amplifier Gain</Label>
                  <Input
                      type="number"
                      id="transmitAmplifierGain"
                      value={transmitAmplifierGain}
                      onChange={(e) => setTransmitAmplifierGain(e.target.value)}
                      placeholder="Enter transmit amplifier gain"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="noiseFigureTotal">Noise Figure Total</Label>
                  <Input
                      type="number"
                      id="noiseFigureTotal"
                      value={noiseFigureTotal}
                      onChange={(e) => setNoiseFigureTotal(e.target.value)}
                      placeholder="Enter noise figure total"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="noiseTemperature">Noise Temperature</Label>
                  <Input
                      type="number"
                      id="noiseTemperature"
                      value={noiseTemperature}
                      onChange={(e) => setNoiseTemperature(e.target.value)}
                      placeholder="Enter noise temperature"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="linkMargin">Link Margin</Label>
                  <Input
                      type="number"
                      id="linkMargin"
                      value={linkMargin}
                      onChange={(e) => setLinkMargin(e.target.value)}
                      placeholder="Enter link margin"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="ebNo">Eb/N0</Label>
                  <Input
                      type="number"
                      id="ebNo"
                      value={ebNo}
                      onChange={(e) => setEbNo(e.target.value)}
                      placeholder="Enter Eb/N0"
                  />
                </FormGroup>
                <Button color="primary" onClick={handleCalculate}>Calculate</Button>
              </Form>


            </CardBody>

            <CardBody className="centered-card-body">
              {pt !== null && (
                  <div className="results">
                    <h5>Results</h5>
                    <p>Total Power Transmit (Pt): {pt} {inDb ? "dB" : "W"}</p>
                  </div>
              )}
            </CardBody>
          </Card>
        </div>
      </>
  );
}

export default RegularTables;
