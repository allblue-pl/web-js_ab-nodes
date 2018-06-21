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
                    this.pChildren.get(i).activate();
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
    __isDisplayed()
    {
        return this.parentNode.displayed && this.active && !this.hide;
    }

    __onActivate()
    {
        js0.assert(this.parentNode !== null, 'Parent node not set.');

        if (!this.show)
            return;

        this.refreshDisplayed();
        for (let i = 0; i < this.pChildren.length; i++)
            this.pChildren.get(i).activate();
    }

    __onDeactivate()
    {
        if (!this.show)
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

        __onAddChild(childNode, nextNode)
        {
            // if (nextNode === null)
            //     childNode._nextNode = this._nextNode;

            if (this.__main.active && this.__main.show)
                childNode.activate();
        }

        __getNext(childNode)
        {
            let nextNode = this.findNext(childNode);
            if (nextNode !== null)
                return nextNode;

            return this.__main.nextNode;
        }

    }},

});
