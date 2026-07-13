import js0 from "js0";
import HideNode from "./nodes/HideNode";
import Node from "./Node";
import RepeatNode from "./nodes/RepeatNode";
import RootNode from "./nodes/RootNode";
import ShowNode from "./nodes/ShowNode";
import SingleNode from "./nodes/SingleNode";
import TextNode from "./nodes/TextNode";

export class abNodes_Class {
    get HideNode() {
        return HideNode;
    }

    get Node() {
        return Node;
    }

    get RepeatNode() {
        return RepeatNode;
    }

    get RootNode() {
        return RootNode;
    }

    get ShowNode() {
        return ShowNode;
    }

    get SingleNode() {
        return SingleNode;
    }

    get TextNode() {
        return TextNode;
    }


    get debug() {
        return this._debug;
    }
    

    constructor() {
        this._debug = false;
    }

    setDebug(debug) {
        js0.args(arguments, 'boolean');

        this._debug = debug;
    }
};
const abNodes = new abNodes_Class();
export default abNodes;
