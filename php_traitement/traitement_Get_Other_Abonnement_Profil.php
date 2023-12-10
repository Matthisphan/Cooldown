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
    $sqlGetOtherAbonnementProfil = 'SELECT * FROM follower JOIN users ON follower.id_followers = users.id_users WHERE follower.id_users = :id_users'; 
    $getOtherAbonnementProfil = $db->prepare($sqlGetOtherAbonnementProfil);
    $getOtherAbonnementProfil->execute(array(':id_users' => $json['id_users']));
    $sessionOtherAbonnementProfilResult = $getOtherAbonnementProfil->fetchAll();
}
echo json_encode($sessionOtherAbonnementProfilResult);
?>
