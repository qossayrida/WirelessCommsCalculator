import React, { useState } from "react";
import { Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import PanelHeader from "../components/PanelHeader.js";

const modulationTechniques = {
    "1024-QAM": 1024,
    "256-QAM": 256,
    "64-QAM": 64,
    "16-QAM": 16,
    "QPSK": 4
};

function ResourceAllocation() {
    const [resourceBlockBandwidth, setResourceBlockBandwidth] = useState("");
    const [subcarrierSpacing, setSubcarrierSpacing] = useState("");
    const [ofdmSymbols, setOfdmSymbols] = useState("");
    const [resourceBlockDuration, setResourceBlockDuration] = useState("");
    const [modulationTechnique, setModulationTechnique] = useState("");
    const [results, setResults] = useState(null);
    const [alert, setAlert] = useState(null);

    const handleCalculate = () => {
        const resourceBlockBandwidthValue = parseFloat(resourceBlockBandwidth);
        const subcarrierSpacingValue = parseFloat(subcarrierSpacing);
        const ofdmSymbolsValue = parseInt(ofdmSymbols, 10);
        const resourceBlockDurationValue = parseFloat(resourceBlockDuration) / 1000; // Convert ms to seconds

        if (!resourceBlockBandwidth || !subcarrierSpacing || !ofdmSymbols || !resourceBlockDuration || !modulationTechnique) {
            setAlert("All fields are required.");
            setResults(null);
            return;
        }

        if (resourceBlockBandwidthValue % subcarrierSpacingValue !== 0) {
            setAlert("Resource Block Bandwidth must be divisible by Subcarrier Spacing.");
            setResults(null);
            return;
        }

        const numSubcarriers = Math.floor(resourceBlockBandwidthValue / subcarrierSpacingValue);
        const modulationNumber = modulationTechniques[modulationTechnique];
        const bitsPerResourceBlock = Math.log2(modulationNumber);
        const bitsPerOfdmSymbol = numSubcarriers * bitsPerResourceBlock;
        const bitsPerResourceBlockTotal = ofdmSymbolsValue * bitsPerOfdmSymbol;
        const maxTransmissionRate = (4 * bitsPerResourceBlockTotal) / resourceBlockDurationValue;

        setResults({
            bitsPerResourceBlock,
            bitsPerOfdmSymbol,
            bitsPerResourceBlockTotal,
            maxTransmissionRate
        });
        setAlert(null); // Clear alert if validation passes
    };

    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Card>
                    <CardHeader>
                        <h5 className="title">Resource Allocation Calculator</h5>
                        <p className="category">Calculate the number of bits and rate for resource elements, OFDM symbols, resource blocks, and maximum transmission using parallel resource blocks</p>
                    </CardHeader>

                    <CardBody className="centered-card-body">
                        {alert && <Alert color="danger">{alert}</Alert>}
                    </CardBody>

                    <CardBody className="centered-card-body">
                        <Form>
                            <FormGroup>
                                <Label for="resourceBlockBandwidth">Resource Block Bandwidth (Hz)</Label>
                                <Input
                                    type="number"
                                    id="resourceBlockBandwidth"
                                    value={resourceBlockBandwidth}
                                    onChange={(e) => setResourceBlockBandwidth(e.target.value)}
                                    placeholder="Enter resource block bandwidth in Hz"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="subcarrierSpacing">Subcarrier Spacing (Hz)</Label>
                                <Input
                                    type="number"
                                    id="subcarrierSpacing"
                                    value={subcarrierSpacing}
                                    onChange={(e) => setSubcarrierSpacing(e.target.value)}
                                    placeholder="Enter subcarrier spacing in Hz"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="ofdmSymbols">Number of OFDM Symbols in Resource Block</Label>
                                <Input
                                    type="number"
                                    id="ofdmSymbols"
                                    value={ofdmSymbols}
                                    onChange={(e) => setOfdmSymbols(e.target.value)}
                                    placeholder="Enter number of OFDM symbols in a resource block"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="resourceBlockDuration">Duration of Resource Block (ms)</Label>
                                <Input
                                    type="number"
                                    id="resourceBlockDuration"
                                    value={resourceBlockDuration}
                                    onChange={(e) => setResourceBlockDuration(e.target.value)}
                                    placeholder="Enter duration of resource block in milliseconds"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="modulationTechnique">Modulation Technique</Label>
                                <Input
                                    type="select"
                                    className="form-control"
                                    value={modulationTechnique}
                                    onChange={(e) => setModulationTechnique(e.target.value)}
                                >
                                    <option value="">Select Modulation Technique</option>
                                    {Object.keys(modulationTechniques).map((technique) => (
                                        <option key={technique} value={technique}>
                                            {technique}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <Button color="primary" onClick={handleCalculate}>Calculate</Button>
                        </Form>
                    </CardBody>

                    <CardBody className="centered-card-body">
                        {results && (
                            <div className="results centered-alert">
                                <h5>Results</h5>
                                <p>Number of Bits per Resource Block: {results.bitsPerResourceBlock.toFixed(2)}</p>
                                <p>Number of Bits per OFDM Symbol: {results.bitsPerOfdmSymbol.toFixed(2)}</p>
                                <p>Number of Bits per Resource Block (Total): {results.bitsPerResourceBlockTotal.toFixed(2)}</p>
                                <p>Maximum Transmission Rate: {results.maxTransmissionRate.toFixed(2)} bits/s</p>
                            </div>
                        )}
                </CardBody>
                </Card>
            </div>
        </>
    );
}

export default ResourceAllocation;
