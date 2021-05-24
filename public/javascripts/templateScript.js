function copy(){
    let range = document.createRange()
    range.selectNode(document.getElementById('mainSaved'))
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
}

let language;
switch(document.getElementById('language').className){
    case 'C':
        language = 'text/x-csrc'
        break 
    case 'Java':
        language = 'text/x-java'
        break 
    case 'Javascript':
        language = 'text/javascript'
        break 
    case 'Python':
        language = 'text/x-python' 
   }
   

let main = document.getElementById("mainSaved");
let text = main.textContent || main.innerText;
var editor = CodeMirror(
    function(node){
        main.parentNode.replaceChild(node, main)
    },{
  value: text,
  mode: language
});

document.getElementsByTagName('textarea')[0].disabled = true