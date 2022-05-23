//récupérer l'URL de la page

var urlcourante = document.location.href;
//alert (' URL : \n' +urlcourante);

//récupérer l'Id de l'URL

var url = new URL(urlcourante);
var id = url.searchParams.get("id");
//alert(id);

const urlProduit = `http://localhost:3000/api/products/${id}`;

// On récupère les infos du produit sur l'API grâce à l'ID
fetch(urlProduit).then(function (reponse) {
  reponse.json().then(function (reponsejson) {
    // On associe le titre de l'article (sur l'API) avec le titre du produit (HTML). Pareil avec les autres infos
    console.log(reponsejson);
    document.getElementsByClassName("item__img")[0].innerHTML += `<img src="${reponsejson.imageUrl}" alt="${reponsejson.altTxt}">`;
    document.getElementById("title").innerHTML = reponsejson.name;
    document.getElementById("price").innerHTML = reponsejson.price;
    document.getElementById("description").innerHTML = reponsejson.description;

    let tableauDeCouleur = reponsejson.colors;
    let numberOfColors = tableauDeCouleur.length;
    for (let i=0; i<numberOfColors;i++){
        let color = tableauDeCouleur[i];
        document.getElementById("colors").innerHTML += `<option value=${color}>${color}</option>`;       
    };
  });
});


