tweetInput = document.getElementById("tweetInput");
traitement_Get_Tweet();
traitement_Get_Form_Tweet();
traitement_Get_Mini_Profil();
traitement_Get_Copain();
traitement_Get_Suggestion();
var mois = ['JANV.', 'FEVR.', 'MARS', 'AVR.', 'MAI', 'JUIN', 'JUILL', 'AOUT', 'SEPT.', 'OCT.', 'NOV.', 'DEC.'];

//-----------------------------------------------------------------

function traitement_Get_Form_Tweet() {
  token = localStorage.getItem("token");
  httpRequestGetFormTweet = new XMLHttpRequest();
  httpRequestGetFormTweet.onreadystatechange = Get_Form_Tweet;
  httpRequestGetFormTweet.open('GET', `${baseUri}/php_traitement/traitement_Get_Form_Tweet.php`, true);
  httpRequestGetFormTweet.setRequestHeader("Content-Type", "application/json");
  httpRequestGetFormTweet.setRequestHeader("authorization", token);
  httpRequestGetFormTweet.send();
}


function Get_Form_Tweet() {
  if (httpRequestGetFormTweet.readyState === XMLHttpRequest.DONE) {
    if (httpRequestGetFormTweet.status === 200) {
      const userId = localStorage.getItem("userId");
      const formTweets = JSON.parse(httpRequestGetFormTweet.responseText);
      let resultGetFormTweet = "";
      for (const formTweet of formTweets) {
          const htmlFormTweet=`
          <div id="sendMessage">
          <div class="containPrevTweet">
          <div class="photoEtInfo">
              <div class="photo">
                  <img onclick="traitement_Get_Other_Profil(${formTweet.id_users}); traitement_Get_Tweet_Other_Profil(${formTweet.id_users})" src="ressources/profilpic/${formTweet.profil}" alt="">
              </div>
              <div class="containerPseudoEtTweet">
                  <div class="pseudoStatut">
                   <h1 onclick="traitement_Get_Other_Profil(${formTweet.id_users}); traitement_Get_Tweet_Other_Profil(${formTweet.id_users})">${formTweet.pseudo}</h1>
                   <div class="stat${formTweet.etat}"></div>
               </div>
                  <div class="Mississive">    
                  <textarea id="tweetInput" name="tweetInput" placeholder="Missiver vos pensées ..."></textarea>                
               </div>
              </div>
          </div>
         <div class="buttonTweet">
             <div onclick="traitement_Send_Tweet()" class="missiver">
                  <p>Missiver</p>
              </div>
              <div class="uploadPhoto">
                  <img src="ressources/uploadImage.svg" alt="">
              </div>
          </div> 
      </div>
      </div>
          `;
          resultGetFormTweet += htmlFormTweet;
      }
      document.getElementById("haut").innerHTML=resultGetFormTweet;
      document.getElementById("milieu").innerHTML=`
      <div id="separation"></div>
      `
    }
  }
}

//-----------------------------------------------------------------

function traitement_Send_Tweet(){
  token = localStorage.getItem("token");
  const tweetInput = document.getElementById("tweetInput");
  value_tweetInput = tweetInput.value;
  httpRequestSendTweet = new XMLHttpRequest();
  httpRequestSendTweet.onreadystatechange = Send_Tweet;
  httpRequestSendTweet.open('POST', `${baseUri}/php_traitement/traitement_Send_Tweet.php`, true);
  httpRequestSendTweet.setRequestHeader("Content-Type", "application/json");
  httpRequestSendTweet.setRequestHeader("authorization", token);
  var data = JSON.stringify({"contenu": value_tweetInput, "token": token});
  httpRequestSendTweet.send(data);
}

function Send_Tweet(){
if (httpRequestSendTweet.readyState === XMLHttpRequest.DONE) {
  if (httpRequestSendTweet.status === 200) {
    traitement_Get_Tweet();
  }
} 
}
  
  //-----------------------------------------------------------------

function traitement_Send_Commentaire(id){
  id_tweet = id;
  token = localStorage.getItem("token");
  const commInput = document.getElementById("commInput");
  value_commInput = commInput.value;
  httpRequestSendCommentaire = new XMLHttpRequest();
  httpRequestSendCommentaire.onreadystatechange = Send_Commentaire;
  httpRequestSendCommentaire.open('POST', `${baseUri}/php_traitement/traitement_Send_Commentaire.php`, true);
  httpRequestSendCommentaire.setRequestHeader("Content-Type", "application/json");
  httpRequestSendCommentaire.setRequestHeader("authorization", token);
  var data = JSON.stringify({"contenu": value_commInput, "id_tweet": id_tweet, "token": token});
  httpRequestSendCommentaire.send(data);
}

function Send_Commentaire(){
if (httpRequestSendCommentaire.readyState === XMLHttpRequest.DONE) {
  if (httpRequestSendCommentaire.status === 200) {
    info = httpRequestSendCommentaire.responseText;
    newinfo = JSON.parse(info);
    id_tweet = newinfo.id_tweet;
    traitement_Get_Commentaire(id_tweet);
  } 
}
}

//-----------------------------------------------------------------

