function getPanier() {
  return JSON.parse(localStorage.getItem("panier")) ?? [];
}
function setPanier(panier) {
  localStorage.setItem("panier", JSON.stringify(panier));
}
/*
panier = [
  {id: "dfsfsf", color: "blue", quantity: 4},
  {id: "dfsfsf", color: "blue", quantity: 4},
  {id: "dfsfsf", color: "blue", quantity: 4}
] 

products = [ 
  "dfsfsf",
  "dfsfsf",
  "dfsfsf",
]

*/
let testPanier = JSON.parse(localStorage.getItem("panier")) ;
testPanier.sort((x, y) => x.id - y.id);
console.log(testPanier);

let panier = getPanier();
let totalQuantity = 0;
let totalPrice = 0;
panier.forEach((canape) => {
  const cartItems = document.getElementById("cart__items");
  const urlProduit = `http://localhost:3000/api/products/${canape.id}`;

  fetch(urlProduit).then(function (reponse) {
    reponse.json().then(function (produit) {
      // Ajouter le html de chaque canape dans ce conteneur
      const nouvelElementHTML = document.createElement("article");
      nouvelElementHTML.setAttribute("class", "cart__item");
      nouvelElementHTML.setAttribute("data-id", canape.id);
      nouvelElementHTML.setAttribute("data-color", canape.color);
      nouvelElementHTML.insertAdjacentHTML('beforeend', `
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
      `);

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

      var boutonSupprimer =
        nouvelElementHTML.getElementsByClassName("deleteItem");
      boutonSupprimer[0].addEventListener("click", function (event) {
        suppItem(canape.id, canape.color);
      });
    });
  });
});

// Modifier un item
function modifQte(id, color, nouvelleQte) {
  panier = getPanier();
  // Trouver l'index du canapé à modifier
  const indexCanape = panier.findIndex(
    (element) => element.id == id && element.color == color
  );
  if (nouvelleQte < 1 || nouvelleQte > 100) {
    alert("Quantité Invalide");
    window.location.reload();
    return;
  }
  // Utiliser la fonction "splice"(cf product.js) pour remplacer l'ancienne quantité par la nouvelle
  panier.splice(indexCanape, 1, { id, color, quantity: nouvelleQte });
  setPanier(panier);
  // Il faut ensuite actualiser la page
  window.location.reload();
}

// Supprimer un item
function suppItem(id, color) {
  panier = getPanier();
  const indexCanape = panier.findIndex(
    (element) => element.id == id && element.color == color
  );
  panier.splice(indexCanape, 1);
  setPanier(panier);
  window.location.reload();
}

// Récupérer les infos de l'utilisateur

document
  .getElementById("firstName")
  .addEventListener("change", function (event) {
    const firstName = event.target.value;
    const regexFirstName = new RegExp(/^[a-z\d]{2,12}$/i);
    const test = regexFirstName.test(firstName);
    //alert(test)
    if (test == false) {
      document.getElementById("firstNameErrorMsg").insertAdjacentHTML('beforeend', `Le prénom rentré est incorect. Il doit avoir plus de 2 caractères mais moins de 12.`);
      return;
    } else {
      document.getElementById("firstNameErrorMsg").insertAdjacentHTML('beforeend', "");
    }
  });

document
  .getElementById("lastName")
  .addEventListener("change", function (event) {
    const lastName = event.target.value;
    const regexLastName = new RegExp(/^[a-z\d]{2,20}$/i);
    const test = regexLastName.test(lastName);
    //alert(test)
    if (test == false) {
      document.getElementById("lastNameErrorMsg").insertAdjacentHTML('beforeend', `Le nom rentré est incorect. Il doit avoir plus de 2 caractères mais moins de 20.`);
      return;
    } else {
      document.getElementById("lastNameErrorMsg").insertAdjacentHTML('beforeend', "");
    }
  });

