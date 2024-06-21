import React, { useState } from "react";
import { Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import PanelHeader from "../components/PanelHeader";

function SignalProcessing() {
    const [bandwidth, setBandwidth] = useState("");
    const [samplingFreq, setSamplingFreq] = useState("");
    const [quantizerBits, setQuantizerBits] = useState("");
    const [encoderCompressionRate, setEncoderCompressionRate] = useState("");
    const [channelEncoderRate, setChannelEncoderRate] = useState("");
    const [interleaverBits, setInterleaverBits] = useState("");
    const [results, setResults] = useState(null);
    const [alert, setAlert] = useState(null);

    const handleCalculate = () => {
        if (!bandwidth || !samplingFreq || !quantizerBits || !encoderCompressionRate || !channelEncoderRate || !interleaverBits) {
            setAlert("All fields are required.");
            return;
        }

        const bandwidthValue = parseFloat(bandwidth);
        const samplingFreqValue = parseFloat(samplingFreq);
        const quantizerBitsValue = parseInt(quantizerBits, 10);
        const encoderCompressionRateValue = parseFloat(encoderCompressionRate);
        const channelEncoderRateValue = parseFloat(channelEncoderRate);
        const interleaverBitsValue = parseInt(interleaverBits, 10);

        if (samplingFreqValue < bandwidthValue * 2) {
            setAlert("Sampling frequency must be at least twice the bandwidth (Nyquist rate).");
            setResults(null);
            return;
        }

        if (encoderCompressionRateValue > 1) {
            setAlert("Encoder Compression Rate must be less than 1.");
            setResults(null);
            return;
        }

        if (channelEncoderRateValue > 1) {
            setAlert("Channel Encoder Rate must be less than 1.");
            setResults(null);
            return;
        }

        // Clear alert if validation passes
        setAlert(null);

        // Calculation for the number of levels, bit rates and rates
        const quantizerLevels = Math.pow(2, quantizerBitsValue);
        const quantizerRate = samplingFreqValue * quantizerBitsValue;
        const sourceEncoderRate = quantizerRate * encoderCompressionRateValue;
        const channelEncoderRateBits = sourceEncoderRate / channelEncoderRateValue;
        const interleaverRateBits = channelEncoderRateBits ;

        setResults({
            quantizerLevels,
            quantizerRate,
            sourceEncoderRate,
            channelEncoderRateBits,
            interleaverRateBits
        });
    };

    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Card>
                    <CardHeader>
                        <h5 className="title">Signal Processing Calculator</h5>
                        <p className="category">Calculate the number of levels and bit rate for various components</p>
                    </CardHeader>

                    <CardBody className="centered-card-body">
                        {alert && <Alert color="danger">{alert}</Alert>}
                    </CardBody>

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
                                <Label for="samplingFreq">Sampling Frequency (Hz)</Label>
                                <Input
                                    type="number"
                                    id="samplingFreq"
                                    value={samplingFreq}
                                    onChange={(e) => setSamplingFreq(e.target.value)}
                                    placeholder="Enter sampling frequency in Hz"
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
                                <Label for="encoderCompressionRate">Source Encoder Compression Rate (out/in)</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    id="encoderCompressionRate"
                                    value={encoderCompressionRate}
                                    onChange={(e) => setEncoderCompressionRate(e.target.value)}
                                    placeholder="Enter encoder compression rate"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="channelEncoderRate">Channel Encoder Rate (in/out)</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    id="channelEncoderRate"
                                    value={channelEncoderRate}
                                    onChange={(e) => setChannelEncoderRate(e.target.value)}
                                    placeholder="Enter channel encoder rate"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="interleaverBits">Interleaver Bits</Label>
                                <Input
                                    type="number"
                                    id="interleaverBits"
                                    value={interleaverBits}
                                    onChange={(e) => setInterleaverBits(e.target.value)}
                                    placeholder="Enter interleaver bits"
                                />
                            </FormGroup>
                            <Button color="primary" onClick={handleCalculate}>Calculate</Button>
                        </Form>
                    </CardBody>

                    <CardBody className="centered-card-body">
                        {results && (
                            <div className="results">
                                <h5>Results</h5>
                                <p>Number of Levels for Quantizer: {results.quantizerLevels}</p>
                                <p>Bit Rate of the Output for Quantizer: {results.quantizerRate.toFixed(2)} bits/s</p>
                                <p>Bit Rate of the Output for Source Encoder: {results.sourceEncoderRate.toFixed(2)} bits/s</p>
                                <p>Bit Rate of the Output for Channel Encoder: {results.channelEncoderRateBits.toFixed(2)} bits/s</p>
                                <p>Bit Rate of the Output for Interleaver: {results.interleaverRateBits.toFixed(2)} bits/s</p>
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default SignalProcessing;
