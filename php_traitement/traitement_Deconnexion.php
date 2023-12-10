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

$stmt = $db->prepare("SELECT * FROM tsession WHERE token = :token");
$stmt->bindValue(':token', $json['token']);
$stmt->execute();

if($json === null) {
    echo("Erreur : données JSON invalides");
    exit();
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
            echo 'Une erreur est survenue veuillez vous reconnecter.';
        } else {
            $isAuth = true;
            $userId = $sessionResult[0]['userId'];
        }
    }
}

if($isAuth){
    // Deconnection et recup
    $deconnection = $db->prepare("UPDATE users SET etat = 2, last_connect = NOW() WHERE id_users = :userId");
    $deconnection->bindParam(':userId', $userId);
    $deconnection->execute();
    json_encode($deconnection);


    // Detruit son token
    $token = $json['token'];
    $delToken = $db->prepare("DELETE FROM tsession WHERE token = :token");
    $delToken->bindValue(':token', $token);
    $delToken->execute();
}