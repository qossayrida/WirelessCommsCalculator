import React from 'react';
import { Stage, Layer, Rect, Text, Arrow, Line } from 'react-konva';

const Diagram = () => {
    const width = 550;
    const height = 195;
    return (
        <Stage width={width} height={height}>
            <Layer>

                <Text x={0} y={110} text="FDMA" fontSize={16} />
                <Arrow points={[80, 55, 120, 55]} stroke="#444444" />
                <Arrow points={[80, 120, 120, 120]} stroke="#444444" />
                <Arrow points={[80, 175, 120, 175]} stroke="#444444" />
                <Text x={130} y={50} text="f1" fontSize={16} />
                <Text x={130} y={110} text="..." fontSize={16} />
                <Text x={130} y={170} text="fn" fontSize={16} />

                <Text x={320} y={0} text="TDMA" fontSize={16} />
                <Rect x={200} y={40} width={300} height={30} stroke="#444444" />
                <Line points={[250, 40, 250, 70]} stroke="#444444" />
                <Line points={[300, 40, 300, 70]} stroke="#444444" />
                <Line points={[460, 40, 460, 70]} stroke="#444444" />

                <Text x={210} y={80} text="Ts0" fontSize={16} />
                <Text x={260} y={80} text="Ts1" fontSize={16} />
                <Text x={470} y={80} text="Tsn" fontSize={16} />

                {/*<Text x={550} y={50} text="Number of Timeslots per Carrier" fontSize={16} />*/}

                {/* Lower FDMA box */}
                <Rect x={200} y={160} width={300} height={30} stroke="#444444" />
            </Layer>
        </Stage>
    );
};

export default Diagram;
