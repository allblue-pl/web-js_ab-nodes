'use strict';

const js0 = require('js0');

const HtmlElement = require('../HtmlElement');
const Node = require('../Node');


class SingleNode extends Node
{

    constructor(html_element_type)
    { super();
        js0.args(arguments, 'string');
        js0.prop(this, SingleNode.PChildren);
        js0.prop(this, SingleNode.PCopyable, arguments);

        this._htmlElement = document.createElement(html_element_type);
    }


    /* Node */
    __onActivate()
    {
        js0.assert(this.parentNode !== null, 'Parent node not set.');

        HtmlElement.AddChild(this.parentNode.htmlElement, this._htmlElement,
                this.nextHtmlElement);
    }

    __onDeactivate()
    {
        HtmlElement.RemoveChild(this.parentNode.htmlElement, this._htmlElement);
    }

    __getHtmlElement()
    {
        return this._htmlElement;
    }

    __getFirstHtmlElement()
    {
        if (!this.active)
            return null;

        return this._htmlElement;
    }
    /* / Node */

}
module.exports = SingleNode;


Object.defineProperties(SingleNode, {

    PChildren: { value:
    class SingleNode_PChildren extends Node.PChildren
    {

        __onAddChild(child_node, next_node)
        {
            child_node.activate();
        }

    }},


    PCopyable: { value:
    class SingleNode_PCopyable extends Node.PCopyable
    {

        __createCopy(deep_copy, node_instances)
        {
            return new SingleNode(this.__args[0]);
        }

    }},

});