function traitement_Delete_Tweet(id){
  token = localStorage.getItem("token");
  id_tweet = id;
  if (confirm('Êtes vous sur de vouloir supprimer cette missive ?')) {
  httpRequestDeleteTweet = new XMLHttpRequest();
  httpRequestDeleteTweet.onreadystatechange = Delete_Tweet;
  httpRequestDeleteTweet.open('POST', `${baseUri}/php_traitement/traitement_Delete_Tweet.php`, true);
  httpRequestDeleteTweet.setRequestHeader("Content-Type", "application/json");
  httpRequestDeleteTweet.setRequestHeader("authorization", token);
  var data = JSON.stringify({"id_tweet": id_tweet, "token": token});
  httpRequestDeleteTweet.send(data);
} else {
  return
}
}
function Delete_Tweet(){
  if (httpRequestDeleteTweet.readyState === XMLHttpRequest.DONE) {
  if (httpRequestDeleteTweet.status === 200) {
      traitement_Get_Tweet();
      traitement_Get_Form_Tweet();
    } 
  }
}

  //-----------------------------------------------------------------

  function traitement_Get_Tweet() {
      token = localStorage.getItem("token");
      httpRequestGetTweet = new XMLHttpRequest();
      httpRequestGetTweet.onreadystatechange = Get_Tweet;
      httpRequestGetTweet.open('GET', `${baseUri}/php_traitement/traitement_Get_Tweet.php`, true);
      httpRequestGetTweet.setRequestHeader("Content-Type", "application/json");
      httpRequestGetTweet.setRequestHeader("authorization", token)
      httpRequestGetTweet.send();
  }


  function Get_Tweet() {
    if (httpRequestGetTweet.readyState === XMLHttpRequest.DONE) {
        if (httpRequestGetTweet.status === 200) {
            const tweets = JSON.parse(httpRequestGetTweet.responseText);
            let resultTweet = "";
            const userId = localStorage.getItem("userId");
            for (const tweet of tweets) {
              var dateJS = new Date(tweet.timetweet);
              var options = {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              };
              var date = dateJS.toLocaleDateString('fr-FR', options);
              options = {
                hour: 'numeric',
                minute: 'numeric'
              };
              var heure = dateJS.toLocaleTimeString('fr-FR', options);
              const htmlTweet = `
              <div class="containTweet">
              <div id="containerTweet">
                <div class="containMissive">
                  <div class="pp">
                    <img onclick="traitement_Get_Other_Profil(${tweet.id_users}); traitement_Get_Tweet_Other_Profil(${tweet.id_users})" src="ressources/profilpic/${tweet.profil}" alt="">
                  </div>
                  <div class="infoMissive">
                    <div class="upLine">
                      <div class="pseudoEtStatus">
                        <p onclick="traitement_Get_Other_Profil(${tweet.id_users}); traitement_Get_Tweet_Other_Profil(${tweet.id_users})">${tweet.pseudo}</p>
                        <div class="stat${tweet.etat}"></div>
                      </div>
                      ${tweet.id_users == userId ? `<div class="delTweet" onclick="traitement_Delete_Tweet(${tweet.id_tweet})">X</div> `: ''}
                    </div>
                    <div class="missive">
                      ${tweet.contenu}
                    </div>
                    <div class="reactDate">
                      <div class="containReact">
                        <div class="reactions">
                          <div class="reaction">
                            <div class="logo message">
                              <img src="ressources/missive.svg" onclick="traitement_Get_Tweet_Reponse(${tweet.id_tweet})" alt="">
                            </div>
                            <div class="textmessage">
                            ${tweet.nombrecomm}
                            </div>
                          </div>
                          <div class="reaction">
                            <div class="logo retweet">
                            ${tweet.verifRetweet == 0 ? 
                              '<img src="ressources/repartage.svg" onclick="traitement_Send_Retweet(' + tweet.id_tweet + '); traitement_Get_Tweet(' + tweet.id_tweet + ')" alt="">' 
                              : 
                              '<img src="ressources/repartageFull.svg" onclick="traitement_Delete_Retweet(' + tweet.id_tweet + '); traitement_Get_Tweet(' + tweet.id_tweet + ')" alt="">'
                            }
                        </div>
                            <div class="textretweet">
                            ${tweet.nombreretweet}
                            </div>
                          </div>
                          <div class="reaction">
                          <div class="logo like">
                          ${tweet.verifLike == 0 ? 
                            '<img src="ressources/like.svg" id="likeBtn" onclick="traitement_Send_Like(' + tweet.id_tweet + '); traitement_Get_Tweet(' + tweet.id_tweet + ')" alt="">' 
                            : 
                            '<img src="ressources/likeFull.svg" id="dsLikeBtn" onclick="traitement_Delete_Like(' + tweet.id_tweet + '); traitement_Get_Tweet(' + tweet.id_tweet + ')" alt="">'
                          }
                        </div>
                            <div class="textlike">
                            ${tweet.nombrelike}
                            </div>
                          </div>
                        </div>
                        <div class="date">
                          <p>${date}</p><p>${heure}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                </div>
              `;
                resultTweet += htmlTweet;
            }
            document.getElementById("bas").innerHTML=resultTweet;
        } else {
            alert("Vous n'etes pas connecté");
            document.location.href="./login.html";
      }
    }
  }


//-----------------------------------------------------------------

function traitement_Get_Profil() {
  token = localStorage.getItem("token");
  httpRequestGetProfil = new XMLHttpRequest();
  httpRequestGetProfil.onreadystatechange = Get_Profil;
  httpRequestGetProfil.open('GET', `${baseUri}/php_traitement/traitement_Get_Profil.php`, true);
  httpRequestGetProfil.setRequestHeader("Content-Type", "application/json");
  httpRequestGetProfil.setRequestHeader("authorization", token)
  httpRequestGetProfil.send();
}


function Get_Profil() {
  if (httpRequestGetProfil.readyState === XMLHttpRequest.DONE) {
    if (httpRequestGetProfil.status === 200) {
      const profils = JSON.parse(httpRequestGetProfil.responseText);
      let resultProfil = "";
      for (const profil of profils) {
        var dateJS = new Date(profil.date_creation);
        var options = {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        };
        var date = dateJS.toLocaleDateString('fr-FR', options);
          const htmlProfil=`
          <div class="partieHaute">
                  <div class="fullProfil">
                    <div class="everything">
                      <div class="containerPicInfo">
                        <div class="profilPic">
                            <img onclick="traitement_Get_Other_Profil(${profil.id_users}); traitement_Get_Tweet_Other_Profil(${profil.id_users})" src="ressources/profilpic/${profil.profil}" alt="">
                        </div>
                        <div class="membreDepuis">
                          <p> Membre depuis <br> ${date}</p>
                        </div>
                      </div>
                      <div class="containerAllText">
                          <div class="allText">
                                  <div class="pseudoEtEtatUser">
                                      <h1 onclick="traitement_Get_Other_Profil(${profil.id_users}); traitement_Get_Tweet_Other_Profil(${profil.id_users})">${profil.pseudo}</h1>
                                      <div class="stat${profil.etat}"></div>
                                  </div>
                              <div class="contenuBio"><p>${profil.bio}</p></div>
                          <div class="containSub">
                            <div class="abo" onclick="traitement_Get_Abonnement_Profil()">
                              <div class="nbAbo">${profil.nbAbonnement}</div>
                              <p>abonnements</p>
                            </div>
                            <div class="abo" onclick="traitement_Get_Abonne_Profil()">
                              <div class="nbAbo">${profil.nbAbonne}</div>
                              <p>abonné</p>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
          `;
          resultProfil += htmlProfil;
      }
      document.getElementById("haut").innerHTML=resultProfil;
      document.getElementById("milieu").innerHTML=`
      <div id="separation"></div>
      `
      traitement_Get_Tweet_Profil();
    }
  }
}

//-----------------------------------------------------------------

function traitement_Get_Abonnement_Profil() {
  token = localStorage.getItem("token");
  httpRequestGetAbonnementProfil = new XMLHttpRequest();
  httpRequestGetAbonnementProfil.onreadystatechange = Get_Abonnement_Profil;
  httpRequestGetAbonnementProfil.open('GET', `${baseUri}/php_traitement/traitement_Get_Abonnement_Profil.php`, true);
  httpRequestGetAbonnementProfil.setRequestHeader("Content-Type", "application/json");
  httpRequestGetAbonnementProfil.setRequestHeader("authorization", token)
  httpRequestGetAbonnementProfil.send();
}


