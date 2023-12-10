const likeBtn = document.getElementById('likeBtn');
const dislikeBtn = document.getElementById('dsLikeBtn');

function traitement_Send_Like(id){
    token = localStorage.getItem("token");
    id_tweet = id;

    httpRequestSendLike = new XMLHttpRequest();
    httpRequestSendLike.onreadystatechange = Like;
    httpRequestSendLike.open('POST', `${baseUri}/php_traitement/traitement_Send_Like.php`, true);
    httpRequestSendLike.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({"id_tweet": id_tweet, "token": token});
    httpRequestSendLike.setRequestHeader("authorization", token)
    httpRequestSendLike.send(data);
}

function Like(){
    if (httpRequestSendLike.readyState === XMLHttpRequest.DONE) {
    if (httpRequestSendLike.status === 200) {
    } 
    else {
        console.log(httpRequestSendLike.responseText);
        alert('Il y a eu un problème avec la requête.');
    }
    }
}

//-----------------------------------------------------------------

function traitement_Delete_Like(id){
    token = localStorage.getItem("token");
    id_tweet = id;

    httpRequestDeleteLike = new XMLHttpRequest();
    httpRequestDeleteLike.onreadystatechange = Delete_Like;
    httpRequestDeleteLike.open('POST', `${baseUri}/php_traitement/traitement_Delete_Like.php`, true);
    httpRequestDeleteLike.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({"id_tweet": id_tweet, "token": token});
    httpRequestDeleteLike.setRequestHeader("authorization", token)
    httpRequestDeleteLike.send(data);
}

function Delete_Like(){
    if (httpRequestDeleteLike.readyState === XMLHttpRequest.DONE) {
    if (httpRequestDeleteLike.status === 200) {

    } 
    else {
        console.log(httpRequestDeleteLike.responseText);
        alert('Il y a eu un problème avec la requête.');
    }
    }
}
