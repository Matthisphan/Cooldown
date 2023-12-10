let first_name = document.getElementById("prenom");
let last_name = document.getElementById("nom");
let password = document.getElementById("mdp");
let cf_password = document.getElementById("cf_mdp");
let user_name = document.getElementById("pseudo");
let email = document.getElementById("email");


function traitement_Inscription(){
    value_first_name = first_name.value;
    value_last_name = last_name.value;
    value_password = password.value;
    value_cf_password = cf_password.value;
    value_email = email.value;
    value_user_name = user_name.value;

    if(value_password != value_cf_password || value_password == "" || value_cf_password == ""){
        alert("Erreur de saisie");
    }else{
        httpRequestInscription = new XMLHttpRequest();
        httpRequestInscription.onreadystatechange = Inscription;
        httpRequestInscription.open('POST', `${baseUri}/php_traitement/traitement_Inscription.php`, true);
        httpRequestInscription.setRequestHeader("Content-Type", "application/json");
        var data = JSON.stringify({"nom": value_last_name, "prenom": value_first_name, "pseudo": value_user_name, "password": value_password, "email": value_email});
        httpRequestInscription.send(data);
    }
}

function Inscription(){
    if (httpRequestInscription.readyState === XMLHttpRequest.DONE) {
    if (httpRequestInscription.status === 200) {
        document.location.href="./login.html";
    } 
    else {
        alert('Verifiez les paramètres : au moins 2 caractères pour prénom/nom, moins de 16 pour pseudo, au moins 6 caractères pour le mail et le mot de passe.');
    }
    }
}