function Get_Abonnement_Profil() {
  if (httpRequestGetAbonnementProfil.readyState === XMLHttpRequest.DONE) {
    if (httpRequestGetAbonnementProfil.status === 200) {
      const abonnementprofils = JSON.parse(httpRequestGetAbonnementProfil.responseText);
      let resultAbonnementProfil = "";
      for (const abonnementprofil of abonnementprofils) {
          const htmlAbonnementProfil=`
          <div class="containAbo">
            <div id="containerTweet">
            <div class="containMissive">
              <div class="pp">
                <img onclick="traitement_Get_Other_Profil(${abonnementprofil.id_users}); traitement_Get_Tweet_Other_Profil(${abonnementprofil.id_users})" src="ressources/${abonnementprofil.profil}" alt="">
              </div>
              <div class="infoMissive">
                <div class="upLine">
                  <div class="pseudoEtStatus">
                    <p onclick="traitement_Get_Other_Profil(${abonnementprofil.id_users}); traitement_Get_Tweet_Other_Profil(${abonnementprofil.id_users})">${abonnementprofil.pseudo}</p>
                    <div class="stat${abonnementprofil.etat}"></div>
                  </div>
                </div>
                <div class="missive">
                  ${abonnementprofil.bio}
                </div>
              </div>
              ${abonnementprofil.verifFollow == 0 ? 
                '<div class="aboplus" onclick="traitement_Send_Follow(' + abonnementprofil.id_users + '); traitement_Get_Abonnement_Profil(); traitement_Get_Suggestion()"><div class="nbAbo"><img src="ressources/subAdd.svg"></div></div>' 
                : 
                '<div class="abomoins" onclick="traitement_Delete_Follow(' + abonnementprofil.id_users + '); traitement_Get_Abonnement_Profil(); traitemetement_Get_Suggestion()"><div class="nbAbo"><img src="ressources/subRem.svg"></div></div>'
              }
            </div>
          </div>
        </div>
        </div>
          `;
          resultAbonnementProfil += htmlAbonnementProfil;
      }
      document.getElementById("bas").innerHTML=resultAbonnementProfil;
    }
  }
}


//-----------------------------------------------------------------

function traitement_Get_Abonne_Profil() {
  token = localStorage.getItem("token");
  httpRequestGetAbonneProfil = new XMLHttpRequest();
  httpRequestGetAbonneProfil.onreadystatechange = Get_Abonne_Profil;
  httpRequestGetAbonneProfil.open('GET', `${baseUri}/php_traitement/traitement_Get_Abonne_Profil.php`, true);
  httpRequestGetAbonneProfil.setRequestHeader("Content-Type", "application/json");
  httpRequestGetAbonneProfil.setRequestHeader("authorization", token)
  httpRequestGetAbonneProfil.send();
}


function Get_Abonne_Profil() {
  if (httpRequestGetAbonneProfil.readyState === XMLHttpRequest.DONE) {
    if (httpRequestGetAbonneProfil.status === 200) {
      const abonneprofils = JSON.parse(httpRequestGetAbonneProfil.responseText);
      let resultAbonneProfil = "";
      for (const abonneprofil of abonneprofils) {
          const htmlAbonneProfil=`
          <div class="containAbo">
            <div id="containerTweet">
            <div class="containMissive">
              <div class="pp">
                <img onclick="traitement_Get_Other_Profil(${abonneprofil.id_users}); traitement_Get_Tweet_Other_Profil(${abonneprofil.id_users})" src="ressources/profilpic/${abonneprofil.profil}" alt="">
              </div>
              <div class="infoMissive">
                <div class="upLine">
                  <div class="pseudoEtStatus">
                    <p onclick="traitement_Get_Other_Profil(${abonneprofil.id_users}); traitement_Get_Tweet_Other_Profil(${abonneprofil.id_users})">${abonneprofil.pseudo}</p>
                    <div class="stat${abonneprofil.etat}"></div>
                  </div>
                </div>
                <div class="missive">
                  ${abonneprofil.bio}
                </div>
              </div>
              ${abonneprofil.verifFollow == 1 ? 
                '<div class="aboplus" onclick="traitement_Send_Follow(' + abonneprofil.id_users + '); traitement_Get_Abonne_Profil(); traitement_Get_Suggestion()""><div class="nbAbo"><img src="ressources/subAdd.svg"></div></div>' 
                : 
                '<div class="abomoins" onclick="traitement_Delete_Follow(' + abonneprofil.id_users + '); traitement_Get_Abonne_Profil(; traitement_Get_Suggestion()""><div class="nbAbo"><img src="ressources/subRem.svg"></div></div>'
              }
            </div>
          </div>
        </div>
        </div>
          `;
          resultAbonneProfil += htmlAbonneProfil;
      }
      document.getElementById("bas").innerHTML=resultAbonneProfil;
    }
  }
}

//----------------------------------------------------------------

function traitement_Get_Other_Abonnement_Profil(id) {
  id_users = id;
  token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  httpRequestGetOtherAbonnementProfil = new XMLHttpRequest();
  httpRequestGetOtherAbonnementProfil.onreadystatechange = Get_Other_Abonnement_Profil;
  httpRequestGetOtherAbonnementProfil.open('POST', `${baseUri}/php_traitement/traitement_Get_Other_Abonnement_Profil.php`, true);
  httpRequestGetOtherAbonnementProfil.setRequestHeader("Content-Type", "application/json");
  httpRequestGetOtherAbonnementProfil.setRequestHeader("authorization", token)
  var data = JSON.stringify({"id_users": id_users, "token": token});
  httpRequestGetOtherAbonnementProfil.send(data);
}


function Get_Other_Abonnement_Profil() {
  if (httpRequestGetOtherAbonnementProfil.readyState === XMLHttpRequest.DONE) {
    if (httpRequestGetOtherAbonnementProfil.status === 200) {
      const otherabonnementprofils = JSON.parse(httpRequestGetOtherAbonnementProfil.responseText);
      let resultOtherAbonnementProfil = "";
      for (const otherabonnementprofil of otherabonnementprofils) {
          const htmlOtherAbonnementProfil=`
          <div class="containAbo">
            <div id="containerTweet">
            <div class="containMissive">
              <div class="pp">
                <img onclick="traitement_Get_Other_Profil(${otherabonnementprofil.id_users}); traitement_Get_Tweet_Other_Profil(${otherabonnementprofil.id_users})" src="ressources/profilpic/${otherabonnementprofil.profil}" alt="">
              </div>
              <div class="infoMissive">
                <div class="upLine">
                  <div class="pseudoEtStatus">
                    <p onclick="traitement_Get_Other_Profil(${otherabonnementprofil.id_users}); traitement_Get_Tweet_Other_Profil(${otherabonnementprofil.id_users})">${otherabonnementprofil.pseudo}</p>
                    <div class="stat${otherabonnementprofil.etat}"></div>
                  </div>
                </div>
                <div class="missive">
                  ${otherabonnementprofil.bio}
                </div>
              </div>
              ${otherabonnementprofil.id_users != userId ? 
                otherabonnementprofil.verifFollow == 1 ? 
                    '<div class="aboplus" onclick="traitement_Send_Follow(' + otherabonnementprofil.id_users + '); traitement_Get_Other_Abonnement_Profil(' + otherabonnementprofil.id_users + '); traitement_Get_Suggestion()"><div class="nbAbo"><img src="ressources/subAdd.svg"></div></div>' 
                    : 
                    '<div class="abomoins" onclick="traitement_Delete_Follow(' + otherabonnementprofil.id_users + '); traitement_Get_Other_Abonnement_Profil(' + otherabonnementprofil.id_users + '); traitement_Get_Suggestion()"><div class="nbAbo"><img src="ressources/subRem.svg"></div></div>'
                : ''
            }
            </div>
          </div>
        </div>
        </div>
          `;
          resultOtherAbonnementProfil += htmlOtherAbonnementProfil;
      }
      document.getElementById("bas").innerHTML=resultOtherAbonnementProfil;
    }
  }
}

