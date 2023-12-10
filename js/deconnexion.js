function traitement_Deconnexion(){
    token = localStorage.getItem("token");

    httpRequestDeconnexion = new XMLHttpRequest();
    httpRequestDeconnexion.onreadystatechange = Deconnexion;
    httpRequestDeconnexion.open('POST', `${baseUri}/php_traitement/traitement_Deconnexion.php`, true);
    httpRequestDeconnexion.setRequestHeader("Content-Type", "application/json");
    httpRequestDeconnexion.setRequestHeader("authorization", token);
    var data = JSON.stringify({"token": token});
    httpRequestDeconnexion.send(data);
}

function Deconnexion(){
    if (httpRequestDeconnexion.readyState === XMLHttpRequest.DONE) {
    if (httpRequestDeconnexion.status === 200) {
        document.location.href="./login.html";
    } 
    else {
        alert(httpRequestDeconnexion.responseText);
    }
    }
}