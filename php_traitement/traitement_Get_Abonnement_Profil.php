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
    $sqlGetAbonnementProfil = 'SELECT * FROM follower JOIN users ON follower.id_followers = users.id_users WHERE follower.id_users = :userId'; 
    $getAbonnementProfil = $db->prepare($sqlGetAbonnementProfil);
    $getAbonnementProfil->execute(array(':userId' => $userId));
    $sessionAbonnementProfilResult = $getAbonnementProfil->fetchAll();
    $abonnementProfilResult = [];

foreach ($sessionAbonnementProfilResult as $abonnementProfil) {
    $sqlCheckFollow = 'SELECT * FROM follower WHERE id_users = :id_followers AND id_followers = :id_users';
    $checkFollow = $db->prepare($sqlCheckFollow);
    $sqlParams = [
        'id_users' => $userId,
        'id_followers' => $abonnementProfil['id_users']
    ];
    $checkFollow->execute($sqlParams);
    $followResult = $checkFollow->fetchAll();
    if(sizeof($followResult) > 0) {
        $abonnementProfil["verifFollow"] = 0;
    }else{
        $abonnementProfil["verifFollow"] = 1;
    }

    array_push($abonnementProfilResult, $abonnementProfil);
}

echo json_encode($abonnementProfilResult);
}
?>
