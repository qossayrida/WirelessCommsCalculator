import React, { useState } from "react";
import { Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import PanelHeader from "../components/PanelHeader";

function SignalProcessing() {
    const [bandwidth, setBandwidth] = useState("");
    const [quantizerBits, setQuantizerBits] = useState("");
    const [encoderCompressionRate, setEncoderCompressionRate] = useState("");
    const [channelEncoderRate, setChannelEncoderRate] = useState("");
    const [results, setResults] = useState(null);

    const handleCalculate = () => {
        const bandwidthValue = parseFloat(bandwidth);
        const quantizerBitsValue = parseInt(quantizerBits, 10);
        const encoderCompressionRateValue = parseFloat(encoderCompressionRate);
        const channelEncoderRateValue = parseFloat(channelEncoderRate);

        // Calculation for the number of bits and rate
        const samplerRate = bandwidthValue * 2; // Nyquist rate
        const quantizerRate = samplerRate * quantizerBitsValue;
        const sourceEncoderRate = quantizerRate / encoderCompressionRateValue;
        const channelEncoderRateBits = sourceEncoderRate / channelEncoderRateValue;

        setResults({
            samplerRate,
            quantizerRate,
            sourceEncoderRate,
            channelEncoderRateBits
        });
    };

    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Card>
                    <CardHeader>
                        <h5 className="title">Signal Processing Calculator</h5>
                        <p className="category">Calculate the number of bits and rate for various components</p>
                    </CardHeader>
                    <CardBody className="centered-card-body">
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
                                <Label for="quantizerBits">Quantizer Bits</Label>
                                <Input
                                    type="number"
                                    id="quantizerBits"
                                    value={quantizerBits}
                                    onChange={(e) => setQuantizerBits(e.target.value)}
                                    placeholder="Enter number of quantizer bits"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="encoderCompressionRate">Encoder Compression Rate</Label>
                                <Input
                                    type="number"
                                    id="encoderCompressionRate"
                                    value={encoderCompressionRate}
                                    onChange={(e) => setEncoderCompressionRate(e.target.value)}
                                    placeholder="Enter encoder compression rate"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="channelEncoderRate">Channel Encoder Rate</Label>
                                <Input
                                    type="number"
                                    id="channelEncoderRate"
                                    value={channelEncoderRate}
                                    onChange={(e) => setChannelEncoderRate(e.target.value)}
                                    placeholder="Enter channel encoder rate"
                                />
                            </FormGroup>
                            <Button color="primary" onClick={handleCalculate}>Calculate</Button>
                        </Form>

                        {results && (
                            <div className="results">
                                <h5>Results</h5>
                                <p>Sampler Rate: {results.samplerRate.toFixed(2)} Hz</p>
                                <p>Quantizer Rate: {results.quantizerRate.toFixed(2)} bits/s</p>
                                <p>Source Encoder Rate: {results.sourceEncoderRate.toFixed(2)} bits/s</p>
                                <p>Channel Encoder Rate: {results.channelEncoderRateBits.toFixed(2)} bits/s</p>
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default SignalProcessing;