document.getElementById("address").addEventListener("change", function (event) {
  const address = event.target.value;
  const regexAddress = new RegExp(/^[a-z\d ]{5,30}$/i);
  const test = regexAddress.test(address);
  //alert(test)
  if (test == false) {
    document.getElementById("addressErrorMsg").insertAdjacentHTML('beforeend', `L'adresse rentré est incorect. Il doit avoir plus de 5 caractères mais moins de 30.`);
    return;
  } else {
    document.getElementById("addressErrorMsg").insertAdjacentHTML('beforeend', "");
  }
});

document.getElementById("city").addEventListener("change", function (event) {
  const city = event.target.value;
  const regexCity = new RegExp(/^[a-z\d ]{2,20}$/i);
  const test = regexCity.test(city);
  //alert(test)
  if (test == false) {
    document.getElementById("cityErrorMsg").insertAdjacentHTML('beforeend', `Le nom de ville rentré est incorect. Il doit avoir plus de 2 caractères mais moins de 20.`);
    return;
  } else {
    document.getElementById("cityErrorMsg").insertAdjacentHTML('beforeend', "");
  }
});

document.getElementById("email").addEventListener("change", function (event) {
  const email = event.target.value;
  const regexEmail = new RegExp(
    /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
  );
  const test = regexEmail.test(email);
  //alert(test)
  if (test == false) {
    document.getElementById("emailErrorMsg").insertAdjacentHTML('beforeend', `Le format de l'adresse mail est incorect.`);
    return;
  } else {
    document.getElementById("emailErrorMsg").insertAdjacentHTML('beforeend', "");
  }
});

// Bouton "Commander !"
document.getElementById("order").addEventListener("click", function (event) {
  event.preventDefault();
  if (
    !document.getElementById("firstNameErrorMsg").value &&
    !document.getElementById("lastNameErrorMsg").value &&
    !document.getElementById("addressErrorMsg").value &&
    !document.getElementById("cityErrorMsg").value &&
    !document.getElementById("emailErrorMsg").value &&
    document.getElementById("firstName").value &&
    document.getElementById("lastName").value &&
    document.getElementById("city").value &&
    document.getElementById("address").value &&
    document.getElementById("email").value
  ) {
    if (panier.length == 0) {
      alert("Attention, aucun article commandé.");
      return;
    }

    /* Tu dois recuperer les donnees du formulaire de contact
     * contact = {firstName: "Quentin", lastName: "", city: ""}

        Ensuite compiler les produits qui se trouvent dans le panier afin de ne laisser que leurs ids comme suit;
     * products = ["idcanape1", "idcanap2"]

        Ensuite regrouper les données du contact et des produits dans un seul objet comme suit;
     * { contact: {firstName: "Quentin", lastName: "", city: ""}, products: ["idcanape1", "idcanap2"]}

        Ensuite faire une requete vers la route de commande de l'api avec l'objet defini plus haut;
     */

    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      city: document.getElementById("city").value,
      address: document.getElementById("address").value,
      email: document.getElementById("email").value,
    };
    console.log(contact);
    let idDesCanapes = [];

    for (let indexCanape = 0; indexCanape < panier.length; indexCanape++) {
      idDesCanapes.push(panier[indexCanape].id);
    }

    let elementsPourApi = { contact, products: idDesCanapes };

    // Faire la requete vers l'api avec les données ci-dessus
    const url = "http://localhost:3000/api/products/order";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(elementsPourApi),
    }).then(function (response) {
      response.json().then(function (donneesAPI) {
        console.log(donneesAPI);
        let orderId = donneesAPI.orderId;

        //Supprimer le contenu du stockage local
        localStorage.removeItem("panier");

        // Recuperer la reponse de la requete, et envoyer l'id de confirmation vers la page confirmation via l'URL
        window.location.href = `confirmation.html?orderId=${orderId}`;
      });
    });

  } else {
    alert("L'un des champs du formulaire n'a pas été complété correctement.");
    return;
  }
});
