'use strict';

const js0 = require('js0');

const HtmlElement = require('../HtmlElement');
const Node = require('../Node');


class RootNode extends Node
{

    constructor(htmlElement)
    { super();
        js0.args(arguments, HTMLElement);
        js0.prop(this, RootNode.PChildren, this);

        this._htmlElement = htmlElement;
    }


    /* Node.IListener */
    __onActivate()
    {
        HtmlElement.ClearChildren(this._htmlElement);

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
        return this._htmlElement;
    }

    __getFirstHtmlElement()
    {
        return this._htmlElement;
    }
    /* / Node.IListener */

}
module.exports = RootNode;


Object.defineProperties(RootNode, {

    PChildren: { value:
    class RootNode_PChildren extends Node.PChildren
    {

        constructor(node)
        {
            super(node);
        }

        __onAddChild(childNode)
        {
            if (this.node.active)
                childNode.activate();
        }

    }},

});
