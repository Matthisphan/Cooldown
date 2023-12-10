<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

try{
    $db = new PDO(
        'mysql:host=localhost;dbname=cooldown;charset=utf8',
        'root'
    );    
    $db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(Exception $e){
    die(print_r($e));
}

foreach(getallheaders() as $name => $value){
    if($name == "authorization"){
        $sqlGetSession = 'SELECT * FROM tsession WHERE token=:token';
        $getSession = $db->prepare($sqlGetSession);
        $tokenParams = [
            'token' => $value
        ];
        $getSession->execute($tokenParams);
        $sessionResult = $getSession->fetchAll();
        if(sizeof($sessionResult) == 0){
            http_response_code(401);
        } else {
            $isAuth = true;
            $userId = $sessionResult[0]['userId'];
        }
    }
}

if($isAuth){
    $sqlGetTweet = 'SELECT id_tweet, etat, contenu, reponses, id_tweet_rep, timetweet, users.id_users,
    tweet.id_users, pseudo, profil FROM tweet JOIN users ON tweet.id_users = users.id_users WHERE reponses = 0 ORDER BY timetweet DESC ';

    $getTweet = $db->prepare($sqlGetTweet);
    $getTweet->execute();
    $sessionTweetResult = $getTweet->fetchAll();
    $tweetResult = [];

    foreach ($sessionTweetResult as $tweet) {

//---------------------------------------------------

        $sqlCountComm = 'SELECT COUNT(*) FROM tweet WHERE id_tweet_rep = :id_tweet';
        $CountComm = $db->prepare($sqlCountComm);
        $sqlParams = [
            'id_tweet' => $tweet["id_tweet"],
        ];
        $CountComm->execute($sqlParams) or die($db->errorInfo());
        $nombreComm = $CountComm->fetchAll();

        $tweet["nombrecomm"] = $nombreComm[0][0];

//---------------------------------------------------

        $sqlCountLike = 'SELECT COUNT(*) FROM likes WHERE id_tweet = :id_tweet';
        $CountLike = $db->prepare($sqlCountLike);
        $sqlParams = [
            'id_tweet' => $tweet["id_tweet"],
        ];
        $CountLike->execute($sqlParams) or die($db->errorInfo());
        $nombreLike = $CountLike->fetchAll();

        $tweet["nombrelike"] = $nombreLike[0][0];



        $sqlCheckLike = 'SELECT * FROM likes WHERE id_tweet = :id_tweet AND id_users = :id_users';
        $checkLike = $db->prepare($sqlCheckLike);
        $sqlParams = [
            'id_tweet' => $tweet["id_tweet"],
            'id_users' => $userId
        ];
        $checkLike->execute($sqlParams);
        $likeResult = $checkLike->fetchAll();
        if (sizeof($likeResult) > 0) {
            $tweet["verifLike"] = 1;
        }else{
            $tweet["verifLike"] = 0;
        }

//---------------------------------------------------

        $sqlCountRetweet = 'SELECT COUNT(*) FROM retweet WHERE id_tweet = :id_tweet';
        $CountRetweet = $db->prepare($sqlCountRetweet);
        $sqlParams = [
            'id_tweet' => $tweet["id_tweet"],
        ];
        $CountRetweet->execute($sqlParams) or die($db->errorInfo());
        $nombreRetweet = $CountRetweet->fetchAll();

        $tweet["nombreretweet"] = $nombreRetweet[0][0];



        $sqlCheckRetweet = 'SELECT * FROM retweet WHERE id_tweet = :id_tweet AND id_users = :id_users';
        $checkRetweet = $db->prepare($sqlCheckRetweet);
        $sqlParams = [
            'id_tweet' => $tweet["id_tweet"],
            'id_users' => $userId
        ];
        $checkRetweet->execute($sqlParams);
        $retweetResult = $checkRetweet->fetchAll();
        if(sizeof($retweetResult) > 0) {
            $tweet["verifRetweet"] = 1;
        }else{
            $tweet["verifRetweet"] = 0;
        }

//---------------------------------------------------

        array_push($tweetResult, $tweet);
        //var_dump($tweetResult);
    }
    echo json_encode($tweetResult);
}
?>