//-----------------------------------------------------------------

function traitement_Get_Other_Abonne_Profil(id) {
  id_users = id;
  const userId = localStorage.getItem("userId");
  token = localStorage.getItem("token");
  httpRequestGetOtherAbonneProfil = new XMLHttpRequest();
  httpRequestGetOtherAbonneProfil.onreadystatechange = Get_Other_Abonne_Profil;
  httpRequestGetOtherAbonneProfil.open('POST', `${baseUri}/php_traitement/traitement_Get_Other_Abonne_Profil.php`, true);
  httpRequestGetOtherAbonneProfil.setRequestHeader("Content-Type", "application/json");
  httpRequestGetOtherAbonneProfil.setRequestHeader("authorization", token)
  var data = JSON.stringify({"id_users": id_users, "token": token});
  httpRequestGetOtherAbonneProfil.send(data);
}


function Get_Other_Abonne_Profil() {
  if (httpRequestGetOtherAbonneProfil.readyState === XMLHttpRequest.DONE) {
    if (httpRequestGetOtherAbonneProfil.status === 200) {
      const otherabonneprofils = JSON.parse(httpRequestGetOtherAbonneProfil.responseText);
      let resultOtherAbonneProfil = "";
      for (const otherabonneprofil of otherabonneprofils) {
          const htmlOtherAbonneProfil=`
          <div class="containAbo">
            <div id="containerTweet">
            <div class="containMissive">
              <div class="pp">
                <img onclick="traitement_Get_Other_Profil(${otherabonneprofil.id_users}); traitement_Get_Tweet_Other_Profil(${otherabonneprofil.id_users})" src="ressources/profilpic/${otherabonneprofil.profil}" alt="">
              </div>
              <div class="infoMissive">
                <div class="upLine">
                  <div class="pseudoEtStatus">
                    <p onclick="traitement_Get_Other_Profil(${otherabonneprofil.id_users}); traitement_Get_Tweet_Other_Profil(${otherabonneprofil.id_users})">${otherabonneprofil.pseudo}</p>
                    <div class="stat${otherabonneprofil.etat}"></div>
                  </div>
                </div>
                <div class="missive">
                  ${otherabonneprofil.bio}
                </div>
              </div>
              ${otherabonneprofil.id_users != userId ? 
                otherabonneprofil.verifFollow == 1 ? 
                    '<div class="aboplus" onclick="traitement_Send_Follow(' + otherabonneprofil.id_users + '); traitement_Get_Other_Abonne_Profil(' + otherabonneprofil.id_users + '); traitement_Get_Suggestion()"><div class="nbAbo"><img src="ressources/subAdd.svg"></div></div>' 
                    : 
                    '<div class="abomoins" onclick="traitement_Delete_Follow(' + otherabonneprofil.id_users + '); traitement_Get_Other_Abonne_Profil(' + otherabonneprofil.id_users + '); traitement_Get_Suggestion()"><div class="nbAbo"><img src="ressources/subRem.svg"></div></div>'
                : ''
            }
            </div>
          </div>
        </div>
        </div>
          `;
          resultOtherAbonneProfil += htmlOtherAbonneProfil;
      }
      document.getElementById("bas").innerHTML=resultOtherAbonneProfil;
    }
  }
}

//----------------------------------------------------------------

function traitement_Get_Tweet_Reponse(id) {
  id_tweet = id;
  token = localStorage.getItem("token");
  httpRequestGetTweetReponse = new XMLHttpRequest();
  httpRequestGetTweetReponse.onreadystatechange = Get_Tweet_Reponse;
  httpRequestGetTweetReponse.open('POST', `${baseUri}/php_traitement/traitement_Get_Tweet_Reponse.php`, true);
  httpRequestGetTweetReponse.setRequestHeader("Content-Type", "application/json");
  httpRequestGetTweetReponse.setRequestHeader("authorization", token);
  var data = JSON.stringify({"id_tweet": id_tweet, "token": token});
  httpRequestGetTweetReponse.send(data);
  
}

function Get_Tweet_Reponse() {
  if (httpRequestGetTweetReponse.readyState === XMLHttpRequest.DONE) {
    if (httpRequestGetTweetReponse.status === 200) {
      const userId = localStorage.getItem("userId");
      const tweetReponse = JSON.parse(httpRequestGetTweetReponse.responseText);
      id_tweet = tweetReponse[0][0];
      let resultTweetReponse = "";

      for (const tweetRep of tweetReponse) {
        var dateJS = new Date(tweetRep.timetweet);
              var options = {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              };
              var date = dateJS.toLocaleDateString('fr-FR', options);

              options = {
                hour: 'numeric',
                minute: 'numeric'
              };
              var heure = dateJS.toLocaleTimeString('fr-FR', options);
          const htmlTweetReponse=`
              <div class="partieHaute">
                  <div class="fullTweet">
                    <div class="everything">
                      <div class="profilPic">
                          <img src="ressources/profilpic/${tweetRep.profil}" alt="">
                      </div>
                      <div class="containerAllText">
                          <div class="allText">
                              <div class="pseudoEtatEtDel">
                                  <div class="pseudoEtEtatUser">
                                      <h1>${tweetRep.pseudo}</h1>
                                      <div class="stat${tweetRep.etat}"></div>
                                  </div>
                                  ${tweetRep.id_users == userId ? `<div onclick="traitement_Delete_Tweet(${tweetRep.id_tweet})" class="delTweet">
                                      <div class="del">x</div>
                                  </div>` : ''}
                              </div>
                              <div class="contenuTweet">${tweetRep.contenu}</div>
                              <div class="reactTweet">
                                  <div class="reactions">
                                      <div class="commentaire">
                                          <div class="logo" onclick="traitement_Get_Tweet_Reponse(${tweetRep.id_tweet})">
                                          <img src="ressources/missive.svg" alt=""></div>
                                          <div class="testcommentaire">${tweetRep.nombrecomm}</div>
                                      </div>
                                      <div class="retweet">
                                      <div class="logo">
                                      ${tweetRep.verifRetweet == 0 ? 
                                        '<img src="ressources/repartage.svg" onclick="traitement_Send_Retweet(' + tweetRep.id_tweet + '); traitement_Get_Tweet_Reponse(' + tweetRep.id_tweet + ')" alt="">' 
                                        : 
                                        '<img src="ressources/repartageFull.svg" onclick="traitement_Delete_Retweet(' + tweetRep.id_tweet + '); traitement_Get_Tweet_Reponse(' + tweetRep.id_tweet + ')" alt="">'
                                      }
                                      </div>
                                          <div class="textretweet">${tweetRep.nombreretweet}</div>
                                      
                                      </div">
                                      </div">
                                      </div>
                                      <div class="like">
                                      <div class="logo">
                                      ${tweetRep.verifLike == 0 ? 
                                        '<img src="ressources/like.svg" id="likeBtn" onclick="traitement_Send_Like(' + tweetRep.id_tweet + '); traitement_Get_Tweet_Reponse(' + tweetRep.id_tweet + ')" alt="">' 
                                        : 
                                        '<img src="ressources/likeFull.svg" id="dsLikeBtn" onclick="traitement_Delete_Like(' + tweetRep.id_tweet + '); traitement_Get_Tweet_Reponse(' + tweetRep.id_tweet + ')" alt="">'
                                      }
                                      </div>
                                          <div class="textlike">${tweetRep.nombrelike}</div>
                                          </div>
                                          </div>
                                  <div class="date">
                                    <p>${date}</p><p>${heure}</p>           
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
          `;
          resultTweetReponse += htmlTweetReponse;
      }
    document.getElementById("haut").innerHTML=resultTweetReponse;

    const comProfils = JSON.parse(httpRequestGetMiniProfil.responseText);
    let resultCommentaireProfil = "";
    for (const comProfil of comProfils) {
      const htmlCommentaireProfil=`
    <div class="reponse">
      <img src="ressources/profilpic/${comProfil.profil}">
      <textarea name="commInput" id="commInput" placeholder="Répondez à cette missive ..."></textarea>
       <div onclick="traitement_Send_Commentaire(${id_tweet}); traitement_Get_Tweet_Reponse(${id_tweet})" class="bouton">Répondre</div>
    </div>
      `;
      resultCommentaireProfil += htmlCommentaireProfil;
  }
  document.getElementById("milieu").innerHTML=resultCommentaireProfil;
  traitement_Get_Commentaire(id_tweet);
  document.getElementById("bas").innerHTML=`
  <div class="partieBasse">
      <div class="fullTweet"></div>
  </div>
  `;
    }
  }
}

