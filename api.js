const URL = "https://fakestoreapi.com/products/category/jewelery";

fetch(URL)
.then(res =>res.json())
.then(productos =>{
    mostrarProductos(productos);
})
 .catch(error => console.error(error));
