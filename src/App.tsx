import React from 'react';
import { Control } from './components/Control';
import { ControlCenter } from './components/ControlCenter';
import { Canvas } from './components/Canvas';
import { InfoRegion } from './components/InfoRegion';
import core from './core';

interface Info {
  mouseX: number;
  mouseY: number;
}

function App() {
  const [infoState, setInfoState] = React.useState<Info>({mouseX: 0, mouseY: 0});

  const updateInfo = () => {
    setInfoState({
      mouseX: core.mouse.x,
      mouseY: core.mouse.y
    });
  }

  setInterval(updateInfo, 100);

  return (
    <div>
      <Canvas />

      <ControlCenter>
        <Control thisControls={{title: "Wall", icon: require("./assets/wall.png"), action: core.reset}} subControls={[
          {title: "Delete", icon: require("./assets/trash.png"), action: core.reset},
          {title: "Light", icon: require("./assets/light.png"), action: core.reset},
          ]}/>
          <Control thisControls={{title: "Reset", icon: require("./assets/reset.png"), action: core.reset}} />
      </ControlCenter>

      <InfoRegion>
        <p>
          x: {infoState.mouseX} y: {infoState.mouseY}
        </p> 
        <p>
          Reflections v0.0.1
        </p>
      </InfoRegion>
    </div>
  );
}

export default App;
