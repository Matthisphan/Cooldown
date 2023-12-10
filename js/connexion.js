let password = document.getElementById("mdp");
let email = document.getElementById("email");


function traitement_Connexion(){
    value_password = password.value;
    value_email = email.value;

    httpRequestConnexion = new XMLHttpRequest();
    httpRequestConnexion.onreadystatechange = Connexion;
    httpRequestConnexion.open('POST', `${baseUri}/php_traitement/traitement_Login.php`, true);
    httpRequestConnexion.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({"email": value_email, "password": value_password});
    httpRequestConnexion.send(data);
}

function Connexion() {
    if (httpRequestConnexion.readyState === XMLHttpRequest.DONE) {
        if (httpRequestConnexion.status === 200) {
            let response = httpRequestConnexion.responseText;
            if (response && response.trim() !== '') { // Vérifier si la réponse n'est pas vide
                let data = JSON.parse(response);
                let reponse = JSON.parse(httpRequestConnexion.responseText);
                let tpsRestant = reponse.tpsRestant;
                if (data.blocage == 1) {
                    alert("Vous êtes bloqué, veuillez attendre "+tpsRestant+" pour vous reconnecter");
                } else {
                    reponse = JSON.parse(httpRequestConnexion.responseText);
                    recup_token = reponse.token;
                    recup_userId = reponse.userId;
                    localStorage.setItem("token", recup_token);
                    localStorage.setItem("userId", recup_userId);
                    document.location.href="./index.html";
                }
            } else {
                alert("Le serveur n'a pas renvoyé de réponse.");
            }
        } else {
            alert("Une erreur s'est produite lors de la connexion");
        }
    }
}