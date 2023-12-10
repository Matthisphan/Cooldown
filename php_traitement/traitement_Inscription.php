<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Methods: *');
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

if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
    die;
}

$json = json_decode(file_get_contents('php://input'), true);

$stmt = $db->prepare("SELECT pseudo FROM users WHERE pseudo = :pseudo");
$stmt->execute(array(':pseudo' => $json['pseudo']));
if($stmt->rowCount() > 0){
    // Code à exécuter si des résultats ont été trouvés
    echo ("Le Pseudo est déjà pris");
} else {
    $stmt2 = $db->prepare("SELECT email FROM users WHERE email = :email");
    $stmt2->execute(array(':email' => $json['email']));
    if($stmt2->rowCount() > 0){
        // Code à exécuter si des résultats ont été trouvés
        echo ("Le email est déjà existant");
    } else {
        // Code à exécuter si aucun résultat n'a été trouvé
        if(array_key_exists('prenom', $json) && $json['prenom'] != null && strlen($json['prenom']) >= 2
        && array_key_exists('nom', $json) && $json['nom'] != null && strlen($json['nom']) >= 2
        && array_key_exists('pseudo', $json)&& $json['pseudo'] != null && strlen($json['pseudo']) <= 16 && strlen($json['pseudo']) >= 4
        && array_key_exists('email', $json)&& $json['email'] != null && strlen($json['email']) >= 6
        && array_key_exists('password', $json) && $json['password'] != null && strlen($json['password']) >= 6)
{  
        $sql = 'INSERT INTO users(prenom, nom, pseudo, email, password) VALUES (:prenom, :nom, :pseudo, :email, :password)';    
        $insertUser = $db->prepare($sql);
        $sqlParams = [
            'prenom' => $json["prenom"],
            'nom' => $json["nom"],
            'pseudo' => $json["pseudo"],
            'email' => $json["email"],
            'password' => password_hash($json["password"], PASSWORD_DEFAULT)
        ];
        
        
        $insertUser->execute($sqlParams) or die($db->errorInfo());
        
        json_encode($sqlParams);    
        }else{
            http_response_code(400);
            echo 'Verifiez les paramètres : au moins 2 caractères pour prénom/nom, entre 4 et 16 pour pseudo, au moins 6 caractères pour le mail et le mot de passe'; 
        }
    }
}
?>

