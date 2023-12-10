function traitement_Send_Retweet(id){
    token = localStorage.getItem("token");
    id_tweet = id;

    httpRequestSendRetweet = new XMLHttpRequest();
    httpRequestSendRetweet.onreadystatechange = Retweet;
    httpRequestSendRetweet.open('POST', `${baseUri}/php_traitement/traitement_Send_Retweet.php`, true);
    httpRequestSendRetweet.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({"id_tweet": id_tweet, "token": token});
    httpRequestSendRetweet.setRequestHeader("authorization", token)
    httpRequestSendRetweet.send(data);
}

function Retweet(){
    if (httpRequestSendRetweet.readyState === XMLHttpRequest.DONE) {
    if (httpRequestSendRetweet.status === 200) {
    } 
    else {
        console.log(httpRequestSendRetweet.responseText);
        alert('Il y a eu un problème avec la requête.');
    }
    }
}

//-----------------------------------------------------------------

function traitement_Delete_Retweet(id){
    token = localStorage.getItem("token");
    id_tweet = id;

    httpRequestDeleteRetweet = new XMLHttpRequest();
    httpRequestDeleteRetweet.onreadystatechange = Delete_Retweet;
    httpRequestDeleteRetweet.open('POST', `${baseUri}/php_traitement/traitement_Delete_Retweet.php`, true);
    httpRequestDeleteRetweet.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({"id_tweet": id_tweet, "token": token});
    httpRequestDeleteRetweet.setRequestHeader("authorization", token)
    httpRequestDeleteRetweet.send(data);
}

function Delete_Retweet(){
    if (httpRequestDeleteRetweet.readyState === XMLHttpRequest.DONE) {
    if (httpRequestDeleteRetweet.status === 200) {
    } 
    else {
        console.log(httpRequestDeleteRetweet.responseText);
        alert('Il y a eu un problème avec la requête.');
    }
    }
}

