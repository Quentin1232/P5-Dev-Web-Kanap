//récupérer l'URL de la page
var urlcourante = document.location.href;

//récupérer l'Id de l'URL
var url = new URL(urlcourante);
var orderId = url.searchParams.get("orderId");

//ajouter orderId au document
document.getElementById("orderId").innerHTML = orderId;