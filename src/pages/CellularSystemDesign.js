import React, { useState } from "react";
import { Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import PanelHeader from "../components/PanelHeader";
import { erlangBTable, probabilities } from '../data/erlangData.js';
import Diagram from '../components/Diagram';

function CellularSystemDesign() {
    const [probability, setProbability] = useState("");
    const [timeslots, setTimeslots] = useState("");
    const [cityArea, setCityArea] = useState("");
    const [subscribers, setSubscribers] = useState("");
    const [averageCalls, setAverageCalls] = useState("");
    const [callDuration, setCallDuration] = useState("");
    const [sir, setSir] = useState("");
    const [referencePower, setReferencePower] = useState("");
    const [referenceDistance, setReferenceDistance] = useState("");
    const [pathLossExponent, setPathLossExponent] = useState("");
    const [receiverSensitivity, setReceiverSensitivity] = useState("");
    const [result, setResult] = useState(null);
    const [alert, setAlert] = useState(null);

    const handleCalculate = () => {
        if (!probability || !timeslots || !cityArea || !subscribers || !averageCalls || !callDuration || !sir || !referencePower || !referenceDistance || !pathLossExponent || !receiverSensitivity) {
            setAlert("All fields are required.");
            return;
        }

        const probabilityValue = parseFloat(probability);
        const timeslotsValue = parseInt(timeslots, 10);
        const cityAreaValue = parseFloat(cityArea) * 1000000;
        const subscribersValue = parseInt(subscribers, 10);
        const averageCallsValue = parseFloat(averageCalls);
        const callDurationValue = parseFloat(callDuration);
        const sirValue = parseFloat(sir);
        const referencePowerValue = parseFloat(referencePower);
        const referenceDistanceValue = parseFloat(referenceDistance);
        const pathLossExponentValue = parseFloat(pathLossExponent);
        const receiverSensitivityValue = parseFloat(receiverSensitivity) * 1e-6; // convert uW to W



        const maxDistance = referenceDistanceValue / Math.pow((receiverSensitivityValue / Math.pow(10, referencePowerValue / 10.0)), 1 / pathLossExponentValue);

        const maxCellSize = 3 * Math.sqrt(3) * Math.pow(maxDistance, 2) / 2;

        const numCells = Math.ceil(cityAreaValue / maxCellSize);

        const trafficLoadWholeSystem = subscribersValue * averageCallsValue * callDurationValue * (1 / (24 * 60));

        const trafficLoadPerCell = trafficLoadWholeSystem / numCells;

        const channelValue =5;

        if (channelValue < 1 || channelValue > 150) {
            setAlert("Number of channels must be between 1 and 150.");
            return;
        }
        setAlert(null);

        const row = erlangBTable.find(row => row.channels === channelValue);
        const probabilityIndex = probabilities.findIndex(p => p.value === probabilityValue);

        if (!row || probabilityIndex === -1) {
            setAlert("Invalid input.");
            return;
        }

        const trafficInErlangs = row.values[probabilityIndex];

        setResult({
            maxDistance: maxDistance.toFixed(2),
            maxCellSize: maxCellSize.toFixed(2),
            numCells,
            trafficLoadWholeSystem: trafficLoadWholeSystem.toFixed(2),
            trafficLoadPerCell: trafficLoadPerCell.toFixed(2)
        });
    };

    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Card>
                    <CardHeader>
                        <h5 className="title">Cellular System Design</h5>
                        <p className="category">Calculate traffic in Erlangs using Erlang B table</p>
                    </CardHeader>


                    <CardBody>
                        <p>The Diagram represents the Frequency Division Multiple Access (FDMA) and
                            Time Division Multiple Access (TDMA) concepts, which are crucial for understanding
                            the allocation of channels and timeslots in GSM900 technology. </p>
                    </CardBody>
                    <CardBody className="centered-card-body">
                        <Diagram />
                    </CardBody>


                    <CardBody className="centered-card-body">
                        {alert && <Alert color="danger">{alert}</Alert>}
                    </CardBody>

                    <CardBody className="centered-card-body">
                        <FormGroup className="tow-cell">
                            <Label for="timeslots">Number of Timeslots per Carrier (FDMA)</Label>
                            <Input
                                type="number"
                                id="timeslots"
                                value={timeslots}
                                onChange={(e) => setTimeslots(e.target.value)}
                                placeholder="Enter number of timeslots"
                            />
                        </FormGroup>
                    </CardBody>

                    <CardBody className="centered-card-body">
                        <div className="row">
                            <FormGroup className="tow-cell">
                                <Label for="cityArea">Area of the City (Km²)</Label>
                                <Input
                                    type="number"
                                    id="cityArea"
                                    value={cityArea}
                                    onChange={(e) => setCityArea(e.target.value)}
                                    placeholder="Enter area of the city in Km²"
                                />
                            </FormGroup>

                            <FormGroup className="tow-cell">
                                <Label for="subscribers">Number of Subscribers (Users)</Label>
                                <Input
                                    type="number"
                                    id="subscribers"
                                    value={subscribers}
                                    onChange={(e) => setSubscribers(e.target.value)}
                                    placeholder="Enter number of subscribers"
                                />
                            </FormGroup>
                        </div>

                        <div className="row">
                            <FormGroup className="tow-cell">
                                <Label for="averageCalls">Average Calls per Day (λ)</Label>
                                <Input
                                    type="number"
                                    id="averageCalls"
                                    value={averageCalls}
                                    onChange={(e) => setAverageCalls(e.target.value)}
                                    placeholder="Enter average number of calls per day"
                                />
                            </FormGroup>
                            <FormGroup className="tow-cell">
                                <Label for="callDuration">Average Call Duration (minutes)</Label>
                                <Input
                                    type="number"
                                    id="callDuration"
                                    value={callDuration}
                                    onChange={(e) => setCallDuration(e.target.value)}
                                    placeholder="Enter average call duration in minutes"
                                />
                            </FormGroup>
                        </div>

                        <div className="row">
                            <FormGroup className="tow-cell">
                                <Label for="probability">Probability</Label>
                                <Input
                                    type="select"
                                    id="probability"
                                    className="form-control"
                                    value={probability}
                                    onChange={(e) => setProbability(e.target.value)}
                                >
                                    <option value="">Select probability</option>
                                    {probabilities.map(p => (
                                        <option key={p.value} value={p.value}>{p.label}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup className="tow-cell">
                                <Label for="sir">Minimum SIR Needed (dB)</Label>
                                <Input
                                    type="number"
                                    id="sir"
                                    value={sir}
                                    onChange={(e) => setSir(e.target.value)}
                                    placeholder="Enter minimum SIR needed in dB"
                                />
                            </FormGroup>
                        </div>

                        <div className="row">
                            <FormGroup className="tow-cell">
                                <Label for="referencePower">Reference Power (dB)</Label>
                                <Input
                                    type="number"
                                    id="referencePower"
                                    value={referencePower}
                                    onChange={(e) => setReferencePower(e.target.value)}
                                    placeholder="Enter reference power in dB"
                                />
                            </FormGroup>

                            <FormGroup className="tow-cell">
                                <Label for="referenceDistance">Reference Distance (meters)</Label>
                                <Input
                                    type="number"
                                    id="referenceDistance"
                                    value={referenceDistance}
                                    onChange={(e) => setReferenceDistance(e.target.value)}
                                    placeholder="Enter reference distance in meters"
                                />
                            </FormGroup>
                        </div>
                        <div className="row">
                            <FormGroup className="tow-cell">
                                <Label for="pathLossExponent">Path Loss Exponent</Label>
                                <Input
                                    type="number"
                                    id="pathLossExponent"
                                    value={pathLossExponent}
                                    onChange={(e) => setPathLossExponent(e.target.value)}
                                    placeholder="Enter path loss exponent"
                                />
                            </FormGroup>
                            <FormGroup className="tow-cell">
                                <Label for="receiverSensitivity">Receiver Sensitivity (μW)</Label>
                                <Input
                                    type="number"
                                    id="receiverSensitivity"
                                    value={receiverSensitivity}
                                    onChange={(e) => setReceiverSensitivity(e.target.value)}
                                    placeholder="Enter receiver sensitivity in μW"
                                />
                            </FormGroup>
                        </div>

                        <Button color="primary" onClick={handleCalculate}>Calculate</Button>

                    </CardBody>

                    <CardBody className="centered-card-body">
                        {result && (
                            <div className="results">
                                <h5>Results</h5>
                                <p>Maximum Distance Between Transmitter and Receiver: {result.maxDistance} meters</p>
                                <p>Maximum Cell Size: {result.maxCellSize} Km²</p>
                                <p>Number of Cells in the Service Area: {result.numCells}</p>
                                <p>Traffic Load in the Whole Cellular
                                    System: {result.trafficLoadWholeSystem} Erlangs</p>
                                <p>Traffic Load in Each Cell: {result.trafficLoadPerCell} Erlangs</p>
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default CellularSystemDesign;
