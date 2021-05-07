function getValue(){
    return {
        main: document.getElementById('main').value,
        syntax: document.getElementById('syntax').value,
        expiration: document.getElementById('expiration').value,
        name: document.getElementById('name').value
    }
}


async function sendRequest(){
    const info = getValue()
    const res = await fetch('/',{
        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    })
    console.log(res)
    if (res.status == 200){
        let hash = await res.text()
        if(hash === '0'){
            document.getElementById('main').placeholder = 'Please write here !!'
            return
        }
        window.location.href = '/' + hash
    }
}


function copy(){
    let range = document.createRange()
    range.selectNode(document.getElementById('mainSaved'))
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
}



/*
function sendRequest(){
    const info = getValue()
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            if(this.response === '0'){
                document.getElementById('main').placeholder = 'Please write here !!'
                return
            }
            window.location.href = '/' + this.response
        }
    }
    xhttp.open("POST", "/", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(info));
}
*/