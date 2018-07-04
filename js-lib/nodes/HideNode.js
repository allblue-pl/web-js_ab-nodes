'use strict';

const js0 = require('js0');

const Node = require('../Node');


class HideNode extends Node
{

    get hide() {
        return this._hide;
    }
    set hide(hideValue) {
        js0.args(arguments, 'boolean');

        if (hideValue === this._hide)
            return;
        this._hide = hideValue;

        this.refreshDisplayed();

        if (hideValue) {
            if (this.active) {
                for (let i = 0; i < this.pChildren.length; i++)
                    this.pChildren.get(i).deactivate();
            }
        } else {
            for (let i = 0; i < this.pChildren.length; i++)
                this.pChildren.get(i).activate();
        }
    }


    constructor()
    { super();
        js0.prop(this, HideNode.PChildren, this);
        js0.prop(this, HideNode.PCopyable, this, arguments);

        this._hide = false;
    }


    /* Node */
    __isDisplayed()
    {
        if (!this.active || this.hide)
            return false;

        return this.parentNode.displayed;
    }

    __onActivate()
    {
        js0.assert(this.parentNode !== null, 'Parent node not set.');

        if (this.hide)
            return;

        this.refreshDisplayed();
        for (let i = 0; i < this.pChildren.length; i++)
            this.pChildren.get(i).activate();
    }

    __onDeactivate()
    {
        if (this.hide)
            return;

        this.refreshDisplayed();
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

        constructor(node)
        { super(node);

        }

        __onAddChild(child_node, next_node)
        {
            // if (next_node === null)
            //     child_node._nextNode = this._nextNode;

            if (this.node.active && !this.node.hide)
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


Object.defineProperties(HideNode, {

    PCopyable: { value:
    class HideNode_PCopyable extends Node.PCopyable {

        constructor(node, args)
        { super(node, args);

        }

        __createCopy(deepCopy, nodeInstances)
        {
            return new HideNode();
        }

    }},

});