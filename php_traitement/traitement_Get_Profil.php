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
    $sqlGetProfil = 'SELECT * FROM users WHERE id_users = :userId'; 
    $getProfil = $db->prepare($sqlGetProfil);
    $getProfil->execute(array(':userId' => $userId));
    $getProfil->execute();
    $sessionProfilResult = $getProfil->fetchAll();
    $abonnementResult = [];

    foreach ($sessionProfilResult as $profil) {
        $sqlCountAbonnementProfil = 'SELECT COUNT(*) FROM follower WHERE id_users = :userId'; 
        $CountAbonnement = $db->prepare($sqlCountAbonnementProfil);
        $sqlParams = [
            'userId' => $profil["id_users"],
        ];
        $CountAbonnement->execute($sqlParams) or die($db->errorInfo());
        $nombreAbonnement = $CountAbonnement->fetchAll();

        $profil["nbAbonnement"] = $nombreAbonnement[0][0];

        $sqlCountAbonneProfil = 'SELECT COUNT(*) FROM follower WHERE id_followers = :userId'; 
        $CountAbonne = $db->prepare($sqlCountAbonneProfil);
        $sqlParams = [
            'userId' => $profil["id_users"],
        ];
        $CountAbonne->execute($sqlParams) or die($db->errorInfo());
        $nombreAbonne = $CountAbonne->fetchAll();

        $profil["nbAbonne"] = $nombreAbonne[0][0];
        array_push($abonnementResult, $profil);
    }

    echo json_encode($abonnementResult);
}
?>
