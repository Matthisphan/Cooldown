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

if ($isAuth) {
    if (array_key_exists('id_tweet', $json) && $json['id_tweet'] != null) {
        $sqlCheckLike = 'SELECT * FROM likes WHERE id_tweet = :id_tweet AND id_users = :id_users';
        $checkLike = $db->prepare($sqlCheckLike);
        $sqlParams = [
            'id_tweet' => $json["id_tweet"],
            'id_users' => $userId
        ];
        $checkLike->execute($sqlParams);
        $likeResult = $checkLike->fetchAll();
        if (sizeof($likeResult) == 0) {
            echo "Vous n'avez pas encore aimé ce tweet";
        } else {
            $sql = 'DELETE FROM likes WHERE id_tweet = :id_tweet AND id_users = :id_users';
            $deleteLike = $db->prepare($sql);
            $deleteLike->execute($sqlParams) or die($db->errorInfo());
            echo "Le like a été supprimé";
        }
    }
}
?> 