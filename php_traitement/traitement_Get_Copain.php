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
    $sqlGetCopain = 'SELECT DISTINCT u.*
    FROM follower f1
    JOIN users u ON f1.id_followers = u.id_users
    INNER JOIN follower f2 ON f1.id_followers = f2.id_users AND f1.id_users = f2.id_followers
    WHERE f1.id_users = :userId AND f1.id_followers != :userId ORDER BY u.pseudo'; 
    $getCopain = $db->prepare($sqlGetCopain);
    $getCopain->execute(array(':userId' => $userId));
    $getCopain->execute();
    $sessionCopainResult = $getCopain->fetchAll();
    echo json_encode($sessionCopainResult);
}
?>