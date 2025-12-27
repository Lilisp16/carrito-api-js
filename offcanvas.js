const btnCarrito = document.getElementById("btn-carrito");
const carritoPanel = document.getElementById("carrito-panel");

const cerrar = document.getElementById("cerrar-carrito");

btnCarrito.addEventListener("click", ()=> {
    carritoPanel.classList.remove("translate-x-full");
      mostrarCarrito();
});

cerrar.addEventListener("click", () =>{
    carritoPanel.classList.add("translate-x-full");
  
});