//-----------------------------------------------------------------

function traitement_Get_Commentaire(id) {
  id_tweet = id;
  token = localStorage.getItem("token");
  httpRequestCommentaire = new XMLHttpRequest();
  httpRequestCommentaire.onreadystatechange = Get_Commentaire;
  httpRequestCommentaire.open('POST', `${baseUri}/php_traitement/traitement_Get_Commentaire.php`, true);
  httpRequestCommentaire.setRequestHeader("Content-Type", "application/json");
  httpRequestCommentaire.setRequestHeader("authorization", token);
  var data = JSON.stringify({"id_tweet": id_tweet, "token": token});
  httpRequestCommentaire.send(data);
}

function Get_Commentaire(){
  if (httpRequestCommentaire.readyState === XMLHttpRequest.DONE) {
    if (httpRequestCommentaire.status === 200) {
      const comms = JSON.parse(httpRequestCommentaire.responseText);
      let resultComm = "";
      const userId = localStorage.getItem("userId");
        for(const comm of comms) {
        var dateJS = new Date(comm.timetweet);
        var options = {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        };
        var date = dateJS.toLocaleDateString('fr-FR', options);

        options = {
          hour: 'numeric',
          minute: 'numeric'
        };
        var heure = dateJS.toLocaleTimeString('fr-FR', options);
        const htmlComm = `
<div class="partieBasse">
  <div class="fullTweet">
     <div class="everything">
        <div class="profilPic">
          <img onclick="traitement_Get_Other_Profil(${comm.id_users})" src="ressources/profilpic/${comm.profil}" alt="">
        </div>
        <div class="containerAllText">
          <div class="allText">
              <div class="pseudoEtatEtDel">
                  <div onclick="traitement_Get_Other_Profil(${comm.id_users})" class="pseudoEtEtatUser">
                    <h1>${comm.pseudo}</h1>
                    <div class="stat${comm.etat}"></div>
                  </div>
                  ${comm.id_users == userId ? `<div onclick="traitement_Delete_Tweet(${comm.id_tweet})" class="delTweet">
                    <div class="del">x</div>
                  </div>` : ''}
              </div>
              <div class="contenuTweet">${comm.contenu}</div>
              <div class="reactTweet">
                <div class="reactions">
                  <div class="commentaire">
                      <div class="logo" onclick="traitement_Get_Tweet_Reponse(${comm.id_tweet})"><img src="ressources/missive.svg" alt=""></div>
                      <div class="testcommentaire">${comm.nombrecomm}</div>
                  </div>
                  <div class="retweet">
                      <div class="logo">
                      ${comm.verifRetweet == 0 ? 
                        '<img src="ressources/repartage.svg" onclick="traitement_Send_Retweet(' + comm.id_tweet + '); traitement_Get_Commentaire(' + id_tweet + ')" alt="">' 
                        : 
                        '<img src="ressources/repartageFull.svg" onclick="traitement_Delete_Retweet(' + comm.id_tweet + '); traitement_Get_Commentaire(' + id_tweet + ')" alt="">'
                      }
                      </div>
                      <div class="textretweet">${comm.nombreretweet}</div>
                  </div>
                  <div class="like">
                      <div class="logo">
                      ${comm.verifLike == 0 ? 
                        '<img src="ressources/like.svg" id="likeBtn" onclick="traitement_Send_Like(' + comm.id_tweet + '); traitement_Get_Commentaire(' + id_tweet + ')" alt="">' 
                        : 
                        '<img src="ressources/likeFull.svg" id="dsLikeBtn" onclick="traitement_Delete_Like(' + comm.id_tweet + '); traitement_Get_Commentaire(' + id_tweet + ')" alt="">'
                      }
                      </div>
                      <div class="textlike">${comm.nombrelike}</div>
                  </div>
                </div>
              <div class="date">
              <p>${date}</p><p>${heure}</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="containBorder">
  <div class="borderbas"></div>
</div>
        `;
        resultComm += htmlComm;
        document.getElementById("bas").innerHTML=resultComm;
      }
    };    
  } 
}

//-----------------------------------------------------------------

function traitement_Get_Mini_Profil() {
  token = localStorage.getItem("token");
  httpRequestGetMiniProfil = new XMLHttpRequest();
  httpRequestGetMiniProfil.onreadystatechange = Get_Mini_Profil;
  httpRequestGetMiniProfil.open('GET', `${baseUri}/php_traitement/traitement_Get_Mini_Profil.php`, true);
  httpRequestGetMiniProfil.setRequestHeader("Content-Type", "application/json");
  httpRequestGetMiniProfil.setRequestHeader("authorization", token)
  httpRequestGetMiniProfil.send();
}


