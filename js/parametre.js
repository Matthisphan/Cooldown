//-----------------------------------------------------------------

function traitement_Get_Parametre() {
    token = localStorage.getItem("token");
    httpRequestGetParametre = new XMLHttpRequest();
    httpRequestGetParametre.onreadystatechange = Get_Parametre;
    httpRequestGetParametre.open('GET', `${baseUri}/php_traitement/traitement_Get_Parametre.php`, true);
    httpRequestGetParametre.setRequestHeader("Content-Type", "application/json");
    httpRequestGetParametre.setRequestHeader("authorization", token)
    httpRequestGetParametre.send();
  }
  
function Get_Parametre() {
    if (httpRequestGetParametre.readyState === XMLHttpRequest.DONE) {
        if (httpRequestGetParametre.status === 200) {
        const parametres = JSON.parse(httpRequestGetParametre.responseText);
        let resultParametre = "";
        for (const parametre of parametres) {
            const htmlParametre=`
            <div id="haut">
              <div class="partieParamHaute">
                <div class="parametersProfile">
                  <div class="profilePic">
                    <img onclick="traitement_Get_Profil()" src="ressources/profilpic/${parametre.profil}"/>
                  </div>
                  <div class="pseudo">
                    <p onclick="traitement_Get_Profil()">${parametre.pseudo}</p>
                  </div>
                  <div class="etat">
                    <div class="etat${parametre.etat}">
                 </div>
                </div>
              </div>
            </div>
            </div>
            <div id="milieu"><div class="separation"></div></div>
            <div id="bas">
              <div class="parametreGeneral">
                <div class="parametrePublique">
                  <h1> Paramètres publiques </h1>
                  <div class="etatChoix">
                    <div id="actif" class="" onclick="traitement_Send_Mini_Profil(0); changeStatusClass(this)"></div>
                    <div id="inactif" class="active" onclick="traitement_Send_Mini_Profil(1); changeStatusClass(this);"></div>
                    <div id="absent" class="" onclick="traitement_Send_Mini_Profil(2); changeStatusClass(this);"></div>
                  </div>
                  <h3> Pseudonyme </h3>
                  <div class="bbox">
                    <input type="text" id="pseudo_input" placeholder="${parametre.pseudo}">
                    <div class="button" onclick="traitement_Send_Pseudo(document.getElementById('pseudo_input').value)">v</div>
                  </div>
                  <h3> Biographie </h3>
                  <div class="bbox">
                    <textarea type="text" id="bio_input" placeholder="${parametre.bio}"></textarea>
                    <div class="button" onclick="traitement_Send_Bio(document.getElementById('bio_input').value)">v</div>
                  </div>
                </div>
                <div class="parametrePrive">
                    <h1> Paramètres privé </h1>
                    <div class="coteAll">
                      <div class="cote">
                        <h3> Nom </h3>
                       <div class="boxname">${parametre.nom}</div>
                      </div>
                      <div class="cote ">
                        <h3> Prénom </h3>
                        <div class="boxname">${parametre.prenom}</div>
                     </div>
                    </div>
                    <h3> Email </h3>
                    <div class="boxmail">${parametre.email}</div>
                    <div class="bigbox">
                      <div class="mdp">
                        <h3> Mot de passe </h3>
                        <input type="password" id="mdp_input" placeholder="Nouveau mot de passe">
                        <input type="password" id="confirm_mdp_input" placeholder="Confirmation du ouveau mot de passe">
                      </div>
                      <div class="button" onclick="traitement_Send_Mdp(document.getElementById('mdp_input').value, document.getElementById('confirm_mdp_input').value)">v</div>
                  </div>
                    <div class="boxmail2" onclick="traitement_Deconnexion()"> Deconnexion !</div>
                </div>
              </div>
              </div>
              <div class="endTweet"></div>
            `;
            resultParametre += htmlParametre;
        }
        document.getElementById("containerTwo").innerHTML=resultParametre;
        }
    }
}

//-----------------------------------------------------------------
function traitement_Send_Mdp(nv_mdp, cf_nv_mdp){
    contenu_nv_mdp = nv_mdp;
    contenu_cf_nv_mdp = cf_nv_mdp;

    if(contenu_cf_nv_mdp != contenu_nv_mdp || contenu_cf_nv_mdp == "" || contenu_nv_mdp == ""){
        alert("Erreur de saisie");
    }else{
        token = localStorage.getItem("token");      
        httpRequestSendMdp = new XMLHttpRequest();
        httpRequestSendMdp.onreadystatechange = Send_Mdp;
        httpRequestSendMdp.open('POST', `${baseUri}/php_traitement/traitement_Send_Mdp.php`, true);
        httpRequestSendMdp.setRequestHeader("Content-Type", "application/json");
        httpRequestSendMdp.setRequestHeader("authorization", token);
        var data = JSON.stringify({"password": contenu_nv_mdp, "token": token});
        httpRequestSendMdp.send(data);
    }
}
  function Send_Mdp(){
    if (httpRequestSendMdp.readyState === XMLHttpRequest.DONE) {
      if (httpRequestSendMdp.status === 200) {
        alert("votre mot de passe est modifié avec succès !, Vous allez être déconnecté")
        traitement_deconnexion();
      } 
    }
  }

//-----------------------------------------------------------------

function traitement_Send_Pseudo(contenuValue){
    token = localStorage.getItem("token");
    contenu = contenuValue;
  
    httpRequestSendPseudo = new XMLHttpRequest();
    httpRequestSendPseudo.onreadystatechange = Send_Pseudo;
    httpRequestSendPseudo.open('POST', `${baseUri}/php_traitement/traitement_Send_Pseudo.php`, true);
    httpRequestSendPseudo.setRequestHeader("Content-Type", "application/json");
    httpRequestSendPseudo.setRequestHeader("authorization", token);
    var data = JSON.stringify({"pseudo": contenu, "token": token});
    httpRequestSendPseudo.send(data);
}
  
function Send_Pseudo(){
    if (httpRequestSendPseudo.readyState === XMLHttpRequest.DONE) {
        if (httpRequestSendPseudo.status === 200) {
        traitement_Get_Parametre();
        } 
    }
}

//-----------------------------------------------------------------