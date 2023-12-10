<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

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
    if(array_key_exists('blocage', $json)){
        $updateConn = $db->prepare("UPDATE users SET last_connect = NOW() WHERE id_users = :userId");
        $updateConn->bindParam(':userId', $userId);
        $updateConn->execute();
        $sql = 'UPDATE users SET blocage = :blocage WHERE id_users = :userId';
        $insertBlocage = $db->prepare($sql);
        $sqlParams = [
            'blocage' => $json["blocage"],
            'userId' => $userId
        ];
        $insertBlocage->execute($sqlParams) or die($db->errorInfo());
    }
}
?>