function Get_Mini_Profil() {
  if (httpRequestGetMiniProfil.readyState === XMLHttpRequest.DONE) {
    if (httpRequestGetMiniProfil.status === 200) {
      const miniProfils = JSON.parse(httpRequestGetMiniProfil.responseText);
      let resultMiniProfil = "";
      for (const miniProfil of miniProfils) {
          const htmlMiniProfil=`
          <div class="photo"><img onclick="traitement_Get_Profil()" src="ressources/profilpic/${miniProfil.profil}" alt="photo de profil"><div class="stat${miniProfil.etat}"></div></div>
          <div class="pseudoEtStatus">
              <div onclick="traitement_Get_Profil()" class="pseudo">${miniProfil.pseudo}</div>
              <div class="status">
                <div id="actif" class="${miniProfil.etat == 0 ? 'active' : ''}" onclick="traitement_Send_Mini_Profil(0); changeStatusClass(this)"></div>
                <div id="inactif" class="${miniProfil.etat == 1 ? 'active' : ''}" onclick="traitement_Send_Mini_Profil(1); changeStatusClass(this);"></div>
                <div id="absent" class="${miniProfil.etat == 2 ? 'active' : ''}" onclick="traitement_Send_Mini_Profil(2); changeStatusClass(this);"></div>
              </div>
          </div>
          <div onclick="traitement_Deconnexion()" class="deco">x</div>
          `;
          resultMiniProfil += htmlMiniProfil;
      }
      document.getElementById("miniProfil").innerHTML=resultMiniProfil;
    }
  }
}

//-----------------------------------------------------------------

function traitement_Send_Mini_Profil(state){
  token = localStorage.getItem("token");
  etat = state;

  httpRequestSendMiniProfil = new XMLHttpRequest();
  httpRequestSendMiniProfil.onreadystatechange = Send_Mini_Profil;
  httpRequestSendMiniProfil.open('POST', `${baseUri}/php_traitement/traitement_Send_Mini_Profil.php`, true);
  httpRequestSendMiniProfil.setRequestHeader("Content-Type", "application/json");
  httpRequestSendMiniProfil.setRequestHeader("authorization", token);
  var data = JSON.stringify({"etat": etat, "token": token});
  httpRequestSendMiniProfil.send(data);
}

function Send_Mini_Profil(){
if (httpRequestSendMiniProfil.readyState === XMLHttpRequest.DONE) {
  if (httpRequestSendMiniProfil.status === 200) {
    traitement_Get_Mini_Profil();
    };    
  } 
}


//-----------------------------------------------------------------

function traitement_Get_Tweet_Profil() {
  token = localStorage.getItem("token");
  httpRequestGetTweetProfil = new XMLHttpRequest();
  httpRequestGetTweetProfil.onreadystatechange = Get_Tweet_Profil;
  httpRequestGetTweetProfil.open('GET', `${baseUri}/php_traitement/traitement_Get_Tweet_Profil.php`, true);
  httpRequestGetTweetProfil.setRequestHeader("Content-Type", "application/json");
  httpRequestGetTweetProfil.setRequestHeader("authorization", token)
  httpRequestGetTweetProfil.send();
}


function Get_Tweet_Profil() {
  if (httpRequestGetTweetProfil.readyState === XMLHttpRequest.DONE) {
    if (httpRequestGetTweetProfil.status === 200) {
      const userId = localStorage.getItem("userId");
      const tweetprofils = JSON.parse(httpRequestGetTweetProfil.responseText);
      let resultTweetProfil = "";
      for (const tweetprofil of tweetprofils) {
        var dateJS = new Date(tweetprofil.timetweet);
        var options = {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        };
        var date = dateJS.toLocaleDateString('fr-FR', options);
        options = {
          hour: 'numeric',
          minute: 'numeric'
        };
        var heure = dateJS.toLocaleTimeString('fr-FR', options);
          const htmlTweetProfil=`
          <div class="containTweet">
          <div id="containerTweet">
<div class="containMissive">
<div class="pp">
  <img onclick="traitement_Get_Other_Profil(${tweetprofil.id_users}); traitement_Get_Tweet_Other_Profil(${tweetprofil.id_users})" src="ressources/profilpic/${tweetprofil.profil}" alt="">
</div>
<div class="infoMissive">
  <div class="upLine">
    <div class="pseudoEtStatus">
      <p onclick="traitement_Get_Other_Profil(${tweetprofil.id_users}); traitement_Get_Tweet_Other_Profil(${tweetprofil.id_users})">${tweetprofil.pseudo}</p>
      <div class="stat${tweetprofil.etat}"></div>
    </div>
    ${tweetprofil.id_users == userId ? `<div class="delTweet" onclick="traitement_Delete_Tweet(${tweetprofil.id_tweet})">X</div> `: ''}
  </div>
  <div class="missive">
    ${tweetprofil.contenu}
  </div>
  <div class="reactDate">
    <div class="containReact">
      <div class="reactions">
        <div class="reaction">
          <div class="logo message">
            <img src="ressources/missive.svg" onclick="traitement_Get_Tweet_Reponse(${tweetprofil.id_tweet})" alt="">
          </div>
          <div class="textmessage">
          ${tweetprofil.nombrecomm}
          </div>
        </div>
        <div class="reaction">
          <div class="logo retweet">
          ${tweetprofil.verifRetweet == 0 ? 
            '<img src="ressources/repartage.svg" onclick="traitement_Send_Retweet(' + tweetprofil.id_tweet + '); traitement_Get_Tweet_Profil(' + tweetprofil.id_tweet + ')" alt="">' 
            : 
            '<img src="ressources/repartageFull.svg" onclick="traitement_Delete_Retweet(' + tweetprofil.id_tweet + '); traitement_Get_Tweet_Profil(' + tweetprofil.id_tweet + ')" alt="">'
          }
      </div>
          <div class="textretweet">
          ${tweetprofil.nombreretweet}
          </div>
        </div>
        <div class="reaction">
        <div class="logo like">
        ${tweetprofil.verifLike == 0 ? 
          '<img src="ressources/like.svg" id="likeBtn" onclick="traitement_Send_Like(' + tweetprofil.id_tweet + '); traitement_Get_Tweet_Profil(' + tweetprofil.id_tweet + ')" alt="">' 
          : 
          '<img src="ressources/likeFull.svg" id="dsLikeBtn" onclick="traitement_Delete_Like(' + tweetprofil.id_tweet + '); traitement_Get_Tweet_Profil(' + tweetprofil.id_tweet + ')" alt="">'
        }
      </div>
          <div class="textlike">
          ${tweetprofil.nombrelike}
          </div>
        </div>
      </div>
      <div class="date">
        <p>${date}</p><p>${heure}</p>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</div>
          `;
          resultTweetProfil += htmlTweetProfil;
      }
     document.getElementById("bas").innerHTML=resultTweetProfil;
    }
  }
}

//-----------------------------------------------------------------

function traitement_Get_Other_Profil(id) {
  token = localStorage.getItem("token");
  id_users = id;

  httpRequestGetOtherProfil = new XMLHttpRequest();
  httpRequestGetOtherProfil.onreadystatechange = Get_Other_Profil;
  httpRequestGetOtherProfil.open('POST', `${baseUri}/php_traitement/traitement_Get_Other_Profil.php`, true);
  var dataOtherProfil = JSON.stringify({"id_users": id_users, "token": token});
  httpRequestGetOtherProfil.setRequestHeader("Content-Type", "application/json");
  httpRequestGetOtherProfil.setRequestHeader("authorization", token)
  httpRequestGetOtherProfil.send(dataOtherProfil);
}


