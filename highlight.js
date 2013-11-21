(function(window, undefined) {
/**
 * Courtesy of MDN: https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Whitespace_in_the_DOM
 * Version of |data| that doesn't include whitespace at the beginning
 * and end and normalizes all whitespace to a single space.  (Normally
 * |data| is a property of text nodes that gives the text of the node.)
 *
 * @param txt  The text node whose data should be returned
 * @return     A string giving the contents of the text node with
 *             whitespace collapsed.
 */
function normalize_text(txt) {
    var data = txt.data;
    // Use ECMA-262 Edition 3 String and RegExp features
    data = data.replace(/[\t\n\r ]+/g, " ");
    if (data.charAt(0) === " ") {
        data = data.substring(1, data.length);
    }
    if (data.charAt(data.length - 1) === " ") {
        data = data.substring(0, data.length - 1);
    }
    return data;
}

function highlight_selection(doc) {
    var sel = doc.getSelection();
    // only support highlight within TextNode
    if(!sel.anchorNode || !sel.toString()) {
        console.log('No text selected.');
        return;
    }
    if (sel.anchorNode !== sel.focusNode) {
        console.log('Operation not supported.');
        return;
    }

    var text_node = sel.anchorNode;
    var full_text = normalize_text(text_node);
    var selected = sel.toString().trim(); //whitespace at the boundary are not trimmed
    var sides = full_text.split(selected);

    // replace original with annotated nodes
    var before = doc.createTextNode(sides[0]);
    var parent = text_node.parentNode;
    parent.replaceChild(before, text_node);
    var span = doc.createElement('span');
    //TODO: refactor to style
    span.setAttribute('style', 'background:#fae983;');
    span.appendChild(doc.createTextNode(selected));
    parent.insertBefore(span, before.nextSibling);
    parent.insertBefore(doc.createTextNode(sides[1]), span.nextSibling);
}

window.highlight_selection = highlight_selection;
})(window);
