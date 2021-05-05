
function sendRequest(){
    const info = {
        main: document.getElementById('main').value,
        syntax: document.getElementById('syntax').value,
        expiration: document.getElementById('expiration').value,
        name: document.getElementById('name').value
    }
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            if(this.response === '0'){
                document.getElementById('main').placeholder = 'Please writte here !!'
                return
            }
            window.location.href = '/' + this.response
        }
    }
    xhttp.open("POST", "/", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(info));
}



function copy(){
    range = document.createRange()
    range.selectNode(document.getElementById('mainSaved'))
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
}