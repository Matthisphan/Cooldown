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

if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
    echo "";
    die;
}

if(array_key_exists('email', $json) && $json['email'] != null
    && array_key_exists('password', $json) && $json['password'] != null){   
    $sql = 'SELECT * FROM users WHERE email=:email';
    $getUser = $db->prepare($sql);
    $sqlParams = [
        'email' => $json["email"]
    ];      
    $getUser->execute($sqlParams) or die($db->errorInfo());
    $result = $getUser->fetchAll();
    $userId = $result[0]['id_users'];
    if(sizeof($result) > 0 && password_verify($json['password'],$result[0]['password'])){
        $sqlGetTimer = 'SELECT * FROM users WHERE id_users = :userId';
        $getTime = $db->prepare($sqlGetTimer);
        $getTime->execute(['userId' => $userId]);
        $resultTime = $getTime->fetchAll();
        // Recupère les 3 données nécessaires
        $temps_restant = $resultTime[0]['temps_restant'];
        $blocage = $resultTime[0]['blocage'];
        $last_connect = $resultTime[0]['last_connect'];
        if($blocage == 1){ 
            $date_24 = date('Y-m-d H:i:s', strtotime($last_connect . ' +1 day'));
            if (strtotime($date_24) <= time()) {
                $resetTimer = $db->prepare("UPDATE users SET temps_restant = 60, blocage = 0, WHERE id_users = :userId");
                $resetTimer->bindParam(':userId', $userId);
                $resetTimer->execute();
                json_encode($resetTimer);
                // Genere le token et démarre la session
                $token = openssl_random_pseudo_bytes(16);
                $token = bin2hex($token);
                $sqlInsertToken = 'INSERT INTO tsession (token, userId) VALUES (:token, :userId)';
                $insertToken = $db->prepare($sqlInsertToken);

                // Connected

                $connection = $db->prepare("UPDATE users SET etat = 0, last_connect = NOW() WHERE id_users = :userId");
                $connection->bindParam(':userId', $userId);
                $connection->execute();
                json_encode($connection);
    

                // Verif Token
                $sqlCheckToken = 'SELECT * FROM tsession WHERE id_users = :userId';
                $checkToken = $db->prepare($sqlCheckToken);
                $sqlTokenParams = [
                    'userId' => $userId
                ];
                $checkToken->execute($sqlTokenParams);
                $tokenResult = $checkToken->fetchAll();
                if (sizeof($tokenResult) != 0) {
                    $sqlDeleteToken = 'DELETE FROM token WHERE id_users = :id_users';
                    $deleteToken = $db->prepare($sqlDeleteToken);
                    $deleteToken->execute($sqlTokenParams) or die($db->errorInfo());
                }
                // Insertion de Token
                $insertToken->execute(['token' => $token,  'userId' => $userId]);
                echo json_encode(["token" => $token, "userId" => $result[0]['id_users']]); 
            }else{
                $last_connect = strtotime($resultTime[0]['last_connect']);
                if ($last_connect === false) {
                    // La valeur de last_connect n'est pas une date valide
                    die('Erreur: la date de la dernière connexion est invalide');
                }

                // Calcul du temps restant avant la prochaine connexion autorisée
                $temps_attente = $last_connect + 86400 - time(); // 86400 secondes = 24 heures
                if ($temps_attente < 0) {
                    $temps_attente = 0;
                }
                $heures = floor($temps_attente / 3600);
                $minutes = floor(($temps_attente % 3600) / 60);
                // Affichage du temps restant
                echo json_encode([ 
                    "tpsRestant" => $heures."h".$minutes,
                    "blocage" => $blocage
                ]);
            }
        }else{
            $date_24 = date('Y-m-d H:i:s', strtotime($last_connect . ' +1 day'));
            if (strtotime($date_24) <= time()) {
                $resetTimer = $db->prepare("UPDATE users SET temps_restant = 60, blocage = 0, WHERE id_users = :userId");
                $resetTimer->bindParam(':userId', $userId);
                $resetTimer->execute();
                json_encode($resetTimer);
            }
            $token = openssl_random_pseudo_bytes(16);
            $token = bin2hex($token);
            $sqlInsertToken = 'INSERT INTO tsession (token, userId) VALUES (:token, :userId)';
            $insertToken = $db->prepare($sqlInsertToken);

            // Connected

            $connection = $db->prepare("UPDATE users SET etat = 0, last_connect = NOW() WHERE id_users = :userId");
            $connection->bindParam(':userId', $userId);
            $connection->execute();
            json_encode($connection);

            // Verif Token
            $sqlCheckToken = 'SELECT * FROM tsession WHERE userId = :userId';
            $checkToken = $db->prepare($sqlCheckToken);
            $sqlTokenParams = [
                ':userId' => $userId
            ];
            $checkToken->execute($sqlTokenParams);
            $tokenResult = $checkToken->fetchAll();
            if (sizeof($tokenResult) > 0) {
                $sqlDeleteToken = 'DELETE FROM tsession WHERE userId = :userId';
                $deleteToken = $db->prepare($sqlDeleteToken);
                $deleteToken->execute($sqlTokenParams) or die($db->errorInfo());
            }
            // Insertion de Token
            $insertTokenParams = [
                ':token' => $token,
                ':userId' => $userId
            ];
            $insertToken->execute($insertTokenParams);
            echo json_encode(["token" => $token, "userId" => $result[0]['id_users']]);
        }
    }  
    else{
        http_response_code(404);
        echo 'l\'utilisateur est introuvable vérifier le userName et le password, êtes vous inscrit ?';
    }
}
else{
    http_response_code(400);
    echo 'Verifiez les paramètres : userName & password'; 
}