import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import PanelHeader from "../components/PanelHeader.js";

const modulationData = {
  'BPSK/QPSK': [
    { EbNo: 0, BER:  0.1 },
    { EbNo: 1, BER:  0.08 },
    { EbNo: 2, BER:  0.06 },
    { EbNo: 3, BER:  0.04 },
    { EbNo: 4, BER:  0.01 },
    { EbNo: 5, BER:  0.008 },
    { EbNo: 6, BER:  0.004 },
    { EbNo: 7, BER:  0.001 },
    { EbNo: 8, BER:  0.0002 },
    { EbNo: 9, BER:  0.00003 },
    { EbNo: 10, BER: 0.000003 },
    { EbNo: 11, BER: 0.0000004 },
    { EbNo: 12, BER: 0.00000001 }
  ],
  '8-PSK': [
    { EbNo: 0, BER: 0.25 },
    { EbNo: 1, BER: 0.2 },
    { EbNo: 2, BER: 0.1 },
    { EbNo: 3, BER: 0.08 },
    { EbNo: 4, BER: 0.06 },
    { EbNo: 5, BER: 0.04 },
    { EbNo: 6, BER: 0.02 },
    { EbNo: 7, BER: 0.01 },
    { EbNo: 8, BER: 0.008 },
    { EbNo: 9, BER: 0.005 },
    { EbNo: 10, BER: 0.001 },
    { EbNo: 11, BER: 0.0003 },
    { EbNo: 12, BER: 0.00008 },
    { EbNo: 13, BER: 0.00001 },
    { EbNo: 14, BER: 0.000001 },
    { EbNo: 15, BER: 0.00000005 }
  ],
  '16-PSK': [
    { EbNo: 0, BER: 0.45 },
    { EbNo: 1, BER: 0.4 },
    { EbNo: 2, BER: 0.35 },
    { EbNo: 3, BER: 0.3 },
    { EbNo: 4, BER: 0.25 },
    { EbNo: 5, BER: 0.2 },
    { EbNo: 6, BER: 0.15 },
    { EbNo: 7, BER: 0.1 },
    { EbNo: 8, BER: 0.07 },
    { EbNo: 9, BER: 0.05 },
    { EbNo: 10, BER: 0.03 },
    { EbNo: 11, BER: 0.01 },
    { EbNo: 12, BER: 0.009 },
    { EbNo: 13, BER: 0.005 },
    { EbNo: 14, BER: 0.001 },
    { EbNo: 15, BER: 0.0003 },
    { EbNo: 16, BER: 0.0001 },
    { EbNo: 17, BER: 0.00004 },
    { EbNo: 18, BER: 0.000003 }
  ],
};


