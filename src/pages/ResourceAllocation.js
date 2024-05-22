import React, { useState } from "react";
import { Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import PanelHeader from "../components/PanelHeader.js";

function ResourceAllocation() {
    const [bandwidth, setBandwidth] = useState("");
    const [subcarrierSpacing, setSubcarrierSpacing] = useState("");
    const [ofdmSymbols, setOfdmSymbols] = useState("");
    const [resourceBlockDuration, setResourceBlockDuration] = useState("");
    const [bitsPerResourceElement, setBitsPerResourceElement] = useState("");
    const [results, setResults] = useState(null);

    const handleCalculate = () => {
        const bandwidthValue = parseFloat(bandwidth);
        const subcarrierSpacingValue = parseFloat(subcarrierSpacing);
        const ofdmSymbolsValue = parseInt(ofdmSymbols, 10);
        const resourceBlockDurationValue = parseFloat(resourceBlockDuration);
        const bitsPerResourceElementValue = parseInt(bitsPerResourceElement, 10);

        // Number of subcarriers in the given bandwidth
        const numSubcarriers = Math.floor(bandwidthValue / subcarrierSpacingValue);

        // Number of bits in one resource element
        const resourceElementBits = bitsPerResourceElementValue;

        // Number of bits in one OFDM symbol
        const ofdmSymbolBits = numSubcarriers * resourceElementBits;

        // Number of bits in one resource block (RB)
        const resourceBlockBits = ofdmSymbolsValue * ofdmSymbolBits;

        // Data rate for one resource block
        const resourceBlockRate = resourceBlockBits / resourceBlockDurationValue;

        // Maximum transmission using parallel resource blocks
        const maxTransmissionRate = resourceBlockRate * numSubcarriers;

        setResults({
            numSubcarriers,
            resourceElementBits,
            ofdmSymbolBits,
            resourceBlockBits,
            resourceBlockRate,
            maxTransmissionRate
        });
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
                    <CardBody>
                        <Form>
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
                                <Label for="resourceBlockDuration">Duration of Resource Block (s)</Label>
                                <Input
                                    type="number"
                                    id="resourceBlockDuration"
                                    value={resourceBlockDuration}
                                    onChange={(e) => setResourceBlockDuration(e.target.value)}
                                    placeholder="Enter duration of resource block in seconds"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="bitsPerResourceElement">Bits per Resource Element</Label>
                                <Input
                                    type="number"
                                    id="bitsPerResourceElement"
                                    value={bitsPerResourceElement}
                                    onChange={(e) => setBitsPerResourceElement(e.target.value)}
                                    placeholder="Enter number of bits per resource element"
                                />
                            </FormGroup>
                            <Button color="primary" onClick={handleCalculate}>Calculate</Button>
                        </Form>

                        {results && (
                            <div className="results">
                                <h5>Results</h5>
                                <p>Number of Subcarriers: {results.numSubcarriers}</p>
                                <p>Bits per Resource Element: {results.resourceElementBits}</p>
                                <p>Bits per OFDM Symbol: {results.ofdmSymbolBits}</p>
                                <p>Bits per Resource Block: {results.resourceBlockBits}</p>
                                <p>Resource Block Rate: {results.resourceBlockRate.toFixed(2)} bits/s</p>
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
