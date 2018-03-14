'use strict';

const js0 = require('js0');

const Node = require('../Node');


class HideNode extends Node
{

    get hide() {
        return this._hide;
    }
    set hide(hide_value) {
        js0.args(arguments, 'boolean');

        if (hide_value === this._hide)
            return;
        this._hide = hide_value;

        if (hide_value) {
            if (this.active) {
                for (let i = 0; i < this.pChildren.length; i++)
                    this.pChildren.get(i).activate();w
            }
        } else {
            for (let i = 0; i < this.pChildren.length; i++)
                this.pChildren.get(i).deactivate();
        }
    }


    constructor()
    { super();
        js0.prop(this, HideNode.PChildren);

        this._hide = false;
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
module.exports = HideNode;


Object.defineProperties(HideNode, {

    PChildren: { value:
    class HideNode_PChildren extends Node.PChildren
    {

        __onAddChild(child_node, next_node)
        {
            // if (next_node === null)
            //     child_node._nextNode = this._nextNode;

            if (this.__main.active && this.__main.show)
                child_node.activate();
        }

        __getNext(child_node)
        {
            let next_node = this.findNext(child_node);
            if (next_node !== null)
                return next_node;

            return this.__main.nextNode;
        }

    }},

});
