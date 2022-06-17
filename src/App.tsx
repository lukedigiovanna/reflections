import React, { useEffect } from 'react';
import { Control } from './components/Control';
import { ControlCenter } from './components/ControlCenter';
import { Canvas } from './components/Canvas';
import { InfoRegion } from './components/InfoRegion';
import core from './core';
import tools from './core/tools';

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
        <Control controls={
          [core.currentTool, ...tools.filter(tool => tool !== core.currentTool)].map((tool) => {
            return tool.controlProps
          })
        }/>
        
        <Control controls={[{title: "Reset", icon: require("./assets/reset.png"), action: core.reset}]} />
        <Control controls={
          [{title: "Start", icon: require("./assets/start.png"), action: core.start}
          , {title: "Pause", icon: require("./assets/pause.png"), action: core.pause}
          , {title: "Stop", icon: require("./assets/stop.png"), action: core.resetTimer}]
        } />
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
