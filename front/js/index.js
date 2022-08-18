const urlProduits = "http://localhost:3000/api/products";

let produits;

fetch(urlProduits).catch(function(){
  alert("Site Web indisponible. Essayez d'actualiser la page ou revenez plus tard.");
}).then(function (reponse) {
  reponse.json().then((donnees) => {
    produits = donnees;
    console.log("produits", produits);

    // Parcourir le tableau des produits a l'aide d'une boucle
    for (const produit of produits) {
      document.getElementById("items").innerHTML += `
			<a href="./product.html?id=${produit._id}">
				<article>
					<img src="${produit.imageUrl}" alt="${produit.altTxt}">
					<h3 class="productName">${produit.name}</h3>
					<p class="productDescription">${produit.description}</p>
				</article>
			</a>`;
    }
    // Pour chaque produit qu'on va parcourir, injecter de facon dynamique le petit bout de code commenté
  });

});
