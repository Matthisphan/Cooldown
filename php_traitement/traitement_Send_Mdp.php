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
            echo 'Une erreur est survenue veuillez vous reconnecter.';
        } else {
            $isAuth = true;
            $userId = $sessionResult[0]['userId'];
        }
    }
}

if($isAuth){
    $contenu = password_hash($json["password"], PASSWORD_DEFAULT);
    $stmt2 = $db->prepare("UPDATE users SET password = :contenu WHERE id_users = :userId");
    $stmt2->bindValue(':contenu', $contenu);
    $stmt2->bindValue(':userId', $userId);
    $stmt2->execute();
}
?>