import React, { useState } from "react";
import { Card, CardBody, CardHeader, Form, FormGroup, Label, Input, Button } from "reactstrap";
import PanelHeader from "../components/PanelHeader.js";

function MultipleAccessThroughput() {
    const [technique, setTechnique] = useState("");
    const [parameters, setParameters] = useState({});
    const [throughput, setThroughput] = useState(null);

    const handleCalculate = () => {
        let throughputValue;

        switch (technique) {
            case "TDMA":
                const { timeSlots, frameDuration } = parameters;
                throughputValue = (timeSlots / frameDuration) * 100;
                break;
            case "FDMA":
                const { bandwidth, channelBandwidth } = parameters;
                throughputValue = (channelBandwidth / bandwidth) * 100;
                break;
            case "CDMA":
                const { users, spreadingFactor } = parameters;
                throughputValue = (users / spreadingFactor) * 100;
                break;
            default:
                throughputValue = 0;
        }

        setThroughput(throughputValue);
    };

    const handleParameterChange = (e) => {
        const { name, value } = e.target;
        setParameters({
            ...parameters,
            [name]: parseFloat(value)
        });
    };

    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Card>
                    <CardHeader>
                        <h5 className="title">Multiple Access Throughput Calculator</h5>
                        <p className="category">Calculate the throughput in percent for different multiple access techniques</p>
                    </CardHeader>

                    <CardBody className="centered-card-body">
                        <Form>
                            <FormGroup >
                                <Label for="technique">Multiple Access Technique</Label>
                                <Input
                                    type="select"
                                    className="form-control"
                                    value={technique}
                                    onChange={(e) => setTechnique(e.target.value)}
                                >
                                    <option value="">Select Technique</option>
                                    <option value="TDMA">TDMA</option>
                                    <option value="FDMA">FDMA</option>
                                    <option value="CDMA">CDMA</option>
                                </Input>
                            </FormGroup>

                            {technique === "TDMA" && (
                                <>
                                    <FormGroup >
                                        <Label for="timeSlots">Number of Time Slots</Label>
                                        <Input
                                            type="number"
                                            id="timeSlots"
                                            name="timeSlots"
                                            value={parameters.timeSlots || ""}
                                            onChange={handleParameterChange}
                                            placeholder="Enter number of time slots"
                                        />
                                    </FormGroup>
                                    <FormGroup >
                                        <Label for="frameDuration">Frame Duration (ms)</Label>
                                        <Input
                                            type="number"
                                            id="frameDuration"
                                            name="frameDuration"
                                            value={parameters.frameDuration || ""}
                                            onChange={handleParameterChange}
                                            placeholder="Enter frame duration in milliseconds"
                                        />
                                    </FormGroup>
                                </>
                            )}

                            {technique === "FDMA" && (
                                <>
                                    <FormGroup >
                                        <Label for="bandwidth">Total Bandwidth (Hz)</Label>
                                        <Input
                                            type="number"
                                            id="bandwidth"
                                            name="bandwidth"
                                            value={parameters.bandwidth || ""}
                                            onChange={handleParameterChange}
                                            placeholder="Enter total bandwidth in Hz"
                                        />
                                    </FormGroup>
                                    <FormGroup >
                                        <Label for="channelBandwidth">Channel Bandwidth (Hz)</Label>
                                        <Input
                                            type="number"
                                            id="channelBandwidth"
                                            name="channelBandwidth"
                                            value={parameters.channelBandwidth || ""}
                                            onChange={handleParameterChange}
                                            placeholder="Enter channel bandwidth in Hz"
                                        />
                                    </FormGroup>
                                </>
                            )}

                            {technique === "CDMA" && (
                                <>
                                    <FormGroup >
                                        <Label for="users">Number of Users</Label>
                                        <Input
                                            type="number"
                                            id="users"
                                            name="users"
                                            value={parameters.users || ""}
                                            onChange={handleParameterChange}
                                            placeholder="Enter number of users"
                                        />
                                    </FormGroup>
                                    <FormGroup >
                                        <Label for="spreadingFactor">Spreading Factor</Label>
                                        <Input
                                            type="number"
                                            id="spreadingFactor"
                                            name="spreadingFactor"
                                            value={parameters.spreadingFactor || ""}
                                            onChange={handleParameterChange}
                                            placeholder="Enter spreading factor"
                                        />
                                    </FormGroup>
                                </>
                            )}

                            <Button color="primary" onClick={handleCalculate}>Calculate</Button>
                        </Form>

                        {throughput !== null && (
                            <div className="results">
                                <h5>Results</h5>
                                <p>Throughput: {throughput.toFixed(2)}%</p>
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default MultipleAccessThroughput;
