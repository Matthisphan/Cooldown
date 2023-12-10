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
    if(array_key_exists('id_followers', $json) && $json['id_followers'] != null){
        if($json['id_followers'] == $userId){
            echo("Vous ne pouvez pas ne plus vous suivre");
        } else {
            $sqlCheckFollower = 'SELECT * FROM follower WHERE id_followers = :id_followers AND id_users = :id_users';
            $checkFollower = $db->prepare($sqlCheckFollower);
            $sqlParams = [
                'id_followers' => $json["id_followers"],
                'id_users' => $userId
            ];
            $checkFollower->execute($sqlParams);
            $followerResult = $checkFollower->fetchAll();
            if(sizeof($followerResult) > 0){
                $sql = 'DELETE FROM follower WHERE id_followers = :id_followers AND id_users = :id_users';
                $deleteFollower = $db->prepare($sql);
                $deleteFollower->execute($sqlParams) or die($db->errorInfo());
                echo "Vous ne suivez plus cette personne";
            } else {
                echo "Vous ne suivez pas encore cette personne";
            }
        }
    }
}