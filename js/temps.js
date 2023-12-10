let intervalId;

traitement_Get_Temps();
intervalId = setInterval(traitement_Get_Temps, 60000);


function decrementer(newdata) {
  let temps_restant = newdata[0]['temps_restant'];
  let blocage = newdata[0]['blocage'];
  token = localStorage.getItem("token");
  
  // Décrémente la valeur de temps_restant de 1
  temps_restant--;
  traitement_Send_Temps();
  const timer = {
    temps_restant: temps_restant
  }
  let heures = Math.floor(temps_restant / 60);
  let minutes = temps_restant % 60;
  heures = heures < 10 ? "0" + heures : heures;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const temps_formatte = heures + "h" + minutes;
  const temps_formatte_mobile = heures + "<br>" + minutes;
  document.title = "Cooldown - "+ temps_formatte;
  document.getElementById("timerRestant").innerHTML=temps_formatte;
  document.getElementById("timerRestantMobile").innerHTML=temps_formatte_mobile;
  httpRequestSendTemps.send(JSON.stringify(timer));
  
  // Vérifie si temps_restant est égal à zéro après avoir décrémenté sa valeur
  if (temps_restant == 0) {
    // Incrémente la valeur de blocage de 2
    blocage ++; 
    traitement_Blocage();
    const bloc = {
      blocage: blocage
    }
    httpRequestBlocage.send(JSON.stringify(bloc));
    console.log(bloc);
    clearInterval(intervalId);
    if(blocage == 1){
      traitement_Deconnexion();
    }
  }
}


//-----------------------------------------------------------------

function traitement_Blocage(){
  httpRequestBlocage = new XMLHttpRequest();
  httpRequestBlocage.onreadystatechange = Blocage;
  httpRequestBlocage.open('POST', `${baseUri}/php_traitement/traitement_Blocage.php`, true);
  httpRequestBlocage.setRequestHeader("Content-Type", "application/json");
  httpRequestBlocage.setRequestHeader("authorization", token);
  var data = JSON.stringify({"blocage": blocage});
}

function Blocage(){
  if (httpRequestBlocage.readyState === XMLHttpRequest.DONE) {
    if (httpRequestBlocage.status === 200) {
    } 
    else {
      alert(httpRequestBlocage.responseText);
    }
  }
}

//-----------------------------------------------------------------

function traitement_Get_Temps() {
  token = localStorage.getItem("token");
  httpRequestGetTemps = new XMLHttpRequest();
  httpRequestGetTemps.onreadystatechange = Get_Temps;
  httpRequestGetTemps.open('GET', `${baseUri}/php_traitement/traitement_Get_Temps.php`, true);
  httpRequestGetTemps.setRequestHeader("Content-Type", "application/json");
  httpRequestGetTemps.setRequestHeader("authorization", token)
  httpRequestGetTemps.send();
}

function Get_Temps() {
  if (httpRequestGetTemps.readyState === XMLHttpRequest.DONE) {
    if (httpRequestGetTemps.status === 200) {
      data = httpRequestGetTemps.responseText;
      newdata = JSON.parse(data);
      temps_restant = newdata[0].temps_restant
      blocage = newdata[0].blocage
      decrementer(newdata);
    }else{
      document.location.href="./login.html";
    }
  }
}

//-----------------------------------------------------------------

function traitement_Send_Temps(){
  httpRequestSendTemps = new XMLHttpRequest();
  httpRequestSendTemps.onreadystatechange = Send_Temps;
  httpRequestSendTemps.open('POST', `${baseUri}/php_traitement/traitement_Send_Temps.php`, true);
  httpRequestSendTemps.setRequestHeader("authorization", token);
  httpRequestSendTemps.setRequestHeader("Content-Type", "application/json");
  var data = JSON.stringify({"temps_restant": temps_restant});
}


function Send_Temps(){
  if (httpRequestSendTemps.readyState === XMLHttpRequest.DONE) {
    if (httpRequestSendTemps.status === 200) {
    } 
    else {
      alert(httpRequestSendTemps.responseText);
    }
  }
}

//-----------------------------------------------------------------

function traitement_Deconnexion(){
  token = localStorage.getItem("token");
  httpRequestDeconnexion = new XMLHttpRequest();
  httpRequestDeconnexion.onreadystatechange = Deconnexion;
  httpRequestDeconnexion.open('POST', `${baseUri}/php_traitement/traitement_Deconnexion.php`, true);
  httpRequestDeconnexion.setRequestHeader("Content-Type", "application/json");
  httpRequestDeconnexion.setRequestHeader("authorization", token);
  var data = JSON.stringify({"token": token});
  httpRequestDeconnexion.send(data);
}

function Deconnexion(){
  if (httpRequestDeconnexion.readyState === XMLHttpRequest.DONE) {
  if (httpRequestDeconnexion.status === 200) {

      document.location.href="./login.html";
  } 
  else {
      alert(httpRequestDeconnexion.responseText);
  }
  }
}