import React from "react";
import PanelHeader from "../components/PanelHeader";
import { Card, CardBody, CardHeader } from "reactstrap";

function HomePage() {
    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Card>
                    <CardHeader>
                        <h5 className="title">Telecommunication Calculator</h5>
                        <p className="category">A Comprehensive Tool for Digital Communication System Calculations</p>
                    </CardHeader>

                    <CardBody>
                        <div className="typography-line">
                            <h1>Welcome to the Telecommunication Calculator</h1>
                        </div>
                        <div className="typography-line">
                            <p>
                                This project is designed to provide engineers and students with an online calculator to perform various critical calculations related to digital communication systems. The features of this calculator include:
                            </p>
                            <ul>
                                <li>
                                    <strong>Sampler, Quantizer, Source Encoder, Channel Encoder, and Interleaver:</strong> Calculate the number of bits and the rate for each component.
                                </li>
                                <li>
                                    <strong>OFDM Calculations:</strong> Determine the number of bits and rate for resource elements, OFDM symbols, Resource Blocks, and maximum transmission using parallel resource blocks.
                                </li>
                                <li>
                                    <strong>Power Transmission:</strong> Calculate the power transmitted in a flat environment based on transmitter and receiver specifications.
                                </li>
                                <li>
                                    <strong>Throughput Calculation:</strong> Compute the throughput in percentage for various Multiple Access techniques.
                                </li>
                                <li>
                                    <strong>Cellular System Design:</strong> Assist in designing a cellular system with necessary calculations and parameters.
                                </li>
                            </ul>
                            <p>
                                Explore the various calculators and tools we have provided to streamline your telecommunication system design and analysis.
                            </p>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default HomePage;
