import styled from 'styled-components';
import React from 'react';
import core from '../core';

const StyledCanvas = styled.canvas`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
`

const Canvas = (props: any) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        core.setCanvas(canvasRef.current);
        window.requestAnimationFrame(core.render);
    }, []);

    return (
        <StyledCanvas 
            ref={canvasRef}
            onMouseMove={(e) => core.onMouseMove(e)}
            onClick={(e) => core.onClick(e)}
        >

        </StyledCanvas>
    )
}

export { Canvas };
