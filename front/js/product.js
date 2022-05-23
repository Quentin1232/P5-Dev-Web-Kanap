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

const elt = document.getElementById('addToCart');
elt.addEventListener('click', function() {
  var promptColorsValue = document.getElementsByTagName("option")[0].value
  var color = document.getElementById("colors").value
  if (color === promptColorsValue) {
    alert("Couleur Invalide")
    return;
  }
  var quantity = document.getElementById("quantity").value
  if (quantity < 1 || quantity > 100){
    alert("Quantité Invalide")
    return;
  }
  elt.innerHTML = "Article ajouté au panier";

  
var orderQuantity = localStorage.getItem(JSON.stringify({id: id,color: color}))

if (orderQuantity != null) {
  quantity = orderQuantity
  if (orderQuantity < 100) {
    quantity++
  }
}

localStorage.setItem(
    JSON.stringify({id: id, color: color}),
    quantity
)
});


