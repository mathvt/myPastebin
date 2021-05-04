
function goBack(){
    window.history.back()
};


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
            window.location.href = '/' + this.response
        }
    }
    xhttp.open("POST", "/", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(info));
}
