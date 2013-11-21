(function(window, undefined) {
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
    var full_text = text_node.data;
    var selected = full_text.slice(sel.anchorOffset, sel.focusOffset);
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
