import React from 'react';
import { Control } from './components/Control';
import { ControlCenter } from './components/ControlCenter';
import { Canvas } from './components/Canvas';
import { InfoRegion } from './components/InfoRegion';
import core from './core';

function App() {
  return (
    <div>
      <Canvas />

      <ControlCenter>
        <Control thisControls={{title: "Wall", icon: require("./assets/wall.png"), action: core.reset}} subControls={[
          {title: "Trash", icon: require("./assets/trash.png"), action: core.reset},
          {title: "Reset", icon: require("./assets/reset.png"), action: core.reset},
          {title: "Reset", icon: require("./assets/reset.png"), action: core.reset},
          {title: "Reset", icon: require("./assets/reset.png"), action: core.reset},
          {title: "Reset", icon: require("./assets/reset.png"), action: core.reset}
          ]}/>
          <Control thisControls={{title: "Reset", icon: require("./assets/reset.png"), action: core.reset}} />
      </ControlCenter>

      <InfoRegion>
        <p>
          x: {core.mouse.x} y: {core.mouse.y}
        </p> 
      </InfoRegion>
    </div>
  );
}

export default App;
