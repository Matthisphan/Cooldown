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
    $sqlGetTweetProfil = 'SELECT * FROM users JOIN tweet ON tweet.id_users = :userId AND users.id_users = :userId ORDER BY timetweet DESC'; 
    $getTweetProfil = $db->prepare($sqlGetTweetProfil);
    $getTweetProfil->execute(array(':userId' => $userId));
    $sessionTweetProfilResult = $getTweetProfil->fetchAll();
    $tweetProfilResult = [];

    foreach ($sessionTweetProfilResult as $tweetProfil) {
 
 //---------------------------------------------------
 
         $sqlCountComm = 'SELECT COUNT(*) FROM tweet WHERE id_tweet_rep = :id_tweet';
         $CountComm = $db->prepare($sqlCountComm);
         $sqlParams = [
             'id_tweet' => $tweetProfil["id_tweet"],
         ];
         $CountComm->execute($sqlParams) or die($db->errorInfo());
         $nombreComm = $CountComm->fetchAll();
 
         $tweetProfil["nombrecomm"] = $nombreComm[0][0];
 
 //---------------------------------------------------
 
         $sqlCountLike = 'SELECT COUNT(*) FROM likes WHERE id_tweet = :id_tweet';
         $CountLike = $db->prepare($sqlCountLike);
         $sqlParams = [
             'id_tweet' => $tweetProfil["id_tweet"],
         ];
         $CountLike->execute($sqlParams) or die($db->errorInfo());
         $nombreLike = $CountLike->fetchAll();
 
         $tweetProfil["nombrelike"] = $nombreLike[0][0];
 
 
 
         $sqlCheckLike = 'SELECT * FROM likes WHERE id_tweet = :id_tweet AND id_users = :id_users';
         $checkLike = $db->prepare($sqlCheckLike);
         $sqlParams = [
             'id_tweet' => $tweetProfil["id_tweet"],
             'id_users' => $userId
         ];
         $checkLike->execute($sqlParams);
         $likeResult = $checkLike->fetchAll();
         if (sizeof($likeResult) > 0) {
             $tweetProfil["verifLike"] = 1;
         }else{
             $tweetProfil["verifLike"] = 0;
         }
 
 //---------------------------------------------------
 
         $sqlCountRetweet = 'SELECT COUNT(*) FROM retweet WHERE id_tweet = :id_tweet';
         $CountRetweet = $db->prepare($sqlCountRetweet);
         $sqlParams = [
             'id_tweet' => $tweetProfil["id_tweet"],
         ];
         $CountRetweet->execute($sqlParams) or die($db->errorInfo());
         $nombreRetweet = $CountRetweet->fetchAll();
 
         $tweetProfil["nombreretweet"] = $nombreRetweet[0][0];
 
 
 
         $sqlCheckRetweet = 'SELECT * FROM retweet WHERE id_tweet = :id_tweet AND id_users = :id_users';
         $checkRetweet = $db->prepare($sqlCheckRetweet);
         $sqlParams = [
             'id_tweet' => $tweetProfil["id_tweet"],
             'id_users' => $userId
         ];
         $checkRetweet->execute($sqlParams);
         $retweetResult = $checkRetweet->fetchAll();
         if(sizeof($retweetResult) > 0) {
             $tweetProfil["verifRetweet"] = 1;
         }else{
             $tweetProfil["verifRetweet"] = 0;
         }
 
 //---------------------------------------------------
 
         array_push($tweetProfilResult, $tweetProfil);
         //var_dump($tweetResult);
     }
     echo json_encode($tweetProfilResult);
}
?>
