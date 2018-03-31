'use strict';

const js0 = require('js0');

const Node = require('../Node');


class ShowNode extends Node
{

    get show()
    {
        return this._show;
    }

    set show(show_value)
    {
        js0.args(arguments, 'boolean');

        if (show_value === this._show)
            return;
        this._show = show_value;

        if (show_value) {
            if (this.active) {
                for (let i = 0; i < this.pChildren.length; i++)
                    this.pChildren.get(i).activate();
            }
        } else {
            for (let i = 0; i < this.pChildren.length; i++)
                this.pChildren.get(i).deactivate();
        }
    }


    constructor()
    { super();
        js0.prop(this, ShowNode.PChildren, this);
        js0.prop(this, ShowNode.PCopyable, this, arguments);

        this._show = false;
    }


    /* Node */
    __onActivate()
    {
        js0.assert(this.parentNode !== null, 'Parent node not set.');

        if (!this.show)
            return;

        for (let i = 0; i < this.pChildren.length; i++)
            this.pChildren.get(i).activate();
    }

    __onDeactivate()
    {
        if (!this.show)
            return;

        for (let i = this.pChildren.length - 1; i >= 0; i--)
            this.pChildren.get(i).deactivate();
    }

    __getHtmlElement()
    {
        js0.assert(this.parentNode !== null, 'Parent node not set.');

        return this.parentNode.htmlElement;
    }

    __getFirstHtmlElement()
    {
        return this.pChildren.length === 0 ?
                null : this.pChildren.get(0).firstHtmlElement;
    }
    /* / Node */

}
module.exports = ShowNode;


Object.defineProperties(ShowNode, {

    PChildren: { value:
    class ShowNode_PChildren extends Node.PChildren
    {

        constructor(node)
        { super(node);

        }

        __onAddChild(child_node, next_node)
        {
            // if (next_node === null)
            //     child_node._nextNode = this._nextNode;

            if (this.node.active && this.node.show)
                child_node.activate();
        }

        __getNext(child_node)
        {
            let next_node = this.findNext(child_node);
            if (next_node !== null)
                return next_node;

            return this.node.nextNode;
        }

    }},

});


Object.defineProperties(ShowNode, {

    PCopyable: { value:
    class ShowNode_PCopyable extends Node.PCopyable {

        constructor(node, args)
        { super(node, args);

        }

        __createCopy(deepCopy, nodeInstances)
        {
            return new ShowNode();
        }

    }},

});