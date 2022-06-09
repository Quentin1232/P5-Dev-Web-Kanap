//Récupérer les données du local storage
const panier = JSON.parse(localStorage.getItem("panier")) ?? [];
/**
 * panier = [
 *  {id: "dfsfsf", color: "blue", quantity: 4},
 *  {id: "dfsfsf", color: "blue", quantity: 4},
 *  {id: "dfsfsf", color: "blue", quantity: 4}
 * ]
 */
let totalQuantity = 0;
let totalPrice = 0;
panier.forEach((canape) => {
  /**
   * canape = {id: "dfsfsf", color: "blue", quantity: 4},
   */
  // Recuper le conteneur des canapes
  const cartItems = document.getElementById("cart__items");
  const urlProduit = `http://localhost:3000/api/products/${canape.id}`;

  fetch(urlProduit).then(function (reponse) {
    reponse.json().then(function (produit) {
      // Ajouter le html de chaque canape dans ce conteneur
      cartItems.innerHTML += `
        <article class="cart__item" data-id="${canape.id}" data-color="${canape.color}">
          <div class="cart__item__img">
            <img src="${produit.imageUrl}" alt="${produit.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${produit.name}</h2>
              <p>${canape.color}</p>
              <p>${produit.price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity min="1" max="100" value="${canape.quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>
      `;
      totalQuantity += canape.quantity;
      totalPrice += canape.quantity * produit.price;
      document.getElementById("totalQuantity").innerHTML = totalQuantity;
      document.getElementById("totalPrice").innerHTML = totalPrice;
    });
  });
});

// Une modif sur l'interface doit se repercuter sur le localstorage. Comment le fait-on??
// Une fonction pour gerer la modification de la qte sur un element du panier
// id & color & nouvelleQte
function modifQte(id, color, nouvelleQte) {
  // Trouver l'index du canapé à modifier
  const indexCanape = panier.findIndex((element) => {
    return element.id == id && element.color == color;
  });
  // Utiliser la fonction "splice"(cf product.js) pour remplacer l'ancienne quantité par la nouvelle
  panier.splice(indexCanape, 1, { id, color, quantity: nouvelleQte });
  // Il faut ensuite actualiser la page
  window.location.reload();
}

// On recupere tout les champs input ayant pour class "itemQuantity"
const toutLesInputs = document.getElementsByClassName("itemQuantity");
// On boucle sur elles
toutLesInputs.forEach((inputQte) => {

  inputQte.addEventListener("change", function(elementInput) {
    modifQte(id, color, elementInput.value)
  })
});

// On récupère les données du champs de texte de l'élément input qui est modifié
// getElementBy
