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
    $sqlGetAbonneProfil = 'SELECT * FROM follower JOIN users ON follower.id_users = users.id_users WHERE follower.id_followers = :userId'; 
    $getAbonneProfil = $db->prepare($sqlGetAbonneProfil);
    $getAbonneProfil->execute(array(':userId' => $userId));
    $sessionAbonneProfilResult = $getAbonneProfil->fetchAll();
    $abonneProfilResult = [];

foreach ($sessionAbonneProfilResult as $abonneProfil) {
    $sqlCheckFollow = 'SELECT * FROM follower WHERE id_users = :id_users AND id_followers = :id_followers';
    $checkFollow = $db->prepare($sqlCheckFollow);
    $sqlParams = [
        'id_users' => $userId,
        'id_followers' => $abonneProfil['id_users']
    ];
    $checkFollow->execute($sqlParams);
    $followResult = $checkFollow->fetchAll();
    if(sizeof($followResult) > 0) {
        $abonneProfil["verifFollow"] = 0;
    }else{
        $abonneProfil["verifFollow"] = 1;
    }

    array_push($abonneProfilResult, $abonneProfil);
}

echo json_encode($abonneProfilResult);
}
?>
