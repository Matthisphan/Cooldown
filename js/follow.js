function traitement_Send_Follow(id){
    token = localStorage.getItem("token");
    id_followers = id;

    httpRequestSendFollow = new XMLHttpRequest();
    httpRequestSendFollow.onreadystatechange = Follow;
    httpRequestSendFollow.open('POST', `${baseUri}/php_traitement/traitement_Send_Follow.php`, true);
    httpRequestSendFollow.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({"id_followers": id_followers, "token": token});
    httpRequestSendFollow.setRequestHeader("authorization", token)
    httpRequestSendFollow.send(data);
}

function Follow(){
    if (httpRequestSendFollow.readyState === XMLHttpRequest.DONE) {
    if (httpRequestSendFollow.status === 200) {
    } 
    else {
        console.log(httpRequestSendFollow.responseText);
        alert('Il y a eu un problème avec la requête.');
    }
    }
}

//-----------------------------------------------------------------

function traitement_Delete_Follow(id){
    token = localStorage.getItem("token");
    id_followers = id;

    httpRequestDeleteFollow = new XMLHttpRequest();
    httpRequestDeleteFollow.onreadystatechange = Delete_Follow;
    httpRequestDeleteFollow.open('POST', `${baseUri}/php_traitement/traitement_Delete_Follow.php`, true);
    httpRequestDeleteFollow.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({"id_followers": id_followers, "token": token});
    httpRequestDeleteFollow.setRequestHeader("authorization", token)
    httpRequestDeleteFollow.send(data);
}

function Delete_Follow(){
    if (httpRequestDeleteFollow.readyState === XMLHttpRequest.DONE) {
    if (httpRequestDeleteFollow.status === 200) {
    } 
    else {
        console.log(httpRequestDeleteFollow.responseText);
        alert('Il y a eu un problème avec la requête.');
    }
    }
}

//-----------------------------------------------------------------