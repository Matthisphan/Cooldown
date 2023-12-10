//-----------------------------------------------------------------

function traitement_Get_Coolup() {
    token = localStorage.getItem("token");
    httpRequestGetParametre = new XMLHttpRequest();
    httpRequestGetParametre.onreadystatechange = Get_Coolup;
    httpRequestGetParametre.open('GET', `${baseUri}/php_traitement/traitement_Get_Parametre.php`, true);
    httpRequestGetParametre.setRequestHeader("Content-Type", "application/json");
    httpRequestGetParametre.setRequestHeader("authorization", token)
    httpRequestGetParametre.send();
  }
  
function Get_Coolup() {
    if (httpRequestGetParametre.readyState === XMLHttpRequest.DONE) {
        if (httpRequestGetParametre.status === 200) {
        const parametres = JSON.parse(httpRequestGetParametre.responseText);
        let resultParametre = "";
        for (const parametre of parametres) {
            const htmlParametre=`
            <div id="haut">
              <div class="partieParamHaute">
                <div class="parametersProfile">
                 <p>Soit meilleurs, soit </p><p class="red">‎ coolup</p>
                </div>
              </div>
            </div>
            </div>
            <div id="milieu"><div class="separation"></div></div>
            <div id="bas">
              <div class="parametreGeneral">
                <div class="parametrePublique">
                   <h1 class="title"> Pour seulement 5€ par mois </h1>
                </div>
                <div class="parametrePublique">
                  <h1> Des avantages de malade </h1>
                  <h3> des bordures de toutes les couleurs </h3>
                  <div class="bbox">
                    <img class="redb" src="ressources/profilpic/${parametre.profil}">
                    <img class="blueb" src="ressources/profilpic/${parametre.profil}">
                    <img class="greenb" src="ressources/profilpic/${parametre.profil}">
                    <img class="purpleb" src="ressources/profilpic/${parametre.profil}">
                  </div>
                  <h3> un état en bleu, parce que c'est la classe ! </h3>
                  <div class="bbox2">
                    <img class="etati" src="ressources/profilpic/${parametre.profil}">
                    <div class="pseudo"><p>${parametre.pseudo}</p></div>
                    <div class="etatB"></div>
                  </div>
                  <h3> 1h de plus par jour </h3>
                  <div class="bbox">
                    <p> 2H DE FUNNNNNN</p>
                  </div>
                  <h3> Une biographie 2X plus grande :O </h3>
                  <div class="bbox3">
                  <img src="ressources/profilpic/${parametre.profil}">
                    <div class="bioo">
                    <div class="pseudoEtEtat">
                      <div class="pseudo"><p>${parametre.pseudo}</p></div>
                      <div class="etatB"></div>
                    </div>
                    <h6>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</h6>
                  </div>
                  </div>
                </div>
                </div>
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