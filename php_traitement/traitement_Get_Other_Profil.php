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
    $sqlGetOtherProfil = 'SELECT * FROM users WHERE id_users = :userId';
    $getOtherProfil = $db->prepare($sqlGetOtherProfil);
    $getOtherProfil->execute(array(':userId' => $json['id_users']));
    $getOtherProfil->execute();
    $sessionOtherProfilResult = $getOtherProfil->fetchAll();
    $abonnementResult = [];

    foreach ($sessionOtherProfilResult as $otherProfil) {
        $sqlCountAbonnementProfil = 'SELECT COUNT(*) FROM follower WHERE id_users = :userId'; 
        $CountAbonnement = $db->prepare($sqlCountAbonnementProfil);
        $sqlParams = [
            'userId' => $otherProfil["id_users"],
        ];
        $CountAbonnement->execute($sqlParams) or die($db->errorInfo());
        $nombreAbonnement = $CountAbonnement->fetchAll();

        $otherProfil["nbAbonnement"] = $nombreAbonnement[0][0];

        $sqlCountAbonneProfil = 'SELECT COUNT(*) FROM follower WHERE id_followers = :userId'; 
        $CountAbonne = $db->prepare($sqlCountAbonneProfil);
        $sqlParams = [
            'userId' => $otherProfil["id_users"],
        ];
        $CountAbonne->execute($sqlParams) or die($db->errorInfo());
        $nombreAbonne = $CountAbonne->fetchAll();

        $otherProfil["nbAbonne"] = $nombreAbonne[0][0];

        $sqlCheckFollow = 'SELECT * FROM follower WHERE id_users = :id_users AND id_followers = :id_followers';
        $checkFollow = $db->prepare($sqlCheckFollow);
        $sqlParams = [
            'id_users' => $userId,
            'id_followers' => $json['id_users']
        ];
        $checkFollow->execute($sqlParams);
        $followResult = $checkFollow->fetchAll();
        if(sizeof($followResult) > 0) {
            $otherProfil["verifFollow"] = 0;
        }else{
            $otherProfil["verifFollow"] = 1;
        }

        array_push($abonnementResult, $otherProfil);
    }

    echo json_encode($abonnementResult);
}
?>