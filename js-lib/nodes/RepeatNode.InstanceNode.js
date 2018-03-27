'use strict';

const RepeatNode = require('./RepeatNode');

const js0 = require('js0');

const Node = require('../Node');


Object.defineProperty(RepeatNode, 'InstanceNode', { value:
class RepeatNode_InstanceNode extends Node
{

    get key() {
        return this._key;
    }

    constructor(repeat_node, key)
    { super();
        js0.args(arguments, RepeatNode);
        js0.prop(this, RepeatNode.InstanceNode.PChildren, this);
        // js0.prop(this, RepeatNode.InstanceNode.PCopyable, this);

        this._key = key;

        this._repeatNode = repeat_node;
        this._nodeCopies = [];
    }

    addNodeCopy(nodeCopy)
    {
        this._nodeCopies.push(nodeCopy);
    }


    /* Node */
    __onActivate()
    {
        for (let i = 0; i < this.pChildren.length; i++)
            this.pChildren.get(i).activate();
    }

    __onDeactivate()
    {
        for (let i = 0; i < this.pChildren.length; i++)
            this.pChildren.get(i).deactivate();
    }

    __getHtmlElement()
    {
        return this._repeatNode.htmlElement;
    }

    __getFirstHtmlElement()
    {
        if (this.pChildren.length > 0)
            return this.pChildren.get(0).firstHtmlElement;

        let checking = false;
        for (let instance of this._repeatNode._instances) {
            if (instance.key === this.key)
                checking = true;
            if (!checking)
                continue;

            if (instance.pChildren.length > 0)
                return this.pChildren.get(0).firstHtmlElement;
        }

        return null;
    }
    /* / Node */

}, });
module.exports = RepeatNode.InstanceNode;


Object.defineProperties(RepeatNode.InstanceNode, {

    PChildren: { value:
    class RepeatNode_InstanceNode_PChildren extends Node.PChildren
    {

        constructor(node)
        { 
            super(node);
        }

        __onAddChild(child_node, next_node)
        {
            if (this.node.active)
                child_node.activate();
        }

        __getNext(child_node)
        {
            let next_node = this.findNext(child_node);
            if (next_node !== null)
                return next_node;

            let instance_index = this.node._repeatNode._instances.indexOf(
                    this.node);
            js0.assert(instance_index !== -1, 'Instance not in repeat node.');

            if (instance_index === this.node._repeatNode._instances.size - 1)
                return this.node._repeatNode.nextNode;

            return this.node._repeatNode._instances.getAt(instance_index + 1)
                    .firstHtmlElement;
        }

    }},


    // PCopyable: { value:
    // class RepeatNode_InstanceNode_PCopyable extends Node.PCopyable
    // {
    //
    //     __createCopy(instance_nodes)
    //     {
    //         throw new Error('To do.');
    //         // return new RepeatNode.InstanceNode(this.__args[0]);
    //     }
    //
    // }},

});
