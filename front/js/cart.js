function getPanier() {
  return JSON.parse(localStorage.getItem("panier")) ?? [];
}
function setPanier(panier) {
  localStorage.setItem("panier", JSON.stringify(panier));
}
/**
 * panier = [
 *  {id: "dfsfsf", color: "blue", quantity: 4},
 *  {id: "dfsfsf", color: "blue", quantity: 4},
 *  {id: "dfsfsf", color: "blue", quantity: 4}
 * ]
 */
let panier = getPanier();
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
      const nouvelElementHTML = document.createElement("article");
      nouvelElementHTML.setAttribute("class", "cart__item");
      nouvelElementHTML.setAttribute("data-id", canape.id);
      nouvelElementHTML.setAttribute("data-color", canape.color);
      nouvelElementHTML.innerHTML = `
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
      `;

      var inputQte = nouvelElementHTML.getElementsByClassName("itemQuantity");
      inputQte[0].addEventListener("change", function (event) {
        var newQuantity = parseInt(event.target.value);
        console.log("newQuantity", newQuantity);
        modifQte(canape.id, canape.color, newQuantity);
      });

      cartItems.appendChild(nouvelElementHTML);
      totalQuantity += canape.quantity;
      totalPrice += canape.quantity * produit.price;
      document.getElementById("totalQuantity").innerHTML = totalQuantity;
      document.getElementById("totalPrice").innerHTML = totalPrice;

      var boutonSupprimer = nouvelElementHTML.getElementsByClassName("deleteItem");
      boutonSupprimer[0].addEventListener("click", function (event){
        suppItem(canape.id, canape.color);
      })
    });
  });
});

// Une modif sur l'interface doit se repercuter sur le localstorage. Comment le fait-on??
// Une fonction pour gerer la modification de la qte sur un element du panier
// id & color & nouvelleQte
function modifQte(id, color, nouvelleQte) {
  panier = getPanier();
  // Trouver l'index du canapé à modifier
  const indexCanape = panier.findIndex(
    (element) => element.id == id && element.color == color
  );
  // Utiliser la fonction "splice"(cf product.js) pour remplacer l'ancienne quantité par la nouvelle
  panier.splice(indexCanape, 1, { id, color, quantity: nouvelleQte });
  setPanier(panier);
  // Il faut ensuite actualiser la page
  window.location.reload();
}

// // Supprimer un item
function suppItem(id, color) {
  panier = getPanier()
  const indexCanape = panier.findIndex(
    (element) => element.id == id && element.color == color
  );
  panier.splice(indexCanape, 1);
  setPanier(panier);
  window.location.reload();
}

// document.getElementsByClassName("deleteItem") = boutonSupprimer;