function Get_Other_Profil() {
  if (httpRequestGetOtherProfil.readyState === XMLHttpRequest.DONE) {
    if (httpRequestGetOtherProfil.status === 200) {
      const otherprofils = JSON.parse(httpRequestGetOtherProfil.responseText);
      userId = localStorage.getItem("userId");
      let resultOtherProfil = "";
      let id_other_users = otherprofils[0][0];
      if (id_other_users == userId){
        traitement_Get_Profil();
        traitement_Get_Tweet_Profil();
      }else{
        for (const otherprofil of otherprofils) {
          var dateJS = new Date(otherprofil.date_creation);
          var options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          };
          var date = dateJS.toLocaleDateString('fr-FR', options);
          const htmlOtherProfil=`
          <div class="partieHaute">
          <div class="fullProfil">
            <div class="everything">
              <div class="containerPicInfo">
                <div class="profilPic">
                    <img onclick="Get_Other_Profil(); Get_Tweet_Other_Profil()" src="ressources/profilpic/${otherprofil.profil}" alt="">
                </div>
                <div class="membreDepuis">
                  <p> Membre depuis <br> ${date}</p>
                </div>
              </div>
              <div class="containerAllText">
                  <div class="allText">
                          <div class="pseudoEtEtatUser">
                              <h1 onclick="Get_Other_Profil(); Get_Tweet_Other_Profil()">${otherprofil.pseudo}</h1>
                              <div class="stat${otherprofil.etat}"></div>
                          </div>
                      <div class="contenuBio">${otherprofil.bio}</div>
                  <div class="containSub">
                    <div class="abo" onclick="traitement_Get_Other_Abonnement_Profil(${otherprofil.id_users})">
                      <div class="nbAbo">${otherprofil.nbAbonnement}</div>
                      <p>abonnements</p>
                    </div>
                    <div class="abo" onclick="traitement_Get_Other_Abonne_Profil(${otherprofil.id_users})">
                      <div class="nbAbo">${otherprofil.nbAbonne}</div>
                      <p>abonné</p>
                    </div>
                    ${otherprofil.verifFollow == 1 ? 
                      '<div class="aboplus" onclick="traitement_Send_Follow(' + otherprofil.id_users + '); traitement_Get_Other_Profil(' + otherprofil.id_users + '); traitement_Get_Suggestion()"><div class="nbAbo"><img src="ressources/subAdd.svg"></div></div>' 
                      : 
                      '<div class="abomoins" onclick="traitement_Delete_Follow(' + otherprofil.id_users + '); traitement_Get_Other_Profil(' + otherprofil.id_users + '); traitement_Get_Suggestion()"><div class="nbAbo"><img src="ressources/subRem.svg"></div></div>'
                    }
                  </div>
              </div>
          </div>
      </div>
  `;
  resultOtherProfil += htmlOtherProfil;
}
document.getElementById("haut").innerHTML=resultOtherProfil;
document.getElementById("milieu").innerHTML=`
<div id="separation"></div>
`
      }
    }
  }
}

//-----------------------------------------------------------------

function traitement_Get_Tweet_Other_Profil(id) {
  token = localStorage.getItem("token");
  id_users = id;
  httpRequestGetTweetOtherProfil = new XMLHttpRequest();
  httpRequestGetTweetOtherProfil.onreadystatechange = Get_Tweet_Other_Profil;
  httpRequestGetTweetOtherProfil.open('POST', `${baseUri}/php_traitement/traitement_Get_Tweet_Other_Profil.php`, true);
  var dataTweetOtherProfil = JSON.stringify({"id_users": id_users, "token": token});
  httpRequestGetTweetOtherProfil.setRequestHeader("Content-Type", "application/json");
  httpRequestGetTweetOtherProfil.setRequestHeader("authorization", token)
  httpRequestGetTweetOtherProfil.send(dataTweetOtherProfil);
}


