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
    $sqlGetSuggestion = 'SELECT * FROM users WHERE id_users NOT IN (SELECT id_followers FROM follower WHERE id_users = :userId) ORDER BY etat'; 

    $getSuggestion = $db->prepare($sqlGetSuggestion);
    $getSuggestion->execute(array(':userId' => $userId));
    $getSuggestion->execute();
    $sessionSuggestionResult = $getSuggestion->fetchAll();
    $suggestionResult = [];
    foreach ($sessionSuggestionResult as $suggestion) {
        $sqlCheckFollow = 'SELECT * FROM follower WHERE id_users = :id_users AND id_followers = :id_followers';
        $checkFollow = $db->prepare($sqlCheckFollow);
        $sqlParams = [
            'id_users' => $userId,
            'id_followers' => $suggestion[0][0]
        ];
        $checkFollow->execute($sqlParams);
        $followResult = $checkFollow->fetchAll();
        if(sizeof($followResult) > 0) {
            $suggestion["verifFollow"] = 1;
        }else{
            $suggestion["verifFollow"] = 0;
        }

        array_push($suggestionResult, $suggestion);
    }

    echo json_encode($suggestionResult);
    
}
?>