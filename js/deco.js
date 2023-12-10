const maDivAmis = document.getElementById('Amigos');
const monBoutonAmis = document.getElementById('amigosBouton');
const maDivSugg = document.getElementById('Suggestion');
const monBoutonSugg = document.getElementById('suggestionBouton');

monBoutonAmis.addEventListener('click', function() {
  // Modifier la taille de la div
  maDivAmis.classList.toggle('resized');
  monBoutonAmis.classList.toggle('active');
});

  monBoutonSugg.addEventListener('click', function() {
  // Modifier la taille de la div
  maDivSugg.classList.toggle('resized');
  monBoutonSugg.classList.toggle('active');
});

function searchBar() {
  const query = document.querySelector(".searchBar").value.trim();
  if (query === "") {
    document.getElementById("searchResult").innerHTML = "";
  } else {
    traitement_Get_Search_Bar(query);
  }
}

function previewImage(event) {
  var reader = new FileReader();
  reader.onload = function(){
      var preview = document.getElementById('previewImage');
      preview.src = reader.result;
      preview.style.display = "block";
      var removeButton = document.getElementById('remove-photo');
      removeButton.style.display = 'block';
  }
  reader.readAsDataURL(event.target.files[0]);
  // Ajout d'une vérification si un fichier est sélectionné
  if (event.target.files.length === 0) {
      var removeButton = document.getElementById('remove-photo');
      removeButton.style.display = 'none';
  }
}

function removeImage() {
  var input = document.getElementById('upload-photo');
  var preview = document.getElementById('previewImage');
  input.value = '';
  preview.src = '';
  preview.style.display = 'none';
  document.getElementById('remove-photo').style.display = 'none';
}