function TransmissionPower() {
  const [unit, setUnit] = useState("dB");
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
  const [ber, setBer] = useState("");
  const [modulation, setModulation] = useState("BPSK/QPSK");
  const [pt, setPt] = useState(null);
  const [alert, setAlert] = useState(null);
  const [berOptions, setBerOptions] = useState(modulationData[modulation]);

  useEffect(() => {
    setBerOptions(modulationData[modulation]);
    setBer("");
  }, [modulation]);

  const handleCalculate = () => {
    if (
        !pathLoss || !dataRate || !transmitAntennaGain || !receiveAntennaGain ||
        !antennaFeedLineLoss || !otherLosses || !fadeMargin || !receiverAmplifierGain ||
        !transmitAmplifierGain || !noiseFigureTotal || !noiseTemperature || !linkMargin ||
        !ber || !modulation
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
    const berValue = parseFloat(ber);

    // Function to get Eb/No for given BER and modulation
    const getEbNoForBer = (ber, modulation) => {
      const data = modulationData[modulation];
      for (let i = 0; i < data.length - 1; i++) {
        if (ber === data[i].BER)
          return data[i].EbNo;
      }
      return null; // Return null if no match found
    };

    const ebNoValue = getEbNoForBer(berValue, modulation);

    if (ebNoValue === null) {
      setAlert("Invalid BER value for the selected modulation type.");
      return;
    }

    const boltzmannConstantDb = 228.6;
    const boltzmannConstant = 1.38 * Math.pow(10, -23);

    let ptValue;
    if (unit === "dB") {
      ptValue = ebNoValue + noiseTemperatureValue + noiseFigureTotalValue + dataRateValue + linkMarginValue + pathLossValue + otherLossesValue + fadeMarginValue + antennaFeedLineLossValue - transmitAmplifierGainValue - receiverAmplifierGainValue - transmitAntennaGainValue - receiveAntennaGainValue - boltzmannConstantDb;
    } else if (unit === "dBm") {
      ptValue = ebNoValue + noiseTemperatureValue + noiseFigureTotalValue + dataRateValue + linkMarginValue + pathLossValue + otherLossesValue + fadeMarginValue + antennaFeedLineLossValue - transmitAmplifierGainValue - receiverAmplifierGainValue - transmitAntennaGainValue - receiveAntennaGainValue - boltzmannConstantDb - 90;
    } else {
      const ebNo = Math.pow(10, (ebNoValue / 10.0));
      ptValue = (ebNo * noiseTemperatureValue * noiseFigureTotalValue * dataRateValue * linkMarginValue * pathLossValue * otherLossesValue * fadeMarginValue * antennaFeedLineLossValue * boltzmannConstant) / (transmitAmplifierGainValue * receiverAmplifierGainValue * transmitAntennaGainValue * receiveAntennaGainValue);
    }

    setAlert(null);
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
              <FormGroup>
                <Label for="unit">Choose the unit ?</Label>
                <Input
                    type="select"
                    className="form-control"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                >
                  <option value="W">Unit less</option>
                  <option value="dB">dB</option>
                  <option value="dBm">dBm</option>
                </Input>
              </FormGroup>
            </CardBody>

            <CardBody className="centered-card-body">

              <div className="row">
                <FormGroup className="tow-cell">
                  <Label for="pathLoss">Path Loss</Label>
                  <Input
                      type="number"
                      id="pathLoss"
                      value={pathLoss}
                      onChange={(e) => setPathLoss(e.target.value)}
                      placeholder="Enter path loss"
                  />
                </FormGroup>
                <FormGroup className="tow-cell">
                  <Label for="dataRate">Data Rate</Label>
                  <Input
                      type="number"
                      id="dataRate"
                      value={dataRate}
                      onChange={(e) => setDataRate(e.target.value)}
                      placeholder="Enter data rate"
                  />
                </FormGroup>
              </div>

              <div className="row">
                <FormGroup className="tow-cell">
                  <Label for="transmitAntennaGain">Transmit Antenna Gain</Label>
                  <Input
                      type="number"
                      id="transmitAntennaGain"
                      value={transmitAntennaGain}
                      onChange={(e) => setTransmitAntennaGain(e.target.value)}
                      placeholder="Enter transmit antenna gain"
                  />
                </FormGroup>
                <FormGroup className="tow-cell">
                  <Label for="receiveAntennaGain">Receive Antenna Gain</Label>
                  <Input
                      type="number"
                      id="receiveAntennaGain"
                      value={receiveAntennaGain}
                      onChange={(e) => setReceiveAntennaGain(e.target.value)}
                      placeholder="Enter receive antenna gain"
                  />
                </FormGroup>
              </div>

              <div className="row">
                <FormGroup className="tow-cell">
                  <Label for="antennaFeedLineLoss">Antenna Feed Line Loss</Label>
                  <Input
                      type="number"
                      id="antennaFeedLineLoss"
                      value={antennaFeedLineLoss}
                      onChange={(e) => setAntennaFeedLineLoss(e.target.value)}
                      placeholder="Enter antenna feed line loss"
                  />
                </FormGroup>
                <FormGroup className="tow-cell">
                  <Label for="otherLosses">Other Losses</Label>
                  <Input
                      type="number"
                      id="otherLosses"
                      value={otherLosses}
                      onChange={(e) => setOtherLosses(e.target.value)}
                      placeholder="Enter other losses"
                  />
                </FormGroup>
              </div>

              <div className="row">
                <FormGroup className="tow-cell">
                  <Label for="fadeMargin">Fade Margin</Label>
                  <Input
                      type="number"
                      id="fadeMargin"
                      value={fadeMargin}
                      onChange={(e) => setFadeMargin(e.target.value)}
                      placeholder="Enter fade margin"
                  />
                </FormGroup>
                <FormGroup className="tow-cell">
                  <Label for="receiverAmplifierGain">Receiver Amplifier Gain</Label>
                  <Input
                      type="number"
                      id="receiverAmplifierGain"
                      value={receiverAmplifierGain}
                      onChange={(e) => setReceiverAmplifierGain(e.target.value)}
                      placeholder="Enter receiver amplifier gain"
                  />
                </FormGroup>
              </div>

              <div className="row">
                <FormGroup className="tow-cell">
                  <Label for="transmitAmplifierGain">Transmit Amplifier Gain</Label>
                  <Input
                      type="number"
                      id="transmitAmplifierGain"
                      value={transmitAmplifierGain}
                      onChange={(e) => setTransmitAmplifierGain(e.target.value)}
                      placeholder="Enter transmit amplifier gain"
                  />
                </FormGroup>
                <FormGroup className="tow-cell">
                  <Label for="noiseFigureTotal">Noise Figure Total</Label>
                  <Input
                      type="number"
                      id="noiseFigureTotal"
                      value={noiseFigureTotal}
                      onChange={(e) => setNoiseFigureTotal(e.target.value)}
                      placeholder="Enter noise figure total"
                  />
                </FormGroup>
              </div>

              <div className="row">
                <FormGroup className="tow-cell">
                  <Label for="noiseTemperature">Noise Temperature</Label>
                  <Input
                      type="number"
                      id="noiseTemperature"
                      value={noiseTemperature}
                      onChange={(e) => setNoiseTemperature(e.target.value)}
                      placeholder="Enter noise temperature"
                  />
                </FormGroup>
                <FormGroup className="tow-cell">
                  <Label for="linkMargin">Link Margin</Label>
                  <Input
                      type="number"
                      id="linkMargin"
                      value={linkMargin}
                      onChange={(e) => setLinkMargin(e.target.value)}
                      placeholder="Enter link margin"
                  />
                </FormGroup>
              </div>

              <div className="row">
                <FormGroup className="tow-cell">
                  <Label for="modulation">Modulation Type</Label>
                  <Input
                      type="select"
                      id="modulation"
                      className="form-control"
                      value={modulation}
                      onChange={(e) => setModulation(e.target.value)}
                  >
                    <option value="BPSK/QPSK">BPSK/QPSK</option>
                    <option value="8-PSK">8-PSK</option>
                    <option value="16-PSK">16-PSK</option>
                  </Input>
                </FormGroup>
                <FormGroup className="tow-cell">
                  <Label for="ber">Bit Error Rate (BER)</Label>
                  <Input
                      type="select"
                      id="ber"
                      className="form-control"
                      value={ber}
                      onChange={(e) => setBer(e.target.value)}
                  >
                    <option value="">Select BER</option>
                    {berOptions.map((option, index) => (
                        <option key={index} value={option.BER}>{option.BER}</option>
                    ))}
                  </Input>
                </FormGroup>
              </div>
              <Button color="primary" onClick={handleCalculate}>Calculate</Button>

            </CardBody>

            <CardBody className="centered-card-body">
              {pt !== null && (
                  <div className="results">
                    <h5>Results</h5>
                    <p>Total Power Transmit (Pt): {pt} {unit === "dB" ? "dB" : unit === "dBm" ? "dBm" : "W"}</p>
                  </div>
              )}
            </CardBody>
          </Card>
        </div>
      </>
  );
}

export default TransmissionPower;