function Get_Tweet_Other_Profil() {
  if (httpRequestGetTweetOtherProfil.readyState === XMLHttpRequest.DONE) {
    if (httpRequestGetTweetOtherProfil.status === 200) {
      const userId = localStorage.getItem("userId");
      const tweetotherprofils = JSON.parse(httpRequestGetTweetOtherProfil.responseText);
      let resultTweetOtherProfil = "";
      let id_other_users = tweetotherprofils[0][0];
      if (id_other_users == userId){
        traitement_Get_Profil();
        traitement_Get_Tweet_Profil();
      }else{
        for (const tweetotherprofil of tweetotherprofils) {
          var dateJS = new Date(tweetotherprofil.timetweet);
          var options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          };
          var date = dateJS.toLocaleDateString('fr-FR', options);
          options = {
            hour: 'numeric',
            minute: 'numeric'
          };
          var heure = dateJS.toLocaleTimeString('fr-FR', options);
           const htmlTweetOtherProfil=`
            <div class="containTweet">
            <div id="containerTweet">
  <div class="containMissive">
  <div class="pp">
    <img onclick="traitement_Get_Tweet_Other_Profil(${tweetotherprofil.id_users})" src="ressources/profilpic/${tweetotherprofil.profil}" alt="">
  </div>
  <div class="infoMissive">
    <div class="upLine">
      <div class="pseudoEtStatus">
        <p onclick="traitement_Get_Other_Profil(${tweetotherprofil.id_users}); traitement_Get_Tweet_Other_Profil(${tweetotherprofil.id_users})">${tweetotherprofil.pseudo}</p>
        <div class="stat${tweetotherprofil.etat}"></div>
      </div>
      ${tweetotherprofil.id_users == userId ? `<div class="delTweet" onclick="traitement_Delete_Tweet(${tweetotherprofil.id_tweet})">X</div> `: ''}
    </div>
    <div class="missive">
      ${tweetotherprofil.contenu}
    </div>
    <div class="reactDate">
      <div class="containReact">
        <div class="reactions">
          <div class="reaction">
            <div class="logo message">
              <img src="ressources/missive.svg" onclick="traitement_Get_Tweet_Reponse(${tweetotherprofil.id_tweet})" alt="">
            </div>
            <div class="textmessage">
            ${tweetotherprofil.nombrecomm}
            </div>
          </div>
          <div class="reaction">
            <div class="logo retweet">
            ${tweetotherprofil.verifRetweet == 0 ? 
              '<img src="ressources/repartage.svg" onclick="traitement_Send_Retweet(' + tweetotherprofil.id_tweet + '); traitement_Get_Tweet_Other_Profil(' + tweetotherprofil.id_users + ')" alt="">' 
              : 
              '<img src="ressources/repartageFull.svg" onclick="traitement_Delete_Retweet(' + tweetotherprofil.id_tweet + '); traitement_Get_Tweet_Other_Profil(' + tweetotherprofil.id_users + ')" alt="">'
            }
        </div>
            <div class="textretweet">
            ${tweetotherprofil.nombreretweet}
            </div>
          </div>
          <div class="reaction">
          <div class="logo like">
          ${tweetotherprofil.verifLike == 0 ? 
            '<img src="ressources/like.svg" id="likeBtn" onclick="traitement_Send_Like(' + tweetotherprofil.id_tweet + '); traitement_Get_Tweet_Other_Profil(' + tweetotherprofil.id_users + ')" alt="">' 
            : 
            '<img src="ressources/likeFull.svg" id="dsLikeBtn" onclick="traitement_Delete_Like(' + tweetotherprofil.id_tweet + '); traitement_Get_Tweet_Other_Profil(' + tweetotherprofil.id_users + ')" alt="">'
          }
        </div>
            <div class="textlike">
            ${tweetotherprofil.nombrelike}
            </div>
          </div>
        </div>
        <div class="date">
          <p>${date}</p><p>${heure}</p>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
  </div>      
          `;
          resultTweetOtherProfil += htmlTweetOtherProfil;
      }
      document.getElementById("bas").innerHTML=resultTweetOtherProfil;
      }
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

//-----------------------------------------------------------------

function traitement_Get_Copain() {
  token = localStorage.getItem("token");
  httpRequestGetCopain = new XMLHttpRequest();
  httpRequestGetCopain.onreadystatechange = Get_Copain;
  httpRequestGetCopain.open('GET', `${baseUri}/php_traitement/traitement_Get_Copain.php`, true);
  httpRequestGetCopain.setRequestHeader("Content-Type", "application/json");
  httpRequestGetCopain.setRequestHeader("authorization", token)
  httpRequestGetCopain.send();
}


function Get_Copain() {
  if (httpRequestGetCopain.readyState === XMLHttpRequest.DONE) {
    if (httpRequestGetCopain.status === 200) {
      const copains = JSON.parse(httpRequestGetCopain.responseText);
      let resultCopain = "";
      for (const copain of copains) {
          const htmlCopain=`
          <div class="amigo">
          <div class="photoAmis">
              <img onclick="traitement_Get_Other_Profil(${copain.id_users})" src="ressources/profilpic/${copain.profil}" alt="">
          </div>
          <div class="infoAmis">
              <div class="pseudoEtStat">
                  <div onclick="traitement_Get_Other_Profil(${copain.id_users})" class="pseudo">${copain.pseudo}</div>
                  <div class="stat${copain.etat}"></div>
              </div>
              <div class="bio">${copain.bio}</div>
              <div class="missiveButton">
                  <div class="button">Missiver</div>
              </div>
          </div>
      </div>
          `;
          resultCopain += htmlCopain;
      }
      document.getElementById("amisContainer").innerHTML=resultCopain;
    }
  }
}

//-----------------------------------------------------------------

function traitement_Get_Suggestion() {
  token = localStorage.getItem("token");
  httpRequestGetSuggestion = new XMLHttpRequest();
  httpRequestGetSuggestion.onreadystatechange = Get_Suggestion;
  httpRequestGetSuggestion.open('GET', `${baseUri}/php_traitement/traitement_Get_Suggestion.php`, true);
  httpRequestGetSuggestion.setRequestHeader("Content-Type", "application/json");
  httpRequestGetSuggestion.setRequestHeader("authorization", token)
  httpRequestGetSuggestion.send();
}

function Get_Suggestion() {
  if (httpRequestGetSuggestion.readyState === XMLHttpRequest.DONE) {
    if (httpRequestGetSuggestion.status === 200) {
      const suggestions = JSON.parse(httpRequestGetSuggestion.responseText);
      userId = localStorage.getItem("userId");
      let resultSuggestion = "";
      for (const suggestion of suggestions) {
        if (suggestion.id_users == userId){
          continue;
        }else{
          const htmlSuggestion=`
          <div class="amigo">
          <div class="photoAmis">
              <img onclick="traitement_Get_Other_Profil(${suggestion.id_users}); traitement_Get_Tweet_Other_Profil(${suggestion.id_users})" src="ressources/profilpic/${suggestion.profil}" alt="">
          </div>
          <div class="infoAmis">
              <div class="pseudoEtStat">
                  <div onclick="traitement_Get_Other_Profil(${suggestion.id_users}); traitement_Get_Tweet_Other_Profil(${suggestion.id_users})" class="pseudo">${suggestion.pseudo}</div>
                  <div class="stat${suggestion.etat}"></div>
              </div>
              <div class="bio">${suggestion.bio}</div>
                <div class="aboplus" onclick="traitement_Send_Follow(${suggestion.id_users}); traitement_Get_Suggestion()"><div class="nbAbo"><img src="ressources/subAdd.svg"></div></div>
          </div>
      </div>
          `;
          resultSuggestion += htmlSuggestion;
      }
      document.getElementById("suggestionContainer").innerHTML=resultSuggestion;
    }
  }
}
}

//-----------------------------------------------------------------

function traitement_Send_Bio(contenuValue){
  token = localStorage.getItem("token");
  contenu = contenuValue;

  httpRequestSendBio = new XMLHttpRequest();
  httpRequestSendBio.onreadystatechange = Send_Bio;
  httpRequestSendBio.open('POST', `${baseUri}/php_traitement/traitement_Send_Bio.php`, true);
  httpRequestSendBio.setRequestHeader("Content-Type", "application/json");
  httpRequestSendBio.setRequestHeader("authorization", token);
  var data = JSON.stringify({"bio": contenu, "token": token});
  httpRequestSendBio.send(data);
}

function Send_Bio(){
  if (httpRequestSendBio.readyState === XMLHttpRequest.DONE) {
    if (httpRequestSendBio.status === 200) {
      alert("votre biographie est modifié avec succès !")
      traitement_Get_Profil();
    } 
  }
}

//-----------------------------------------------------------------

function traitement_Get_Search_Bar(query) {
  token = localStorage.getItem("token");
  httpRequestGetSearchBar = new XMLHttpRequest();
  httpRequestGetSearchBar.onreadystatechange = Get_Search_Bar;
  httpRequestGetSearchBar.open('GET', `${baseUri}/php_traitement/traitement_Get_Search_Bar.php?query=${query}`, true);
  httpRequestGetSearchBar.setRequestHeader("Content-Type", "application/json");
  httpRequestGetSearchBar.setRequestHeader("authorization", token)
  httpRequestGetSearchBar.send();
}

function Get_Search_Bar() {
  if (httpRequestGetSearchBar.readyState === XMLHttpRequest.DONE) {
    if (httpRequestGetSearchBar.status === 200) {
      const searchBar = JSON.parse(httpRequestGetSearchBar.responseText);
      userId = localStorage.getItem("userId");
      let resultSearchBar = "";
      if (searchBar.length > 0) {
      for (const search of searchBar) {
          const htmlSearchBar=`
          <div onclick="traitement_Get_Other_Profil(${search.id_users}); traitement_Get_Tweet_Other_Profil(${search.id_users})" class="searchItem">
            <img src="ressources/profilpic/${search.profil}"/>
            <h2>${search.pseudo}</h2>
            <div class="etat${search.etat}"></div>
        </div>
          `;
          resultSearchBar += htmlSearchBar;
      }
      document.getElementById("searchResult").style.display = "block";
      } else {
        document.getElementById("searchResult").style.display = "none";
      }
      document.getElementById("searchResult").innerHTML=resultSearchBar;
    }
  }
}

//-----------------------------------------------------------------

function redirection(){
    traitement_Get_Tweet();
    traitement_Get_Form_Tweet();
}

//-----------------------------------------------------------------