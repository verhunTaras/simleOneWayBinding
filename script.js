var petro = 'Petro';
var ivan = 'Ivan';
var tanya = 'Tania';
var andriy = 'Andrew';
var taras = 'Taras';

function angularify(element){
    renderFirst(element);

    for (var i=0; i<element.children.length; i++){
        if(element.children[i].localName==='script') continue;
        if (!element.children[i].children.length){
            render(element.children[i]);
        } else {
            angularify(element.children[i]);
        }
    }

}
angularify(document.body);

function render(element) {
    extract(element.textContent).forEach(function (variable) {
        if(window[variable]){
            element.textContent = replaceNode(element.textContent, variable);
        }

    })
}

function renderFirst(element) {
    var nodes = element.childNodes;
    var textNodesStr = '';
    var textNodes = [];
    for(var i=0; i<nodes.length;i++){
        if (nodes[i].nodeName === '#text'){
            textNodesStr+=nodes[i].data;
            textNodes.push(nodes[i])
        }
    }
    extract(textNodesStr).forEach(function (variable) {
        if (window[variable]) {
            textNodes.forEach(function (node) {
                if (node.data.includes(variable)) {
                    node.data = replaceNode(node.data, variable);
                }
            })
        }
    })
}

function extract(str) {
    var arr = str.split('{{');
    var extracted = [];
    arr.forEach(function (el) {
        if(el.includes('}}')){
            extracted.push(el.split('}}')[0]);
        }
    });
    return extracted;
}

function replaceNode(source, variable) {
    return source.replace('{{' + variable + '}}', window[variable]);
}