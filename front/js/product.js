//récupérer l'URL de la page (' URL : \n' +urlcourante);
var urlcourante = document.location.href;

//récupérer l'Id de l'URL
var url = new URL(urlcourante);
var id = url.searchParams.get("id");

const urlProduit = `http://localhost:3000/api/products/${id}`;

// On récupère les infos du produit sur l'API grâce à l'ID
fetch(urlProduit).then(function (reponse) {
  reponse.json().then(function (reponsejson) {
    // On associe le titre de l'article (sur l'API) avec le titre du produit (HTML). Pareil avec les autres infos
    console.log(reponsejson);
    document
      .getElementsByClassName("item__img")[0]
      .insertAdjacentHTML(
        "beforeend",
        `<img src="${reponsejson.imageUrl}" alt="${reponsejson.altTxt}">`
      );
    document
      .getElementById("title")
      .insertAdjacentHTML("beforeend", reponsejson.name);
    document
      .getElementById("price")
      .insertAdjacentHTML("beforeend", reponsejson.price);
    document
      .getElementById("description")
      .insertAdjacentHTML("beforeend", reponsejson.description);

    let tableauDeCouleur = reponsejson.colors;
    let numberOfColors = tableauDeCouleur.length;
    for (let i = 0; i < numberOfColors; i++) {
      let color = tableauDeCouleur[i];
      var colors = document.getElementById("colors");
      colors.insertAdjacentHTML(
        "beforeend",
        `<option value=${color}>${color}</option>`
      );
    }
  });
});

const elt = document.getElementById("addToCart");
elt.addEventListener("click", function () {
  var promptColorsValue = document.getElementsByTagName("option")[0].value;
  var color = document.getElementById("colors").value;
  if (color === promptColorsValue) {
    alert("Couleur Invalide");
    return;
  }
  var quantity = parseInt(document.getElementById("quantity").value);
  if (quantity < 1 || quantity > 100) {
    alert("Quantité Invalide");
    return;
  }
  elt.innerHTML = "Article ajouté au panier";

  const panier = JSON.parse(localStorage.getItem("panier")) ?? [];
  /**
   * panier = [
   *  {id: "dfsfsf", color: "blue", quantity: 4},
   *  {id: "dfsfsf", color: "blue", quantity: 4},
   *  {id: "dfsfsf", color: "blue", quantity: 4}
   * ]
   */
  const indexCanape = panier.findIndex((element) => {
    return element.id == id && element.color == color;
  });

  if (panier[indexCanape]) {
    quantity += parseInt(panier[indexCanape].quantity);
    if (quantity > 100) {
      alert("quantite > 100");
      return;
    }
    panier.splice(indexCanape, 1, { id, color, quantity });
  } else {
    panier.push({ id, color, quantity });
  }

  localStorage.setItem("panier", JSON.stringify(panier));
});
