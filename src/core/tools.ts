
import { Wall, Point } from './utils';
import core from './index';
import { ControlProps } from '../components/Control';

export interface Tool {
    onClick?: (e: MouseEvent) => void; 
    onMouseMove?: (e: MouseEvent) => void;
    onEnable?: () => void;
    onDisable?: () => void;
    controlProps: ControlProps;
    [key: string]: any; // allow any other properties
}

const wallTool: Tool = {
    drawingWall: null,
    controlProps: {
        title: "Wall",
        icon: require('../assets/wall.png'),
        action: () => {
            core.changeTool(wallTool);
        }
    },

    onDisable: () => {
        wallTool.drawingWall = null;
    },

    onClick: (e: MouseEvent) => {
        const {clientX, clientY} = e;
        if (wallTool.drawingWall) {
            wallTool.drawingWall.p2 = new Point(clientX, clientY);
            core.walls.push(wallTool.drawingWall);
            wallTool.drawingWall = null;
        }
        else {
            wallTool.drawingWall = new Wall(new Point(clientX, clientY), new Point(clientX, clientY));
        }
    },

    onMouseMove: (e: MouseEvent) => {
        const {clientX, clientY} = e;
        core.mouse.x = clientX;
        core.mouse.y = clientY;
        if (wallTool.drawingWall) {
            wallTool.drawingWall.p2 = new Point(clientX, clientY);
        }
    } 
}

const deleteTool: Tool = {
    controlProps: {
        title: "Delete",
        icon: require('../assets/trash.png'),
        action: () => {
            console.log("changing tool to delete");
            core.changeTool(deleteTool);
        }
    },

    onEnable: () => {
        console.log("enableing delete tool");
    },

    onClick: (e: MouseEvent) => {
        console.log("clicked delete");
        const {clientX, clientY} = e;
        const wall = core.walls.find(w => {
            return (
                Math.abs(w.p1.x - clientX) < 5 &&
                Math.abs(w.p1.y - clientY) < 5
            );
        }
        );
        if (wall) {
            core.walls = core.walls.filter(w => w !== wall);
        }
    }
}

// wallTool.onMouseMove = wallTool.onMouseMove?.bind(wallTool);

export default [wallTool, deleteTool];
export { wallTool };