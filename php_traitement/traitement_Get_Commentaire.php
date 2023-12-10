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

$json = json_decode(file_get_contents('php://input'), true);

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
            echo 'Une erreur est survenue veuillez vous reconnecter.';
        } else {
            $isAuth = true;
            $userId = $sessionResult[0]['userId'];
        }
    }
}

if($isAuth){
    $sqlCommentaire = 'SELECT * FROM tweet JOIN users ON tweet.id_users = users.id_users WHERE id_tweet_rep = :id_tweet ORDER BY timetweet DESC';
    $getComm = $db->prepare($sqlCommentaire);
    $getComm->execute(array(':id_tweet' => $json['id_tweet']));
    $sessionCommResult = $getComm->fetchAll();
    $commResult = [];

   foreach ($sessionCommResult as $comm) {

//---------------------------------------------------

        $sqlCountComm = 'SELECT COUNT(*) FROM tweet WHERE id_tweet_rep = :id_tweet';
        $CountComm = $db->prepare($sqlCountComm);
        $sqlParams = [
            'id_tweet' => $comm["id_tweet"],
        ];
        $CountComm->execute($sqlParams) or die($db->errorInfo());
        $nombreComm = $CountComm->fetchAll();

        $comm["nombrecomm"] = $nombreComm[0][0];

//---------------------------------------------------

        $sqlCountLike = 'SELECT COUNT(*) FROM likes WHERE id_tweet = :id_tweet';
        $CountLike = $db->prepare($sqlCountLike);
        $sqlParams = [
            'id_tweet' => $comm["id_tweet"],
        ];
        $CountLike->execute($sqlParams) or die($db->errorInfo());
        $nombreLike = $CountLike->fetchAll();

        $comm["nombrelike"] = $nombreLike[0][0];



        $sqlCheckLike = 'SELECT * FROM likes WHERE id_tweet = :id_tweet AND id_users = :id_users';
        $checkLike = $db->prepare($sqlCheckLike);
        $sqlParams = [
            'id_tweet' => $comm["id_tweet"],
            'id_users' => $userId
        ];
        $checkLike->execute($sqlParams);
        $likeResult = $checkLike->fetchAll();
        if (sizeof($likeResult) > 0) {
            $comm["verifLike"] = 1;
        }else{
            $comm["verifLike"] = 0;
        }

//---------------------------------------------------

        $sqlCountRetweet = 'SELECT COUNT(*) FROM retweet WHERE id_tweet = :id_tweet';
        $CountRetweet = $db->prepare($sqlCountRetweet);
        $sqlParams = [
            'id_tweet' => $comm["id_tweet"],
        ];
        $CountRetweet->execute($sqlParams) or die($db->errorInfo());
        $nombreRetweet = $CountRetweet->fetchAll();

        $comm["nombreretweet"] = $nombreRetweet[0][0];



        $sqlCheckRetweet = 'SELECT * FROM retweet WHERE id_tweet = :id_tweet AND id_users = :id_users';
        $checkRetweet = $db->prepare($sqlCheckRetweet);
        $sqlParams = [
            'id_tweet' => $comm["id_tweet"],
            'id_users' => $userId
        ];
        $checkRetweet->execute($sqlParams);
        $retweetResult = $checkRetweet->fetchAll();
        if(sizeof($retweetResult) > 0) {
            $comm["verifRetweet"] = 1;
        }else{
            $comm["verifRetweet"] = 0;
        }

//---------------------------------------------------

        array_push($commResult, $comm);
        //var_dump($tweetResult);
    }
    echo json_encode($commResult);
}
?>
