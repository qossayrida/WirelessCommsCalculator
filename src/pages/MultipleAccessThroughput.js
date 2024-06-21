import React, { useState } from "react";
import { Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import PanelHeader from "../components/PanelHeader";

function ThroughputCalculator() {
    const [technique, setTechnique] = useState("");
    const [bandwidth, setBandwidth] = useState("");
    const [maxSignalPropagationTime, setMaxSignalPropagationTime] = useState("");
    const [frameSize, setFrameSize] = useState("");
    const [frameRate, setFrameRate] = useState("");
    const [results, setResults] = useState(null);
    const [alert, setAlert] = useState(null);

    const handleCalculate = () => {
        if (!technique || !bandwidth || !maxSignalPropagationTime || !frameSize || !frameRate) {
            setAlert("All fields are required.");
            return;
        }

        const bandwidthValue = parseFloat(bandwidth);
        const maxSignalPropagationTimeValue = parseFloat(maxSignalPropagationTime) * 1e-6; // convert microseconds to seconds
        const frameSizeValue = parseFloat(frameSize);
        const frameRateValue = parseFloat(frameRate);

        const T = frameSizeValue / bandwidthValue;
        const alpha = maxSignalPropagationTimeValue / T;
        const G = T * frameRateValue;

        let throughput;

        switch (technique) {
            case "pure ALOHA":
                throughput = frameRateValue * T * Math.exp(-2 * G * T);
                break;
            case "slotted ALOHA":
                throughput = frameRateValue * T * Math.exp(-G * T);
                break;
            case "unslotted nonpersistent CSMA":
                throughput = (G * Math.exp(-2 * alpha * T)) / (G * (1 + 2 * alpha) + Math.exp(-alpha * G));
                break;
            case "slotted nonpersistent CSMA":
                throughput = (alpha * G * Math.exp(-2 * alpha * T)) / (1 - Math.exp(-alpha * G ) + alpha);
                break;
            case "unslotted 1-persistent CSMA":
                throughput = (G * (1 + G + alpha * G * (1 + G + (alpha * G) / 2)) * Math.exp(-G * (1 + 2 * alpha))) /
                    (G * (1 + 2 * alpha) - (1 - Math.exp(-alpha * G)) + (1 + alpha * G) * Math.exp(-G * (1 + alpha)));
                break;
            case "slotted 1-persistent CSMA":
                throughput = (G * (1 + alpha - Math.exp(-alpha * G)) * Math.exp(-G * (1 + alpha))) /
                    ((1 + alpha) * (1 - Math.exp(-alpha * G)) + alpha * Math.exp(-G * (1 + alpha)));
                break;
            default:
                setAlert("Invalid multiple access technique selected.");
                return;
        }

        setAlert(null);
        setResults({ T, alpha, G, throughput });
    };

    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Card>
                    <CardHeader>
                        <h5 className="title">Multiple Access Techniques Throughput Calculator</h5>
                        <p className="category">Calculate the throughput for various multiple access techniques</p>
                    </CardHeader>

                    <CardBody className="centered-card-body">
                        {alert && <Alert color="danger">{alert}</Alert>}
                    </CardBody>

                    <CardBody className="centered-card-body">
                        <Form>
                            <FormGroup>
                                <Label for="technique">Multiple Access Technique</Label>
                                <Input
                                    type="select"
                                    id="technique"
                                    className="form-control"
                                    value={technique}
                                    onChange={(e) => setTechnique(e.target.value)}
                                >
                                    <option value="">Select Technique</option>
                                    <option value="pure ALOHA">Pure ALOHA</option>
                                    <option value="slotted ALOHA">Slotted ALOHA</option>
                                    <option value="unslotted nonpersistent CSMA">Unslotted Nonpersistent CSMA</option>
                                    <option value="slotted nonpersistent CSMA">Slotted Nonpersistent CSMA</option>
                                    <option value="unslotted 1-persistent CSMA">Unslotted 1-persistent CSMA</option>
                                    <option value="slotted 1-persistent CSMA">Slotted 1-persistent CSMA</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="bandwidth">Bandwidth (Hz)</Label>
                                <Input
                                    type="number"
                                    id="bandwidth"
                                    value={bandwidth}
                                    onChange={(e) => setBandwidth(e.target.value)}
                                    placeholder="Enter bandwidth in Hz"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="maxSignalPropagationTime">Maximum Signal Propagation Time in us</Label>
                                <Input
                                    type="number"
                                    id="maxSignalPropagationTime"
                                    value={maxSignalPropagationTime}
                                    onChange={(e) => setMaxSignalPropagationTime(e.target.value)}
                                    placeholder="Enter propagation time in microseconds"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="frameSize">Frame Size (bits)</Label>
                                <Input
                                    type="number"
                                    id="frameSize"
                                    value={frameSize}
                                    onChange={(e) => setFrameSize(e.target.value)}
                                    placeholder="Enter frame size in bits"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="frameRate">Frame Rate (g)</Label>
                                <Input
                                    type="number"
                                    id="frameRate"
                                    value={frameRate}
                                    onChange={(e) => setFrameRate(e.target.value)}
                                    placeholder="Enter frame rate"
                                />
                            </FormGroup>
                            <Button color="primary" onClick={handleCalculate}>Calculate</Button>
                        </Form>
                    </CardBody>

                    <CardBody className="centered-card-body">
                        {results && (
                            <div className="results">
                                <h5>Results</h5>
                                <p>T (Frame Time): {results.T.toFixed(6)} s</p>
                                <p>Alpha (𝛼): {results.alpha.toFixed(6)}</p>
                                <p>G: {results.G.toFixed(6)}</p>
                                <p>Throughput: {results.throughput.toFixed(6)} bits/s</p>
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default ThroughputCalculator;
