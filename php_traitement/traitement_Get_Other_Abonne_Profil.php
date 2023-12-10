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
        } else {
            $isAuth = true;
            $userId = $sessionResult[0]['userId'];
        }
    }
}

if($isAuth){
    $sqlGetOtherAbonneProfil = 'SELECT * FROM follower JOIN users ON follower.id_users = users.id_users WHERE follower.id_followers = :id_users'; 
    $getOtherAbonneProfil = $db->prepare($sqlGetOtherAbonneProfil);
    $getOtherAbonneProfil->execute(array(':id_users' => $json['id_users']));
    $sessionOtherAbonneProfilResult = $getOtherAbonneProfil->fetchAll();
    $otherAbonneProfilResult = [];

    foreach ($sessionOtherAbonneProfilResult as $otherAbonneProfil) {
        $sqlCheckFollow = 'SELECT * FROM follower WHERE id_users = :id_users AND id_followers = :id_followers';
        $checkFollow = $db->prepare($sqlCheckFollow);
        $sqlParams = [
            'id_users' => $json['id_users'],
            'id_followers' => $otherAbonneProfil['id_users']
        ];
        $checkFollow->execute($sqlParams);
        $followResult = $checkFollow->fetchAll();
        if(sizeof($followResult) > 0) {
            $otherAbonneProfil["verifFollow"] = 0;
        }else{
            $otherAbonneProfil["verifFollow"] = 1;
        }
    
        array_push($otherAbonneProfilResult, $otherAbonneProfil);
    }
    
    echo json_encode($otherAbonneProfilResult);
    }
    ?>
