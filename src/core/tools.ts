
import { Wall, Vector, findClosestWall } from './utils';
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
            wallTool.drawingWall.p2 = new Vector(clientX, clientY);
            core.walls.push(wallTool.drawingWall);
            wallTool.drawingWall = null;
        }
        else {
            wallTool.drawingWall = new Wall(new Vector(clientX, clientY), new Vector(clientX, clientY));
        }
    },

    onMouseMove: (e: MouseEvent) => {
        const {clientX, clientY} = e;
        if (wallTool.drawingWall) {
            wallTool.drawingWall.p2 = new Vector(clientX, clientY);
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

    closestWall: null,

    onClick: (e: MouseEvent) => {
        if (deleteTool.closestWall) {
            core.walls = core.walls.filter(w => w !== deleteTool.closestWall);
        }
    },

    onMouseMove: (e: MouseEvent) => {
        const {clientX, clientY} = e;
        deleteTool.closestWall = findClosestWall(core.walls, new Vector(clientX, clientY));
    }
}

const lightTool = {
    controlProps: {
        title: "Light",
        icon: require('../assets/light.png'),
        action: () => {
            core.changeTool(lightTool);
        }
    },

    onClick: (e: MouseEvent) => {
        const {clientX, clientY} = e;
        core.lights.push(new Vector(clientX, clientY));
    }
}

const allTools = [wallTool, deleteTool, lightTool];
export default allTools;

export { wallTool, deleteTool, lightTool };