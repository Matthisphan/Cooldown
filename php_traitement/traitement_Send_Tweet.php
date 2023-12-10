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
    if(array_key_exists('contenu', $json) && $json['contenu'] != null){
        $sql = 'INSERT INTO tweet(contenu, id_users) VALUES (:contenu, :id_users)';
        $insertUser = $db->prepare($sql);
        $sqlParams = [
            'contenu' => $json["contenu"],
            'id_users' => $userId
        ];
        $insertUser->execute($sqlParams) or die($db->errorInfo());
        
        echo json_encode($sqlParams);
    }
}
?>
