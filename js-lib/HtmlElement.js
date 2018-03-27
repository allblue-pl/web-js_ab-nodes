'use strict';


class HtmlElement
{

    static AddChild(parentHtmlElement, htmlElement, nextHtmlElement = null)
    {
        // console.log(parentHtmlElement, htmlElement, nextHtmlElement);

        if (nextHtmlElement === null)
            parentHtmlElement.appendChild(htmlElement);
        else
            parentHtmlElement.insertBefore(htmlElement, nextHtmlElement);
    }

    static ClearChildren(htmlElement)
    {
        while (htmlElement.firstChild)
            htmlElement.removeChild(htmlElement.firstChild);
    }

    static RemoveChild(parentHtmlElement, htmlElement)
    {
        parentHtmlElement.removeChild(htmlElement);
    }

}

module.exports = HtmlElement;
