'use strict';

const js0 = require('js0');


class Node
{

    get active() {
        return this._active;
    }

    get firstHtmlElement() {
        let first_html_element = this.__getFirstHtmlElement();
        if (!js0.var(first_html_element, HTMLElement)) {
            throw new Error(`\`__getFirstHtmlElement\` in \`${this.constructor.name}\`` +
                    `does not return \`HTMLElement\`.`);
        }

        return first_html_element;
    }

    get htmlElement() {
        let html_element = this.__getHtmlElement();
        if (!js0.var(html_element, HTMLElement)) {
            throw new Error(`\`__getHtmlElement\` in \`${this.constructor.name}\`` +
                    `does not return \`HTMLElement\`.`);
        }

        return html_element;
    }

    get nextHtmlElement() {
        return this.nextNode === null ? null : this.nextNode.firstHtmlElement;
    }

    get nextNode() {
        return this.parentNode.pChildren.__getNext(this);
    }

    get parentNode() {
        if (this._parentNode === null)
            throw new Error('Parent node not set.');

        return this._parentNode;
    }


    constructor()
    {
        this._active = false;
        this._listener = null;
        this._parentNode = null;
    }

    activate()
    {
        if (this.active)
            return;

        this.__onActivate();
        this._active = true;
    }

    deactivate()
    {
        if (!this.active)
            return;

        this.__onDeactivate();
        this._active = false;
    }


    __onActivate() { js0.virtual(); }
    __onDeactivate() { js0.virtual(); }

    __getHtmlElement() { js0.virtual(); }
    __getFirstHtmlElement() { js0.virtual(); }

}
module.exports = Node;
require('./Node.PChildren');
require('./Node.PCopyable');
